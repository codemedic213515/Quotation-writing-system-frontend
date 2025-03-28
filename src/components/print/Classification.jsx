import { useState, useEffect } from "react"
import Net from "./component/Net"
import Quotate from"./component/Quotate"
import Total from "./component/Total"
import axios from "axios"
const Classification = ({ number, setActiveTab }) => {
  const [net, setNet]=useState([])
  const [quotate, setQuotate]=useState([])
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
  const fetchFormattedQuotationNet = async (quotationNumber) => {
    try {
      const response = await axios.get('/api/quotationdata/net', {
        params: { quotationNumber },
      });
      setNet(response.data)
  
      return response.data;
    } catch (error) {
      console.error('Error fetching formatted quotation data:', error);
      return [];
    }
  };
  const fetchFormattedQuotationQuotate = async (quotationNumber) => {
    try {
      const response = await axios.get('/api/quotationdata/formatted', {
        params: { quotationNumber },
      });
      setQuotate(response.data)
  
      return response.data;
    } catch (error) {
      console.error('Error fetching formatted quotation data:', error);
      return [];
    }
  };
useEffect(()=>{
  fetchQuotationData(number)
  fetchFormattedQuotationNet(number)
  fetchFormattedQuotationQuotate(number)
},[number])  
  return (
    <div className="w-full h-[60vh] overflow-auto">
    <div className="flex flex-col gap-10  mt-12 justify-middle">
      <Net net={net} number={number} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
      <Quotate net={quotate} number={number} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
      <Total net={quotate} number={number} name={quotationMain.name} creater={quotationMain.creater} exp={quotationMain.export} imp={quotationMain.import} date={quotationMain.createdAt}/>
    </div>
    </div>)
}

export default Classification
