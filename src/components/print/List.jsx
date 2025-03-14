import { useState } from "react"
import { Button } from "antd"
import list from "./component/list"
const List = ({ number, endData, name, imp, exp, creater, date }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const aa = () =>{list({ setIsGenerating,endData, number, name, imp, exp, creater, date})}
  return (
    <div>
        <Button onClick={aa} disabled={isGenerating}>
          {isGenerating ? "PDFを生成中..." : "PDFを生成"}
        </Button>
    </div>
  )
}

export default List
