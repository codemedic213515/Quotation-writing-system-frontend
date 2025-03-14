import { useState } from "react"
import { Button } from "antd"
import generatePDF from "./generatePDF"
const Net = ({ number, net, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
 const title = "分 類 別 集 計 表 (Net)"
  const aa = () =>{generatePDF({net, setIsGenerating, number, name, imp, exp, creater, date, title})}
  return (
    <div className="text-center"> 
        <p className="mb-10">内訳明細集計表(Net側)</p>
        <Button onClick={aa} disabled={isGenerating} className="w-48 h-12 text-xl">
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Net
