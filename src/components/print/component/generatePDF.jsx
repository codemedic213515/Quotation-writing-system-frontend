import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const generatePDF = async ({net, setIsGenerating, number, name, exp, imp, creater, date, title}) => {
  
  const dateString = date;
  const newDate = new Date(dateString);
  const createdAt = Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(newDate);
  setIsGenerating(true);
    try {
      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      
      // Load Japanese font
      const fontResponse = await fetch("https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf");
      const fontBuffer = await fontResponse.arrayBuffer();
      const fontBase64 = btoa(new Uint8Array(fontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
  
      doc.addFileToVFS("NotoSansJP-Regular.ttf", fontBase64);
      doc.addFont("NotoSansJP-Regular.ttf", "NotoSansJP", "normal");
      doc.setFont("NotoSansJP");
  
      // Group rows by category
      const categories = {};
      net.forEach(row => {
        if (row.category) {
          categories[row.category] = [];
        }
      });
      
      let currentCategory = null;
      net.forEach(row => {
        if (row.category) {
          currentCategory = row.category;
        }
        if (currentCategory) {
          categories[currentCategory].push(row);
        }
      });
  
      let pageIndex = 1;
      const totalPages = Object.keys(categories).length;
  
      Object.entries(categories).forEach(([category, rows], index) => {
        if (index > 0) doc.addPage();
        
        // Keep original header content
        doc.setFontSize(16);
        doc.text(`${title}`, 105, 15, { align: "center" });
        doc.setFontSize(10);
        doc.text("見 積 番 号：", 150, 15);
        doc.text(`${number}`, 180, 15);
        doc.text("仕 入 先：", 150, 20);
        doc.text(`${imp}`, 180, 20);
        doc.text("提 出 先：", 150, 25);
        doc.text(`${exp}`, 180, 25);
        doc.text("作 成 者：", 20, 25);
        doc.text(`${creater}`, 50, 25);
        doc.text("工 事 名：", 20, 30);
        doc.text(`${name}`, 50, 30);
        doc.text(`${createdAt}`, doc.internal.pageSize.width - 20, 15, { align: "right" });
        doc.text(`ページ ${pageIndex} / ${totalPages}`, doc.internal.pageSize.width - 20, 20, { align: "right" });
        pageIndex++;
        
        // Define table header
        const tableColumn = ["【  品  名  】", "【   形   状   ・   寸   法   】", "【単位】", "【数量】", "【単価】", "【 金 額 】", "【備考】"];
        const tableRows = [];
        
        rows.forEach(row => {
          if (row.isHeader) {
            tableRows.push([
              { content: row.category, colSpan: 7, styles: { fontStyle: "bold", halign: "left", fontSize: 9 } }
            ]);
          } else if (row.isSubtotal || row.isTotal) {
            tableRows.push([
              { content: row.label || "", colSpan: 2, styles: { halign: "center", fontSize: 9 } },
              { content: row.unit || "", styles: { halign: "center", fontSize: 9 } },
              "",
              "",
              { content: row.amount || "", styles: { halign: "center", fontSize: 9 } },
              ""
            ]);
          } else {
            tableRows.push([
              { content: row.item || "", styles: { halign: "left", fontSize: 9 } },
              { content: row.subItem || "", styles: { halign: "center", fontSize: 9 } },
              { content: row.unit || "", styles: { halign: "center", fontSize: 9 } },
              { content: row.quantity || "", styles: { halign: "center", fontSize: 9 } },
              { content: row.unitPrice || "", styles: { halign: "center", fontSize: 9 } },
              { content: row.amount || "", styles: { halign: "center", fontSize: 9 } },
              { content: row.notes || "", styles: { halign: "center", fontSize: 9 } }
            ]);
          }
        });
        
        // Generate table
        autoTable(doc, {
          startY: 35,
          head: [tableColumn],
          body: tableRows,
          styles: {
            font: "NotoSansJP",
            fontSize: 9,
            textColor: [0, 0, 0],
            lineWidth: 0, // Remove default borders
            lineColor: [0, 0, 0],
            fillColor: [255, 255, 255],
            cellPadding: 2,
          },
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontSize: 9,
            fontStyle: "bold",
            halign: "center",
            valign: "middle",
            lineWidth: 0,
            lineColor: [0, 0, 0],
            cellPadding: 2,
          },
          columnStyles: {
            0: { cellWidth: 45 },
            1: { cellWidth: 80 },
            2: { cellWidth: 20 },
            3: { cellWidth: 25 },
            4: { cellWidth: 25 },
            5: { cellWidth: 35 },
            6: { cellWidth: 25 },
          },
          theme: "plain",
          margin: { left: 10, right: 10 },
          didDrawCell: (data) => {
            const doc = data.doc;
            const cell = data.cell;
            // Draw vertical line between main content and right columns
            if (data.column.index === 3 || data.column.index === 2) {
              doc.setDrawColor(0);
              doc.setLineWidth(0.1);
              doc.line(cell.x, cell.y, cell.x, cell.y + cell.height);
            }
            
            // Draw horizontal lines only for specific cases
            if (
              data.row.index === 0 || // After header
              data.row.index === data.length - 2 ||
              (data.row.raw && data.row.raw[0]?.content === "") || // Before subtotals
              (data.row.raw && data.row.raw[0]?.content?.startsWith("*")) || // After category headers
              (data.row.raw && data.row.raw[0]?.content?.includes("小　　計")) // After subtotal rows
            ) {
              doc.setDrawColor(0);
              doc.setLineWidth(0.1);
              doc.line(data.cell.x, data.cell.y, data.cell.x + data.cell.width, data.cell.y);
            }
            
            // Draw final line at the bottom of the table
            if (data.row.index === data.table.body.length - 1) {
              doc.setDrawColor(0);
              doc.setLineWidth(0.1);
              doc.line(
                data.cell.x,
                data.cell.y + data.cell.height,
                data.cell.x + data.cell.width,
                data.cell.y + data.cell.height
              );
            }
          },
        });
      });
  
      // Save and open the PDF
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
      if(title="分 類 別 集 計 表 (見積)"){
      doc.save(`R051_内訳明細集計表(見積側)_${number}.pdf`);
      }else if(title="分 類 別 集 計 表 (Net)"){
        doc.save(`R051_内訳明細集計表(Net側)_${number}.pdf`);
      }
       
  } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  export default generatePDF;