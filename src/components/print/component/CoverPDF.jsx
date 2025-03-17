import { useState } from "react"
import { Button } from "antd"
import generateCoverPDF from "./generateCoverPDF"
const CoverPDF = ({ data }) => {   
  const [isGenerating, setIsGenerating] = useState(false)
  const title = "分 類 別 集 計 表 (見積)"
  const aa = () =>{generateCoverPDF({data, setIsGenerating})}
  return (
    <div className="text-center"> 
       
        <Button onClick={aa} disabled={isGenerating} className="w-48 h-12 text-xl">
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default CoverPDF
