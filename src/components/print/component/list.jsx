import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const list = async ({ endData, setIsGenerating, number, name, exp, imp, creater, date }) => {
  const dateString = date || new Date().toISOString();
  const newDate = new Date(dateString);
  const createdAt = Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
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

    // **Header**
    const addHeader = () => {
      doc.setFontSize(18);
      doc.text("実 行 予 算 表", 15, 15);
      doc.setFontSize(10);
      doc.text(`見積番号： ${number }`, 150, 15);
      doc.text(`提出先： ${exp }`, 150, 20);
      doc.text(`作成者： ${creater }`, 20, 20);
      doc.text(`仕入先： ${imp }`, 150, 25);
      doc.text(`工事名： ${name }`, 20, 25);
      doc.text(`${createdAt}`, doc.internal.pageSize.width - 20, 15, { align: "right" });
    };

    addHeader(); // Add header to the first page

    // **Table Header Definition**
    const tableColumn = [
      "【 N o . 】",
      "【 分 類 名 称 】",
      "【 提 出 金 額 】",
      "【 構 成 比 】",
      "【 工 数 】",
      "【 備 考 】",
      "【 提 出 金 額 】",
      "【 構 成 比 】",
      "【 工 数 】",
      "【 備 考 】"
    ];
    const tableRows = [];

    // **Generating Table Rows**
    endData.forEach((row) => {
      tableRows.push([
        row.No || "",
        row.Category || "",
        row.Price1 || "0",
        row.Ratio1 || "0.000%",
        row.Work1 || "0.00",
        row.Other1 || "",
        row.Price2 || "0",
        row.Ratio2 || "0.000%",
        row.Work2 || "0.00",
        row.Other2 || ""
      ]);
    });

    // **Generate Table with Multi-page Support**
    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      styles: { 
        font: "NotoSansJP",
        fontSize: 9,
        textColor: [0, 0, 0],
        lineWidth: 0.2,
        lineColor: [180, 180, 180],
        fillColor: [255, 255, 255],
        cellPadding: 2, 
        halign: "center",
      },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: [0, 0, 0],
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        lineWidth: 0.2,
        lineColor: [180, 180, 180],
        cellPadding: 2,
      },
      theme: "grid",
      margin: { left: 10, right: 10 },
      didDrawPage: function (data) {
        if (data.pageNumber > 1) addHeader();
      }
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
    doc.save(`R051_実行予算表_${number}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    setIsGenerating(false);
  }
};

export default list;
