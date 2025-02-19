import { useEffect, useState, useRef } from 'react';
import {
  Card,
  Checkbox,
  Divider,
  Image,
  Input,
  Modal,
  InputNumber,
  Radio,
  Select,
  Typography,
  Button,
} from 'antd';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import CoverPDF from './CoverPDF';

const { Title, Text } = Typography;
const { TextArea } = Input;
const QuotationCover = ({ number, setActiveTab }) => {
  const [quotation, setQuotation] = useState([]);
  const [quotationPrice, setQuotationPrice] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [tax, setTax] = useState(0);
  const [greeting, setGreeting] = useState('御中');
  const [taxRate, setTaxRate] = useState(10);
  const [taxAdd, setTaxAdd] = useState(false);
  const [net, setNet] = useState(0);
  const [netRate, setNetRate] = useState(10);
  const [netAdd, setNetAdd] = useState(false);
  const [other, setOther] = useState();
  const [method, setMethod] = useState('従来通り');
  const [des, setDes] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  if (number == '') {
    setActiveTab('select');
  }
  const convertToReiwa = (dateStr) => {
    const date = new Date(dateStr);
    const reiwaYear = date.getFullYear() - 2018;
    const reiwaStr = `令和${reiwaYear}年`;
    return `${reiwaStr}${date.getMonth() + 1}月${date.getDate()}日`;
  };
  const setScreen = (e) => {
    if (e != true) {
      setNetAdd(false);
      setTaxAdd(false);
      setTotalPrice(quotationPrice);
    } else {
      setTotalPrice(0);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (netAdd == true) {
      setOther(`御社ネット (¥${net}) で御願い致します。`);
    }
    if (netAdd == false) {
      setOther('');
    }
  }, [netAdd, netRate]);
  useEffect(() => {
    if (taxAdd == true) {
      setTotalPrice(Math.round(totalPrice * (1 + taxRate / 100)));
      setDes('');
    }
    if (taxAdd == false) {
      setTotalPrice(Math.round(totalPrice / (1 + taxRate / 100)));
      setDes(`本見積書は消費税を含んでおりません。(¥${tax})`);
    }
  }, [taxAdd]);
  useEffect(() => {
    getQuotationMain();
    fetchQuotationPrice();
  }, [number]);
  const fetchQuotationPrice = async () => {
    try {
      const response = await axios.get('/api/quotationprice/calculate', {
        params: { quotationNumber: number },
      });
      const roundedPrice = Math.round(response.data.totalProposalCost);
      setQuotationPrice(roundedPrice);
      setTotalPrice(roundedPrice); // Set total price initially
    } catch (error) {
      console.error('Error fetching quotation price:', error);
    }
  };
  useEffect(() => {
    if (quotation.createdAt) {
      setFormattedDate(convertToReiwa(quotation.createdAt));
    }
  }, [quotation]);
  useEffect(() => {
    setTax(Math.round((taxRate * quotationPrice) / 100));
  }, [taxRate, quotationPrice]);
  useEffect(() => {
    setNet(Math.round((netRate * quotationPrice) / 100));
  }, [netRate, quotationPrice]);
  const getQuotationMain = async (number) => {
    try {
      const response = await axios.get('/api/quotationmain', {
        params: {
          number: number,
        },
      });
      console.log('response: ', response.data.data);
      setQuotation(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const data = {
    number: number,
    formattedDate: formattedDate,
    export: quotation.export,
    totalPrice: totalPrice,
    name: quotation.name,
    address: quotation.address,
    method: method,
    greeting: greeting,
    other: other,
    des: des,
  };
  const pdfRef = useRef();
  const generatePDF = () => {
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
    <div className="w-full h-[60vh] overflow-auto">
      <div className="flex flex-row gap-8 p-6 pt-0 justify-center">
        <Card className="max-w-4xl p-2 pb-2 font-sans border-black rounded-none">
          {/* Header Section */}
          <div className="relative text-center mb-8">
            <Title level={2} className="font-normal">
              御 見 積 書
            </Title>
            <Text className="absolute right-0 top-0 border-b border-gray-300">
              № {number}
            </Text>
            <Text className="absolute right-0 top-8 border-b border-gray-300">
              {formattedDate}
            </Text>
          </div>
          <Divider className=" border-gray-300 " />

          <div className="flex justify-between">
            <div className="w-3/5">
              <div className="flex gap-10">
                <Text className="text-lg">{quotation.export}</Text>
                <Select
                  className="ml-5 w-auto"
                  value={greeting}
                  popupMatchSelectWidth={false}
                  onSelect={(e) => setGreeting(e)}
                  suffixIcon
                >
                  <Select.Option value="御中">御中</Select.Option>
                  <Select.Option value="御殿">御殿</Select.Option>
                  <Select.Option value="様">様</Select.Option>
                </Select>
              </div>
              {/* Total Amount */}
              <div className="my-8 w-96 p-0 ">
                <div className="flex border border-gray-900">
                  <div className="bg-gray-900 text-white px-6 py-2 ">
                    <Text className="text-white text-lg">御 見 積 総 額</Text>
                  </div>
                  <div className="flex-1 text-right px-6 py-2">
                    <Text className="text-2xl italic">
                      ¥{Intl.NumberFormat('en-US').format(totalPrice)}
                    </Text>
                  </div>
                </div>
              </div>
              {/* Project Details */}
              <div className="space-y-4">
                <div className="flex border-b border-gray-300 pb-2">
                  <Text className="w-32">工 事 名</Text>
                  <Text>{quotation.name}</Text>
                </div>

                <div className="flex border-b border-gray-300 pb-2">
                  <Text className="w-32">工 事 場 所</Text>
                  <Text>{quotation.address}</Text>
                </div>

                <div className="flex border-b border-gray-300 pb-2">
                  <Text className="w-32">有 効 期 限</Text>
                  <Text>3ヶ月</Text>
                </div>

                <div className="flex border-b border-gray-300 pb-2 items-center">
                  <Text className="w-32">御 支 払 条 件</Text>
                  <Select
                    className="w-auto"
                    allowClear
                    value={method}
                    popupMatchSelectWidth={false}
                    suffixIcon
                    onSelect={(e) => setMethod(e)}
                  >
                    <Select.Option value="従来通り">従来通り</Select.Option>
                    <Select.Option value="現金">現金</Select.Option>
                    <Select.Option value="御商談の上">御商談の上</Select.Option>
                  </Select>
                  <Text className="text-xs ml-2">{other}</Text>
                </div>
              </div>
              {/* Remarks */}
              <div className="mt-4">
                <Text>備 考: {des}</Text>
              </div>
            </div>
            <div className="w-2/6">
              <div className="flex flex-col ">
                <div className="p-10">
                  <div className="text-lg flex justify-between">
                    <span>関</span>
                    <span>西</span>
                    <span>電</span>
                    <span>力</span>
                    <span>認</span>
                    <span>定</span>
                  </div>
                  <div className="text-lg flex justify-between mb-6">
                    <span>各</span>
                    <span>種</span>
                    <span>電</span>
                    <span>気</span>
                    <span>設</span>
                    <span>備</span>
                    <span>工</span>
                    <span>事</span>
                    <span>設</span>
                    <span>計</span>
                    <span>施</span>
                    <span>工</span>
                  </div>
                  <div className="w-full flex  justify-between">
                    {/* Company Info */}
                    <div className="w-1/3 h-full my-auto">
                      <Image src="/img/company.webp" preview={false}></Image>
                    </div>
                    <div className="right-8 top-40 text-right w-2/3 items-center">
                      <Title level={3} className="mb-2">
                        松 尾 電 設
                      </Title>
                      <div className="space-y-1">
                        <Text>〒565-0064 大阪府河内長野市殿ヶ丘2-3-2</Text>
                        <br />
                        <Text>TEL: 072(154)5304</Text>
                        <br />
                        <Text>FAX: 072(154)5522</Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-0">
                  <div className="flex justify-end">
                    <div className="w-16 h-16 border border-gray-900"></div>
                    <div className="w-20 h-16 border border-gray-900"></div>
                    <div className="w-16 h-16 border border-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TextArea rows={2} className="text-lg mt-2 rounded-none" />
        </Card>
        <div className=" w-2/5">
          <Card className="mt-10 items-center ">
            <Typography>消費税を表示</Typography>
            <Radio.Group
              defaultValue={false}
              onChange={(e) => setTaxAdd(e.target.value)}
            >
              <Radio value={true}>する</Radio>
              <Radio value={false}>しない</Radio>
            </Radio.Group>
            <InputNumber
              addonAfter={'%'}
              max={100}
              min={1}
              value={taxRate}
              onChange={(e) => setTaxRate(e)}
              className="w-20"
            />
            <Text className="text-lg pl-4 items-center">
              ¥{Intl.NumberFormat('en-US').format(tax)}
            </Text>
          </Card>
          <Card className="mt-10 items-center">
            <Typography>御社ネットを表示</Typography>
            <Radio.Group
              defaultValue={false}
              onChange={(e) => setNetAdd(e.target.value)}
            >
              <Radio value={true}>する</Radio>
              <Radio value={false}>しない</Radio>
            </Radio.Group>
            <InputNumber
              addonAfter={'%'}
              max={100}
              min={1}
              className="w-20"
              value={netRate}
              onChange={(e) => setNetRate(e)}
            />
            <Text className="text-lg pl-4 items-center">
              ¥{Intl.NumberFormat('en-US').format(net)}
            </Text>
          </Card>
          <Checkbox
            className="mt-10 pl-6"
            onChange={(e) => setScreen(e.target.checked)}
          >
            金抜き
          </Checkbox>
          <Button
            onClick={() => {
              openModal();
            }}
          >
            Print PDF
          </Button>
        </div>
        <Modal
          title="見積プレビュー"
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
              onClick={generatePDF}
            >
              Download PDF
            </Button>,
          ]}
          width={900}
        >
          <div ref={pdfRef}>
            <CoverPDF data={data} />
          </div>
        </Modal>
      </div>{' '}
    </div>
  );
};

export default QuotationCover;
