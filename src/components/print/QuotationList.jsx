// import { useState, useEffect } from "react";
// import axios from "axios";

// const QuotationList=({ number, setActiveTab }) =>{
//   const[endDate, setEndData]=useState([])
//   const [quotationMain, setQuotationMain] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   if (number == '') {
//     setActiveTab('select');
//   }
// useEffect(()=>{
//   fetchData(number);
// },[number])

//  const fetchData = async(quotationNumber)=>{
//   setLoading(true)
//   try{
//     const [quotationRes, endRes] = await Promise.all([
//       axios.get(`/api/quotationmain`, { params: { code: quotationNumber } }),
//       axios.get(`/api/quotationdata/end/${quotationNumber}`),
      
//     ]);
//     setQuotationMain(quotationRes.data.data[0] );
//     setEndData(endRes.data);
//   }catch (error) {
//     console.error("Error fetching data:", error);
//   }
//  }

//  console.log(endDate);
 
//   return <>見積一覧表</>;
// }
// export default QuotationList;



import { useState, useEffect } from "react";
import axios from "axios";

const QuotationList = ({ number, setActiveTab }) => {
  const [endData, setEndData] = useState([]);
  const [quotationMain, setQuotationMain] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!number) {
      setActiveTab("select");
    } else {
      fetchData(number);
    }
  }, [number]);

  const fetchData = async (quotationNumber) => {
    try {
      const [quotationRes, endRes] = await Promise.all([
        axios.get(`/api/quotationmain`, { params: { code: quotationNumber } }),
        axios.get(`/api/quotationdata/end/${quotationNumber}`)
      ]);

      setQuotationMain(quotationRes.data.data[0] || {});
      setEndData(transformData(endRes.data));
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch quotation data.");
    }
  };

  const transformData = (data) => {
    if (!data) return [];

    let totalPrice1 = 0;
    let totalPrice2 = 0;
    let categoryTotals = { ABCode1: 0, ABCode2: 0, Others: 0 };
    let groupedMaterials = { ABCode1: {}, ABCode2: {}, Others: {} };

    // ** Step 1: Group by ID (Summing Price1 & Price2) **
    Object.entries(data).forEach(([categoryKey, materials]) => {
      materials.forEach((item) => {
        const id = item.id;
        if (!groupedMaterials[categoryKey][id]) {
          groupedMaterials[categoryKey][id] = {
            No: id || "-",
            Category: item.category || "-",
            Price1: 0,
            Price2: 0,
            Work1: "0.00",
            Other1: "",
            Work2: "0.00",
            Other2: ""
          };
        }
        groupedMaterials[categoryKey][id].Price1 += item.priceCost || 0;
        groupedMaterials[categoryKey][id].Price2 += item.internalCost || 0;
        categoryTotals[categoryKey] += item.priceCost || 0;
        totalPrice1 += item.priceCost || 0;
        totalPrice2 += item.internalCost || 0;
      });
    });

    // ** Step 2: Sort within each category group **
    let sortedRows = { ABCode1: [], ABCode2: [], Others: [] };

    Object.keys(groupedMaterials).forEach((categoryKey) => {
      sortedRows[categoryKey] = Object.values(groupedMaterials[categoryKey]).sort((a, b) => a.No - b.No);
    });

    let finalRows = [];

    // ** Step 3: Add each category group followed by its subtotal **
    const subtotalKeys = {
      ABCode2: "【 B材小計 】",
      ABCode1: "【 A材小計 】",
      Others: "【 経 費 等 小 計 】"
    };

    Object.keys(subtotalKeys).forEach((categoryKey) => {
      if (sortedRows[categoryKey].length > 0) {
        finalRows.push(...sortedRows[categoryKey]); // Add sorted rows
        const categoryTotal = categoryTotals[categoryKey];

        finalRows.push({
          No: "",
          Category: subtotalKeys[categoryKey],
          Price1: categoryTotal.toLocaleString(),
          Ratio1: totalPrice1 !== 0 ? ((categoryTotal / totalPrice1) * 100).toFixed(2) + "%" : "0.00%",
          Work1: "0.00",
          Other1: "",
          Price2: categoryTotal.toLocaleString(),
          Ratio2: totalPrice2 !== 0 ? ((categoryTotal / totalPrice2) * 100).toFixed(2) + "%" : "0.00%",
          Work2: "0.00",
          Other2: ""
        });
      }
    });

    // ** Step 4: Grand Total Row **
    finalRows.push({
      No: "",
      Category: "【 合計 】",
      Price1: totalPrice1.toLocaleString(),
      Ratio1: "100%",
      Work1: "0.00",
      Other1: "",
      Price2: totalPrice2.toLocaleString(),
      Ratio2: "100%",
      Work2: "0.00",
      Other2: ""
    });

    return finalRows;
  };

  return (
    <div>
      <h2>見積一覧表</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
          <h3>Quotation Details</h3>
          <p>見積番号: {quotationMain?.code || "N/A"}</p>
          <p>作成者: {quotationMain?.creater || "N/A"}</p>
          <p>工事名: {quotationMain?.name || "N/A"}</p>

          <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Category</th>
                <th>Price1</th>
                <th>Ratio1</th>
                <th>Work1</th>
                <th>Other1</th>
                <th>Price2</th>
                <th>Ratio2</th>
                <th>Work2</th>
                <th>Other2</th>
              </tr>
            </thead>
            <tbody>
              {endData.map((row, index) => (
                <tr key={index} style={{ fontWeight: row.No === "" ? "bold" : "normal", backgroundColor: row.No === "" ? "#f2f2f2" : "white" }}>
                  <td>{row.No}</td>
                  <td>{row.Category}</td>
                  <td>{row.Price1}</td>
                  <td>{row.Ratio1}</td>
                  <td>{row.Work1}</td>
                  <td>{row.Other1}</td>
                  <td>{row.Price2}</td>
                  <td>{row.Ratio2}</td>
                  <td>{row.Work2}</td>
                  <td>{row.Other2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default QuotationList;
