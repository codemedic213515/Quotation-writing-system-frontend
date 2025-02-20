import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Radio, Select, Form, FloatButton } from 'antd';
import axios from 'axios';

const { Option } = Select;

export function MaterialInput({ setActiveTab, number }) {
  const [data, setData] = useState([]);
  const [materialMethod, setMaterialMethod] = useState(false); // Default to "B材のみ"
  const [minorityValue, setMinority] = useState(false); // Default to ""

  const [laborBasisRate, setLaborBasisRate] = useState(0); // Default labor rate is 0
  const [quotationData, setQuotationData] = useState(null); // Store fetched quotation data

  // Fetch data based on the quotation number (number prop)
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/quotationtype/${number}`);
      const fetchedData = response.data.map((item, index) => ({
        key: item.id,
        number: item.number,
        no: index + 1,
        workType: `${item.category1} ${item.category2} ${item.category3}`,
        rate: item.removalRate,
        calculation: item.calculate,
        // delete: item.delete,
      }));
      setData(fetchedData);
      setQuotationData(response.data); // Store the full quotation data
    } catch (error) {
      console.error('Error fetching quotation data:', error);
    }
  };

  useEffect(() => {
    if (number) {
      fetchData(); // Fetch data for the given quotation number
    }
  }, [number]);

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const sendData = async () => {
    try {
      // Prepare the updated data for the backend
      const updatedData = data.map((item) => ({
        id: item.key,
        removalRate: item.rate, // Assuming rate corresponds to RemovalRate
        calculate: item.calculation, // Assuming calculation corresponds to 'calculate'
      }));

      const quotationCalcData = {
        Number: number,
        Minority: minorityValue === '工種ごとの部材ごと' ? 0 : laborBasisRate,
        ABMethod: materialMethod === 'A材も含む' ? true : false, // Convert 'A材も含む' to true, else false
      };

      console.log(updatedData);

      await Promise.all(
        updatedData.map(async (item) => {
          await axios.put(`/api/quotationtype/${item.id}`, {
            removalRate: item.removalRate,
            calculate: item.calculate,
          });
        }),
      );

      await axios.post('/api/quotationcalc', quotationCalcData);
      setActiveTab('other'); // Navigate to the next tab after updating
    } catch (error) {
      console.error('Error updating quotation data:', error);
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: '10%',
    },
    {
      title: '工種名',
      dataIndex: 'workType',
      key: 'workType',
      align: 'center',
      width: '50%',
    },
    {
      title: '雑消率',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.rate}
          addonAfter="%"
          max={100}
          min={0}
          onChange={(value) => handleInputChange(record.key, 'rate', value)}
          className="w-24"
        />
      ),
    },
    {
      title: '計算を',
      dataIndex: 'calculation',
      key: 'calculation',
      align: 'center',
      render: (text, record) => (
        <Select
        popupMatchSelectWidth={false}
          value={record.calculation}
          onChange={(value) =>
            handleInputChange(record.key, 'calculation', value)
          }
          className="w-24"
        >
          <Option value={true}>する</Option>
          <Option value={false}>しない</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form>
        <Form.Item label="計算方法 : ">
          <Radio.Group
            className="items-center flex flex-row gap-4"
            value={minorityValue}
            onChange={(e) => setMinority(e.target.value)}
          >
            <Radio value="工種ごとの部材ごと">工種ごとの部材ごと</Radio>
            <Radio value="労務費基準">
              <div className="flex flex-row gap-2 items-center">
                <p>労務費基準:</p>
                <InputNumber
                  value={laborBasisRate}
                  addonAfter="%"
                  max={100}
                  min={0}
                  onChange={(value) => setLaborBasisRate(value)}
                  className="w-24"
                />
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <div className="flex flex-row gap-4">
          <Form.Item className="w-full">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              className="mb-4 border-collapse"
            />
          </Form.Item>

          <Form.Item className="p-4 border border-gray-300 bg-gray-100">
            <div className="font-bold text-lg mb-2">雑材消耗費の計算方法</div>
            <Radio.Group
              onChange={(e) => setMaterialMethod(e.target.value)}
              value={materialMethod}
              className="space-y-2"
            >
              <Radio value={false} className="block">
                B材のみ
              </Radio>
              <Radio value={true} className="block">
                A材も含む
              </Radio>
            </Radio.Group>

            <div className="text-gray-500 mt-2">
              ※ 工種・部材を選択した場合のみ有効です。
            </div>
          </Form.Item>
        </div>
      </Form>

      <FloatButton
        shape="square"
        type="primary"
        onClick={sendData}
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default MaterialInput;
