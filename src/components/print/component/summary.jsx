import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const summary = async ({ summ, sumimp, setIsGenerating, number, name, exp, imp, creater, date }) => {
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
      doc.text("総 括 表", 15, 15);
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
      "【 工 事 種 目 】",
      "【 B 材 】",
      "【 電線類 】",
      "【 A 材 】",
      "【 防災 】",
      "【 雑材 】",
      "【 付帯工事 】",
      "【 労務費 】",
      "【 共通費 】",
      "【 経費等 】",
      "【 小 計 】"
    ];
    const tableRows = [];

    // **Generating Table Rows**
    summ.quotationTypeDetails.forEach((row, index) => {
      const sumimpRow = sumimp.quotationTypeDetails[index] || { abMaterialSums: [], categorySums: [], typeMaterialCost: 0 };

      // Function to safely get sums from category data
      const extractCategorySum = (categories, categoryName) =>
        categories?.find(c => c.category === categoryName)?.sum || 0;

      // **Correcting B材 and A材 Calculation**
      const bMaterialSum = row.abMaterialSums
        ?.filter(ab => ab.abCode === "2")
        .reduce((acc, ab) => acc + ab.sum, 0) || 0;
      const aMaterialSum = row.abMaterialSums
        ?.filter(ab => ab.abCode === "1")
        .reduce((acc, ab) => acc + ab.sum, 0) || 0;

      const sumimpBMaterial = sumimpRow.abMaterialSums
        ?.filter(ab => ab.abCode === "2")
        .reduce((acc, ab) => acc + ab.sum, 0) || 0;
      const sumimpAMaterial = sumimpRow.abMaterialSums
        ?.filter(ab => ab.abCode === "1")
        .reduce((acc, ab) => acc + ab.sum, 0) || 0;

      tableRows.push([
        row.quotationType || "",  
        bMaterialSum, 
        extractCategorySum(row.categorySums, "電線類"),
        aMaterialSum,
        extractCategorySum(row.categorySums, "防災"),
        extractCategorySum(row.categorySums, "現場雑費") + extractCategorySum(row.categorySums, "運搬雑費"),
        extractCategorySum(row.categorySums, "付帯工事"),
        extractCategorySum(row.categorySums, "外 注 費") + extractCategorySum(row.categorySums, "電工労務費"),
        extractCategorySum(row.categorySums, "共 通 費"),
        extractCategorySum(row.categorySums, "諸経費"),
        row.typeMaterialCost || 0
      ]);

      tableRows.push([
        "",
        sumimpBMaterial,
        extractCategorySum(sumimpRow.categorySums, "電線類"),
        sumimpAMaterial,
        extractCategorySum(sumimpRow.categorySums, "防災"),
        extractCategorySum(sumimpRow.categorySums, "現場雑費") + extractCategorySum(sumimpRow.categorySums, "運搬雑費"),
        extractCategorySum(sumimpRow.categorySums, "付帯工事"),
        extractCategorySum(sumimpRow.categorySums, "外 注 費") + extractCategorySum(sumimpRow.categorySums, "電工労務費"),
        extractCategorySum(sumimpRow.categorySums, "共 通 費"),
        extractCategorySum(sumimpRow.categorySums, "諸経費"),
        sumimpRow.typeMaterialCost || 0
      ]);
    });

    // **Adding 合計 (A) & 合計 (B)**
    const totalA = ["【 合 計 （Ａ） 】", ...Array(10).fill(0)];
    const totalB = ["【 合 計 （Ｂ） 】", ...Array(10).fill(0)];

    tableRows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.forEach((value, i) => {
          if (i > 0) totalA[i] += Number(value);
        });
      } else {
        row.forEach((value, i) => {
          if (i > 0) totalB[i] += Number(value);
        });
      }
    });

    const ratioRow = ["【 構 成 比 率 （％） 】", ...totalA.slice(1).map((val, i) => totalA[i + 1] !== 0 ? ((totalA[i + 1] - totalB[i + 1]) / totalA[i + 1] * 100).toFixed(2) + "%" : "0%")];
    const profitRow = ["【 粗 利 益 】", ...totalA.slice(1).map((val, i) => totalA[i + 1] - totalB[i + 1])];

    tableRows.push(totalA, totalB, ratioRow, profitRow);

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
    doc.save(`R051_総括表(全出力)_${number}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    setIsGenerating(false);
  }
};

export default summary;
