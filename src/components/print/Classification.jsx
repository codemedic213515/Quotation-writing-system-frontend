import { useState, useEffect } from "react"
import Total from "./component/Total"

const Classification = ({ number, setActiveTab }) => {
  if (number == "") {
    setActiveTab("select")
  }


  return (
    <div>
      <Total/>
    </div>
  )
}

export default Classification
