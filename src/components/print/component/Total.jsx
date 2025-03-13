import { useState } from "react"
import { Button } from "antd"
import generateTotal from "./generateTotal"
const Total = ({ number, net, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const aa = () =>{generateTotal({net, setIsGenerating, number, name, imp, exp, creater, date})}
  return (
    <div>
        <div>Total</div>
        <Button onClick={aa} disabled={isGenerating}>
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Total
