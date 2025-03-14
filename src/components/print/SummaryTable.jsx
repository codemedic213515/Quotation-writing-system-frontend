import { useState, useEffect } from "react";
import axios from "axios";
import Summary from "./Summary"

const SummaryTable=({ number, setActiveTab }) =>{
  const [summary, setSummary] = useState(null);
  const [sumimp, setSumImp] = useState(null);
  const [quotationMain, setQuotationMain] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!number) {
      setActiveTab("select");
    }
  }, [number]);
   
    useEffect(() => {
      fetchData(number);
}, [number]);

  const fetchData = async (quotationNumber) => {
    setLoading(true);
    try {
      const [quotationRes, summaryRes, sumimpRes] = await Promise.all([
        axios.get(`/api/quotationmain`, { params: { code: quotationNumber } }),
        axios.get("/api/quotationdata/summary", { params: { quotationNumber } }),
        axios.get("/api/quotationdata/sumimp", { params: { quotationNumber } }),
      ]);

      setQuotationMain(quotationRes.data.data[0] );
      setSummary(summaryRes.data);
      setSumImp(sumimpRes.data);

      if (summaryRes.data?.quotationTypeDetails?.length > 0 && sumimpRes.data?.quotationTypeDetails?.length > 0) {
        const extractedData = extractTableData(summaryRes.data, sumimpRes.data);
        setTableData(extractedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSummary({ quotationTypeDetails: [] });
      setSumImp({ quotationTypeDetails: [] });
    }
    setLoading(false);
  };

  const categoryMap = {
    "諸経費": "経費等",
    "現場雑費": "雑材",
    "共 通 費": "共通費",
    "付帯工事": "付帯工事",
    "運搬雑費": "雑材",
    "外 注 費": "労務費",
    "電工労務費": "労務費",
  };

  const extractTableData = (summary, sumimp) => {
    let rows = [];

    summary.quotationTypeDetails.forEach((typeDetail, index) => {
      const sumimpDetail = sumimp.quotationTypeDetails[index] || { abMaterialSums: [], categorySums: [], typeMaterialCost: 0 };

      const summaryRow = {
        category: typeDetail.quotationType,
        B_Material: typeDetail.abMaterialSums.reduce((sum, ab) => sum + (ab.abCode === "2" ? ab.sum : 0), 0),
        A_Material: typeDetail.abMaterialSums.reduce((sum, ab) => sum + (ab.abCode === "1" ? ab.sum : 0), 0),
        Wire: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "電工労務費" ? c.sum : 0), 0),
        Fire_Prevention: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "外 注 費" ? c.sum : 0), 0),
        Misc_Material: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "雑材" ? c.sum : 0), 0),
        Additional_Work: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "付帯工事" ? c.sum : 0), 0),
        Labor_Cost: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "労務費" ? c.sum : 0), 0),
        Common_Cost: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "共通費" ? c.sum : 0), 0),
        Expense: typeDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "経費等" ? c.sum : 0), 0),
        Subtotal: typeDetail.typeMaterialCost,
      };

      const sumimpRow = { 
        category: "", 
        B_Material: sumimpDetail.abMaterialSums.reduce((sum, ab) => sum + (ab.abCode === "2" ? ab.sum : 0), 0),
        A_Material: sumimpDetail.abMaterialSums.reduce((sum, ab) => sum + (ab.abCode === "1" ? ab.sum : 0), 0),
        Wire: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "電工労務費" ? c.sum : 0), 0),
        Fire_Prevention: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "外 注 費" ? c.sum : 0), 0),
        Misc_Material: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "雑材" ? c.sum : 0), 0),
        Additional_Work: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "付帯工事" ? c.sum : 0), 0),
        Labor_Cost: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "労務費" ? c.sum : 0), 0),
        Common_Cost: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "共通費" ? c.sum : 0), 0),
        Expense: sumimpDetail.categorySums.reduce((sum, c) => sum + (categoryMap[c.category] === "経費等" ? c.sum : 0), 0),
        Subtotal: sumimpDetail.typeMaterialCost || 0 };
      rows.push(summaryRow, sumimpRow);
    });

    const totalA = { category: "【 合 計 （Ａ） 】" };
    const totalB = { category: "【 合 計 （Ｂ） 】" };
    Object.keys(rows[0]).forEach((key) => {
      if (key !== "category") {
        totalA[key] = rows.filter((_, i) => i % 2 === 0).reduce((acc, row) => acc + row[key], 0);
        totalB[key] = rows.filter((_, i) => i % 2 !== 0).reduce((acc, row) => acc + row[key], 0);
      }
    });
    const ratioRow = { category: "【 構 成 比 率 （％） 】" };
    Object.keys(totalA).forEach((key) => {
      if (key !== "category") {
        ratioRow[key] = totalA[key] !== 0 ? ((totalA[key] - totalB[key]) / totalA[key] * 100).toFixed(2) + "%" : "0%";
      }
    });
    const profitRow = { category: "【 粗 利 益 】" };
    Object.keys(totalA).forEach((key) => {
      if (key !== "category") {
        profitRow[key] = totalA[key] - totalB[key];
      }
    });

    return [...rows, totalA, totalB, ratioRow, profitRow];
  };
console.log("main : ", quotationMain);

  return (
    <div>
       <div>
        <Summary summ={summary} sumimp={sumimp} number={number} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
      </div>
    <div>
      {loading ? <p>データをロードしています...</p> : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>【 工 事 種 目 】</th>
              <th>【 B 材 】</th>
              <th>【 電線類 】</th>
              <th>【 A 材 】</th>
              <th>【 防災 】</th>
              <th>【 雑材 】</th>
              <th>【 付帯工事 】</th>
              <th>【 労務費 】</th>
              <th>【 共通費 】</th>
              <th>【 経費等 】</th>
              <th>【 小計 】</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, i) => <td key={i}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
 
    </div>
  )
}

export default SummaryTable;
