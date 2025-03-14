import { useState } from "react"
import { Button } from "antd"
import summary from "./component/summary"
const Summary = ({ number, summ, sumimp, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const aa = () =>{summary({summ, sumimp, setIsGenerating, number, name, imp, exp, creater, date})}
  return (
    <div>
        <Button onClick={aa} disabled={isGenerating}>
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default Summary
