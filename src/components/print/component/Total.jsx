import { useState } from "react"
import { Button } from "antd"
import generateTotal from "./generateTotal"
const Total = ({ number, net, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const aa = () =>{generateTotal({net, setIsGenerating, number, name, imp, exp, creater, date})}
  return (
    <div className="text-center"> 
        <p className="mb-10">内訳明細集計表(全出力)</p>
        <Button onClick={aa} disabled={isGenerating} className="w-48 h-12 text-xl">
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Total
