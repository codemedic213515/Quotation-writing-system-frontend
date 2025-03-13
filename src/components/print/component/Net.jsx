import { useState } from "react"
import { Button } from "antd"
import generatePDF from "./generatePDF"
const Net = ({ number, bb, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const aa = () =>{generatePDF({bb, setIsGenerating, number, name, imp, exp, creater, date})}
  return (
    <div>
        <div>Net</div>
      <Button onClick={aa} disabled={isGenerating}>
        {isGenerating ? "PDFを生成中..." : "PDFを生成"}
      </Button>
    </div>
  )
}

export default Net
