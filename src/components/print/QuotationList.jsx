import { useState, useEffect } from "react";
import axios from "axios";
import List from"./List"

const QuotationList = ({ number, setActiveTab }) => {
  const [endData, setEndData] = useState([]);
  const [error, setError] = useState(null);
  const [quotationMain, setQuotationMain] = useState([]);

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

    let totalPrice1 = 0, totalPrice2 = 0;
    let categoryTotals = { ABCode1: { Price1: 0, Price2: 0 }, ABCode2: { Price1: 0, Price2: 0 }, Others: { Price1: 0, Price2: 0 } };
    let groupedMaterials = { ABCode1: {}, ABCode2: {}, Others: {} };

    // ** Step 1: Group and Sum Prices per ID **
    Object.entries(data).forEach(([categoryKey, materials]) => {
      materials.forEach((item) => {
        const id = item.id.toString();
        if (!groupedMaterials[categoryKey][id]) {
          groupedMaterials[categoryKey][id] = {
            No: id,
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
        categoryTotals[categoryKey].Price1 += item.priceCost || 0;
        categoryTotals[categoryKey].Price2 += item.internalCost || 0;
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
        // Calculate ratio for each item before pushing
        sortedRows[categoryKey].forEach((item) => {
          item.Ratio1 = totalPrice1 !== 0 ? ((item.Price1 / totalPrice1) * 100).toFixed(3) + "%" : "0.000%";
          item.Ratio2 = totalPrice2 !== 0 ? ((item.Price2 / totalPrice2) * 100).toFixed(3) + "%" : "0.000%";
        });

        finalRows.push(...sortedRows[categoryKey]); // Add sorted rows

        // Add category subtotal row
        const categoryTotal = categoryTotals[categoryKey];

        finalRows.push({
          No: "",
          Category: subtotalKeys[categoryKey],
          Price1: categoryTotal.Price1.toLocaleString(),
          Ratio1: totalPrice1 !== 0 ? ((categoryTotal.Price1 / totalPrice1) * 100).toFixed(3) + "%" : "0.000%",
          Work1: "0.00",
          Other1: "",
          Price2: categoryTotal.Price2.toLocaleString(),
          Ratio2: totalPrice2 !== 0 ? ((categoryTotal.Price2 / totalPrice2) * 100).toFixed(3) + "%" : "0.000%",
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
      Ratio1: "100.000%",
      Work1: "0.00",
      Other1: "",
      Price2: totalPrice2.toLocaleString(),
      Ratio2: "100.000%",
      Work2: "0.00",
      Other2: ""
    });

    return finalRows;
  };

  return (
    <div className="w-full h-[60vh] overflow-auto">
    
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && (
        <>
         <List number={number} endData={endData} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
          <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
            <thead>
              <tr>
                <th>【 N o . 】</th>
                <th>【 分 類 名 称 】</th>
                <th>【 提 出 金 額 】</th>
                <th>【 構 成 比 】</th>
                <th>【 工 数 】</th>
                <th>【 備 考 】</th>
                <th>【 提 出 金 額 】</th>
                <th>【 構 成 比 】</th>
                <th>【 工 数 】</th>
                <th>【 備 考 】</th>
              </tr>
            </thead>
            <tbody>
              {endData.map((row, index) => (
                <tr key={index} style={{ fontWeight: row.No === "" ? "bold" : "normal", backgroundColor: row.No === "" ? "#f2f2f2" : "white", textAlign: "center" }}>
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
