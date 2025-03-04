import { useState } from "react"
import { Button } from "antd"
import generatePDF from "./generatePDF"
const Total = ({ number, setActiveTab }) => {
  if (number == "") {
    setActiveTab("select")
  }

  const [isGenerating, setIsGenerating] = useState(false)

  const sampleData = [
    { category: "* 電気設備工事", isHeader: true },
    {
      item: "照明器具",
      subItem: "FL 40w-2(埋込)",
      unit: "台",
      quantity: "6.0",
      unitPrice: "",
      amount: "",
      notes: "再使用",
      indent: 0,
    },
    {
      item: "補 足 材",
      subItem: "盤取付支持材",
      unit: "式",
      quantity: "1.0",
      unitPrice: "2,400",
      amount: "2,400",
      notes: "",
      indent: 0,
    },
    {
      item: "ケーブル",
      subItem: "ケーブル",
      unit: "式",
      quantity: "1.0",
      unitPrice: "2,400",
      amount: "2,400",
      notes: "",
      indent: 0,
    },
    {
      item: "補 足 材",
      unit: "式",
      quantity: "1.0",
      unitPrice: "120",
      amount: "120",
      notes: "",
      indent: 1,
    },
    {
      item: "雑材消耗品",
      unit: "式",
      quantity: "1.0",
      unitPrice: "480",
      amount: "480",
      notes: "",
      indent: 0,
    },
    {
      isSubtotal: true,
      label: "【　機材費　　　小　　計　】",
      amount: "5,400",
      subtotalType: "first",
    },
    {
      item: "労務費",
      subItem: "電　　工",
      unit: "式",
      quantity: "3.3",
      unitPrice: "40,000",
      amount: "131,360",
      notes: "",
      indent: 0,
    },
    {
      item: "付帯工事",
      subItem: "天井開口補強費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "",
      amount: "",
      notes: "建築",
      indent: 0,
    },
    {
      item: "電動機結線費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "16,500",
      amount: "16,500",
      notes: "",
      indent: 0,
    },
    {
      item: "現場雑費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "7,663",
      amount: "7,663",
      notes: "5(%)",
      indent: 0,
    },
    {
      item: "諸経費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "16,140",
      amount: "16,140",
      notes: "10(%)",
      indent: 0,
    },
    {
      isSubtotal: true,
      label: "【　労務･経費　　　小　　計　】",
      amount: "171,663",
      subtotalType: "second",
    },
    {
      isTotal: true,
      label: "【　電 気 設 備 工 事 合 計　】",
      unit: "１式",
      amount: "177,063",
    },
    { category: "* 電気設備工事aa", isHeader: true },
    {
      item: "照明器具",
      subItem: "FL 40w-2(埋込)",
      unit: "台",
      quantity: "6.0",
      unitPrice: "",
      amount: "",
      notes: "再使用",
      indent: 0,
    },
    {
      item: "補 足 材",
      subItem: "盤取付支持材",
      unit: "式",
      quantity: "1.0",
      unitPrice: "2,400",
      amount: "2,400",
      notes: "",
      indent: 0,
    },
    {
      item: "ケーブル",
      subItem: "ケーブル",
      unit: "式",
      quantity: "1.0",
      unitPrice: "2,400",
      amount: "2,400",
      notes: "",
      indent: 0,
    },
    {
      item: "補 足 材",
      unit: "式",
      quantity: "1.0",
      unitPrice: "120",
      amount: "120",
      notes: "",
      indent: 1,
    },
    {
      item: "雑材消耗品",
      unit: "式",
      quantity: "1.0",
      unitPrice: "480",
      amount: "480",
      notes: "",
      indent: 0,
    },
    {
      isSubtotal: true,
      label: "【　機材費　　　小　　計　】",
      amount: "5,400",
      subtotalType: "first",
    },
    {
      item: "労務費",
      subItem: "電　　工",
      unit: "式",
      quantity: "3.3",
      unitPrice: "40,000",
      amount: "131,360",
      notes: "",
      indent: 0,
    },
    {
      item: "付帯工事",
      subItem: "天井開口補強費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "",
      amount: "",
      notes: "建築",
      indent: 0,
    },
    {
      item: "電動機結線費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "16,500",
      amount: "16,500",
      notes: "",
      indent: 0,
    },
    {
      item: "現場雑費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "7,663",
      amount: "7,663",
      notes: "5(%)",
      indent: 0,
    },
    {
      item: "諸経費",
      unit: "式",
      quantity: "1.0",
      unitPrice: "16,140",
      amount: "16,140",
      notes: "10(%)",
      indent: 0,
    },
    {
      isSubtotal: true,
      label: "【　労務･経費　　　小　　計　】",
      amount: "171,663",
      subtotalType: "second",
    },
    {
      isTotal: true,
      label: "【　電 気 設 備 工 事     合 計　】",
      unit: "１式",
      amount: "177,063",
    }
  ]
  const aa = () =>{generatePDF({sampleData, setIsGenerating, number})}
  return (
    <div>
        <div>Net</div>
      <Button onClick={aa} disabled={isGenerating}>
        {isGenerating ? "PDFを生成中..." : "PDFを生成"}
      </Button>
    </div>
  )
}

export default Total
