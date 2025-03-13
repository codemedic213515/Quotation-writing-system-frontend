import { useState, useEffect } from "react"
import Net from "./component/Net"
import axios from "axios"
const Classification = ({ number, setActiveTab }) => {
  const [aa, setAA]=useState([])
  const [quotationMain, setQuotationMain]=useState([])
  if (number == "") {
    setActiveTab("select")
  }
  const fetchQuotationData = async (number) => {
    try {
      const response = await axios.get(`/api/quotationmain`, {
        params: { code: number },
      });
    setQuotationMain(response.data.data[0])
    }catch(error){
      console.log(error);
    }
    }
  
  const fetchFormattedQuotationData = async (quotationNumber) => {
    try {
      const response = await axios.get('/api/quotationdata/formatted', {
        params: { quotationNumber },
      });
      console.log("Formatted Quotation Data:", response.data);
      setAA(response.data)
  
      return response.data;
    } catch (error) {
      console.error('Error fetching formatted quotation data:', error);
      return [];
    }
  };
useEffect(()=>{
  fetchQuotationData(number)
  fetchFormattedQuotationData(number)
},[number])  
  return (
    <div>
      <Net bb={aa} number={number} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
    </div>
  )
}

export default Classification
