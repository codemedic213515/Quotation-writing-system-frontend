import { useState } from "react"
import { Button } from "antd"
import generatePDF from "./generatePDF"
const Quotate = ({ number, net, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const title = "分 類 別 集 計 表 (見積)"
  const aa = () =>{generatePDF({net, setIsGenerating, number, name, imp, exp, creater, date, title})}
  return (
    <div>
        <div>Quotate</div>
        <Button onClick={aa} disabled={isGenerating}>
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Quotate
