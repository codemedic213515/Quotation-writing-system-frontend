import { Button, Card, Input, InputNumber, Radio, Table ,Modal} from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2pdf from 'html2pdf.js';
import { useEffect, useState, useRef} from 'react';
import Detail from "./component/Detail"
const Detailed = ({ number, setActiveTab }) => {
  if (number === '') {
    setActiveTab('select');
  }
  const [types, setTypes] = useState([]);
  const [prices, setPrices] = useState([]);

  const [addtion1Name, setAddition1Name] = useState('');
  const [additon1Rate, setAddtion1Rate] = useState(0);
  const [addition1Select, setAddition1Select] = useState(false);

  const [addtion2Name, setAddition2Name] = useState('');
  const [additon2Rate, setAddtion2Rate] = useState(0);
  const [addition2Select, setAddition2Select] = useState(false);

  const [addtion3Name, setAddition3Name] = useState('');
  const [additon3Rate, setAddtion3Rate] = useState(0);
  const [addition3Select, setAddition3Select] = useState(false);

  const [addtion4Name, setAddition4Name] = useState('');
  const [additon4Rate, setAddtion4Rate] = useState(0);
  const [addition4Select, setAddition4Select] = useState(false);

  const [discount, setDiscount] = useState('');
  const [discountSelect, setDiscountSelect] = useState(false);

  const [taxRate, setTaxRate] = useState(0);
  const [taxSelect, setTaxSelect] = useState(false);

  const [special, setSpecial] = useState(0);
  const [specialRate, setSpecialRate] = useState(0);
  const [specialSelect, setSpecialSelect] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const columns = [
    { title: 'No.', dataIndex: 'no', key: 'no', align: 'center', width: 50 },
    {
      title: '項 目 ・ 形 状 寸 法',
      dataIndex: 'item',
      key: 'item',
      align: 'center',
      width: 250,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 80,
    },
    {
      title: '単位',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
      width: 80,
    },
    {
      title: '単価',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'center',
      width: 120,
      render: (value) => (value ? `¥${value.toLocaleString()}` : ''),
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 150,
      render: (value) => (value ? `¥${value.toLocaleString()}` : ''),
    },
    {
      title: '摘要',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'center',
      width: 100,
    },
  ];
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const fetchTypes = async () => {
    try {
      const response = await axios.get('/api/quotationtype', {
        params: { number: number },
      });
      console.log("Types : ", response.data);
      return response.data;
      
    } catch (error) {
      console.error('Error fetching types:', error);
      return [];
    }
  };

  const fetchPrices = async () => {
    try {
      const response = await axios.get('/api/quotationprice/type', {
        params: { quotationNumber: number },
      });
      console.log("Prices : ", response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching prices:', error);
      return [];
    }
  };

  const formatDataForTable = (types, prices) => {
    let formattedData = [];
    let totalAmount = 0;
    let rowIndex = 1;

    types.forEach((type) => {
      const priceData = prices.find((p) => p.quotationTypeId === type.id);
      const amount = priceData ? Math.round(priceData.totalProposalCost) : 0;
      totalAmount += Math.round(amount);

      if (type.category1 && !type.category2 && !type.category3) {
        // Only category1 (No category2, No category3)
        formattedData.push({
          key: rowIndex,
          no: `${rowIndex}`,
          item: type.category1,
          quantity: 1,
          unit: '式',
          unitPrice: '',
          amount: amount,
          remarks: '',
        });
      } else if (type.category1 && type.category2 && !type.category3) {
        // category1 -> category2 (No category3)
        formattedData.push({
          key: rowIndex,
          no: `${rowIndex}`,
          item: type.category1,
          quantity: '',
          unit: '',
          unitPrice: '',
          amount: '',
          remarks: '',
        });

        formattedData.push({
          key: `${rowIndex}-1`,
          no: `${rowIndex}-1`,
          item: type.category2,
          quantity: 1,
          unit: '式',
          unitPrice: '',
          amount: amount,
          remarks: '',
        });
      } else if (type.category1 && type.category2 && type.category3) {
        // category1 -> category2 -> category3
        formattedData.push({
          key: rowIndex,
          no: `${rowIndex}`,
          item: type.category1,
          quantity: '',
          unit: '',
          unitPrice: '',
          amount: '',
          remarks: '',
        });

        formattedData.push({
          key: `${rowIndex}-1`,
          no: `${rowIndex}-1`,
          item: type.category2,
          quantity: '',
          unit: '',
          unitPrice: '',
          amount: '',
          remarks: '',
        });

        formattedData.push({
          key: `${rowIndex}-1-1`,
          no: `${rowIndex}-1-1`,
          item: type.category3,
          quantity: 1,
          unit: '式',
          unitPrice: '',
          amount: amount,
          remarks: '',
        });
      }

      rowIndex++;
    });

    if (addition1Select == true && addtion1Name != '') {
      formattedData.push({
        key: 'addition1',
        no: '',
        item: addtion1Name,
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: Math.round((additon1Rate * totalAmount) / 100),
        remarks: '',
      });
    } else if (addition1Select == false) {
      formattedData = formattedData.filter(
        (item) => item.item !== addtion1Name,
      );
    }
    if (addition2Select == true && addtion2Name != '') {
      formattedData.push({
        key: 'addition2',
        no: '',
        item: addtion2Name,
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: Math.round((additon2Rate * totalAmount) / 100),
        remarks: '',
      });
    } else if (addition2Select == false) {
      formattedData = formattedData.filter(
        (item) => item.item !== addtion2Name,
      );
    }
    if (addition3Select == true && addtion3Name != '') {
      formattedData.push({
        key: 'addition3',
        no: '',
        item: addtion3Name,
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: Math.round((additon3Rate * totalAmount) / 100),
        remarks: '',
      });
    } else if (addition3Select == false) {
      formattedData = formattedData.filter(
        (item) => item.item !== addtion3Name,
      );
    }
    if (addition4Select == true && addtion4Name != '') {
      formattedData.push({
        key: 'addition4',
        no: '',
        item: addtion4Name,
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: Math.round((additon4Rate * totalAmount) / 100),
        remarks: '',
      });
    } else if (addition4Select == false) {
      formattedData = formattedData.filter(
        (item) => item.item !== addtion4Name,
      );
    }

    formattedData.push(
      {
        key: '',
        no: '',
        item: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        amount: '',
        remarks: '',
      },
      {
        key: 'total',
        no: '',
        item: '合 計',
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount:
          totalAmount +
          (addition1Select == true && addtion1Name != ''
            ? Math.round((additon1Rate * totalAmount) / 100)
            : 0) +
          (addition2Select == true && addtion2Name != ''
            ? Math.round((additon2Rate * totalAmount) / 100)
            : 0) +
          (addition3Select == true && addtion3Name != ''
            ? Math.round((additon3Rate * totalAmount) / 100)
            : 0) +
          (addition4Select == true && addtion4Name != ''
            ? Math.round((additon4Rate * totalAmount) / 100)
            : 0),
        remarks: '',
      },
    );
    if (discountSelect == true && discount != '') {
      formattedData.push({
        key: 'discount',
        no: '',
        item: '出精値引',
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: `${discount} ⇩`,
        remarks: '',
      });
    } else if (discountSelect == false) {
      formattedData = formattedData.filter((item) => item.item !== '出精値引');
    }
    if (taxSelect == true && taxRate != '') {
      formattedData.push({
        key: 'tax',
        no: '',
        item: '消費税',
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: Math.round(
          (taxRate *
            (totalAmount +
              (addition1Select == true && addtion1Name != ''
                ? Math.round((additon1Rate * totalAmount) / 100)
                : 0) +
              (addition2Select == true && addtion2Name != ''
                ? Math.round((additon2Rate * totalAmount) / 100)
                : 0) +
              (addition3Select == true && addtion3Name != ''
                ? Math.round((additon3Rate * totalAmount) / 100)
                : 0) +
              (addition4Select == true && addtion4Name != ''
                ? Math.round((additon4Rate * totalAmount) / 100)
                : 0))) /
            100,
        ),
        remarks: '',
      });
    } else if (taxSelect == false) {
      formattedData = formattedData.filter((item) => item.item !== '消費税');
    }
    if (specialSelect == true && specialRate != '' && special != '') {
      formattedData.push({
        key: 'special',
        no: '',
        item: specialRate,
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount: special,
        remarks: '',
      });
    } else if (specialSelect == false) {
      formattedData = formattedData.filter((item) => item.item !== specialRate);
    }
    if (discountSelect == true || taxSelect == true || specialSelect == true) {
      formattedData.push({
        key: 'amount',
        no: '',
        item: '改 め 合 計',
        quantity: 1,
        unit: '式',
        unitPrice: '',
        amount:
          totalAmount -
          (discountSelect == true && discount != '' ? discount : 0) +
          (taxSelect == true && taxRate != ''
            ? Math.round((taxRate * totalAmount) / 100)
            : 0) +
          (specialSelect == true && specialRate != '' && special != ''
            ? special
            : 0) +
          (addition1Select == true && addtion1Name != ''
            ? Math.round((additon1Rate * totalAmount) / 100)
            : 0) +
          (addition2Select == true && addtion2Name != ''
            ? Math.round((additon2Rate * totalAmount) / 100)
            : 0) +
          (addition3Select == true && addtion3Name != ''
            ? Math.round((additon3Rate * totalAmount) / 100)
            : 0) +
          (addition4Select == true && addtion4Name != ''
            ? Math.round((additon4Rate * totalAmount) / 100)
            : 0),
        remarks: '',
      });
    } else if (
      discountSelect == false &&
      taxSelect == false &&
      specialSelect == false
    ) {
      formattedData = formattedData.filter(
        (item) => item.item !== '改 め 合 計',
      );
    }
    return formattedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!number) return;

      const fetchedTypes = await fetchTypes();
      const fetchedPrices = await fetchPrices();

      setTypes(fetchedTypes);
      setPrices(fetchedPrices);
      console.log(types, prices);

      setTableData(formatDataForTable(fetchedTypes, fetchedPrices));
    };

    fetchData();
  }, [number]);

  useEffect(() => {
    setTableData(formatDataForTable(types, prices));
  }, [
    addition1Select,
    addtion1Name,
    additon1Rate,
    addition2Select,
    addtion2Name,
    additon2Rate,
    addition3Select,
    addtion3Name,
    additon3Rate,
    addition4Select,
    addtion4Name,
    additon4Rate,
    discountSelect,
    discount,
    taxRate,
    taxSelect,
    special,
    specialRate,
    specialSelect,
    types,
    prices,
  ]);
  console.log(tableData);

  const generatePDF = async () => {
    if (!Array.isArray(tableData) || tableData.length === 0) {
      console.error('Error: tableData is undefined or not an array.');
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Fetch and load the font dynamically
    const fontResponse = await fetch(
      'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
    );
    const fontBuffer = await fontResponse.arrayBuffer();
    const fontBase64 = btoa(
      new Uint8Array(fontBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );

    doc.addFileToVFS('NotoSansJP-Regular.ttf', fontBase64);
    doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
    doc.setFont('NotoSansJP');

    // Header
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('工 種 別 内 訳 表', doc.internal.pageSize.width / 2, 15, {
      align: 'center',
    });

    // Define Table Columns
    const tableColumn = [
      'No.',
      '項 目 ・ 形 状 寸 法',
      '数量',
      '単位',
      '単価',
      '金額',
      '摘要',
    ];
    const tableRows = [];

    // Format Table Data
    tableData.forEach((row) => {
      tableRows.push([
        row.no || '',
        row.item || '',
        row.quantity || '',
        row.unit || '',
        row.unitPrice ? `¥${row.unitPrice.toLocaleString()}` : '',
        row.amount ? `¥${row.amount.toLocaleString()}` : '',
        row.remarks || '',
      ]);
    });

    // Table Styling
    doc.autoTable({
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: {
        font: 'NotoSansJP',
        fontSize: 10,
        textColor: [0, 0, 0],
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.4,
        lineColor: [0, 0, 0], // Black border
        fillColor: [255, 255, 255], // White background
      },
      headStyles: {
        fillColor: [255, 255, 255], // White header
        textColor: [0, 0, 0], // Black text
        fontSize: 12,
        fontStyle: 'bold',
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.4,
        lineColor: [0, 0, 0], // Black header border
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Keep alternating rows white
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' }, // No.
        1: { cellWidth: 120, halign: 'left' }, // 項 目 ・ 形 状 寸 法
        2: { cellWidth: 20, halign: 'right' }, // 数量
        3: { cellWidth: 20, halign: 'center' }, // 単位
        4: { cellWidth: 25, halign: 'right' }, // 単価
        5: { cellWidth: 30, halign: 'right' }, // 金額
        6: { cellWidth: 50, halign: 'left' }, // 摘要
      },
      theme: 'grid',
      margin: { left: 10, right: 10 },
    });

    // Footer (Page Numbering)
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `E-${i}頁`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10,
        { align: 'right' },
      );
    }
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    // Save PDF
    doc.save(`Quotation_${number}.pdf`);
  };
   const pdfRef = useRef();
   const generateDetail = () => {
     const element = pdfRef.current;
     if (element) {
       html2pdf()
         .from(element)
         .set({
           margin: 20,
           filename: `${number}.pdf`,
           image: { type: 'png', quality: 0.98 },
           html2canvas: { scale: 2, useCORS: true },
           jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
         })
         .save(`${number}.pdf`)
         .outputPdf('blob') // ✅ Output as blob
         .then((pdfBlob) => {
           const blobUrl = URL.createObjectURL(pdfBlob);
           window.open(blobUrl, '_blank'); // ✅ Open in a new tab
         });
     }
     closeModal();
   };
  return (
    <div className="w-full p-6 bg-white ">
      <div className="flex w-full gap-4">
        <div className="w-3/4 h-[55vh] overflow-auto " id="table">
          <h2 className="text-center text-lg font-bold mb-4 border-b pb-2">
            工 種 別 内 訳 表
          </h2>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false} // No pagination
            bordered
            className="w-full"
          />
        </div>
        <div className="w-1/4 flex flex-col gap-2 items-center h-[55vh] overflow-auto ">
          <h1 className="text-center font-bold text-lg">編集</h1>
          <div className="flex gap-2">
            <Button onClick={generatePDF}>工種別内訳表</Button>
            <Button     onClick={() => {
              openModal();
            }}>内訳明細書</Button>
          </div>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">経費①</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={addition1Select}
                onChange={(e) => setAddition1Select(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <InputNumber
                  className="w-2/5"
                  addonAfter={'%'}
                  min={1}
                  max={100}
                  value={additon1Rate}
                  onChange={(e) => setAddtion1Rate(e)}
                />
                <Input
                  value={addtion1Name}
                  onChange={(e) => setAddition1Name(e.target.value)}
                />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">経費②</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={addition2Select}
                onChange={(e) => setAddition2Select(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <InputNumber
                  className="w-2/5"
                  addonAfter={'%'}
                  min={1}
                  max={100}
                  value={additon2Rate}
                  onChange={(e) => setAddtion2Rate(e)}
                />
                <Input
                  value={addtion2Name}
                  onChange={(e) => setAddition2Name(e.target.value)}
                />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">経費③</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={addition3Select}
                onChange={(e) => setAddition3Select(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <InputNumber
                  className="w-2/5"
                  addonAfter={'%'}
                  min={1}
                  max={100}
                  value={additon3Rate}
                  onChange={(e) => setAddtion3Rate(e)}
                />
                <Input
                  value={addtion3Name}
                  onChange={(e) => setAddition3Name(e.target.value)}
                />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">経費④</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={addition4Select}
                onChange={(e) => setAddition4Select(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <InputNumber
                  className="w-2/5"
                  addonAfter={'%'}
                  min={1}
                  max={100}
                  value={additon4Rate}
                  onChange={(e) => setAddtion4Rate(e)}
                />
                <Input
                  value={addtion4Name}
                  onChange={(e) => setAddition4Name(e.target.value)}
                />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">出精値引</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={discountSelect}
                onChange={(e) => setDiscountSelect(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <Input onChange={(e) => setDiscount(e.target.value)} />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">消費税</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={taxSelect}
                onChange={(e) => setTaxSelect(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <InputNumber
                  className="w-2/5"
                  addonAfter={'%'}
                  min={1}
                  max={100}
                  value={taxRate}
                  onChange={(e) => setTaxRate(e)}
                />
              </div>
            </div>
          </Card>
          <Card bodyStyle={{ padding: '6px' }} className="w-full px-2">
            <div className="flex flex-row items-center ">
              <span className="w-[12px] font-bold mx-4">特別項目</span>
              <Radio.Group
                className="flex flex-col gap-2"
                value={specialSelect}
                onChange={(e) => setSpecialSelect(e.target.value)}
              >
                <Radio value={true}>有</Radio>
                <Radio value={false}>無</Radio>
              </Radio.Group>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="name"
                  onChange={(e) => setSpecialRate(e.target.value)}
                />
                <InputNumber
                  className="w-full"
                  placeholder="amount"
                  onChange={(e) => setSpecial(e)}
                />
              </div>
            </div>
          </Card>
         
        </div>
      </div>
      <Modal
          title="工 種 別 内 訳 表"
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Close
            </Button>,
            <Button
              key="download"
              shape="square"
              type="primary"
              className="bg-blue-600"
              onClick={generateDetail}
            >
              Download PDF
            </Button>,
          ]}
          width={900}
        >
          <div ref={pdfRef}>
            <Detail 
            // data={data}
            />
          </div>
        </Modal>
    </div>
  );
};

export default Detailed;
