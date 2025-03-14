import { useState } from "react"
import { Button } from "antd"
import generatePDF from "./generatePDF"
const Quotate = ({ number, net, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const title = "分 類 別 集 計 表 (見積)"
  const aa = () =>{generatePDF({net, setIsGenerating, number, name, imp, exp, creater, date, title})}
  return (
    <div className="text-center"> 
        <p className="mb-10">内訳明細集計表(見積側)</p>
        <Button onClick={aa} disabled={isGenerating} className="w-48 h-12 text-xl">
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Quotate
