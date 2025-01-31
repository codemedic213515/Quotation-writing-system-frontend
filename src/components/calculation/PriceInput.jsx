import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Select, Form, Radio, FloatButton } from 'antd';
import axios from 'axios';

export function PriceInput({ setActiveTab, number }) {
  const [dataA, setDataA] = useState([]);
  const [data, setData] = useState([]);
  const [dataB, setDataB] = useState([]);

  // Fetch material data
  const fetchABmaterial = async () => {
    try {
      const response = await axios.get('/api/abmaterial');
      const a = response.data.filter((item) => item.abCode === '1');
      const updatedDataA = a.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      setData(updatedDataA);
      setDataA(updatedDataA);
      const b = response.data.filter((item) => item.abCode === '2');
      const updatedDataB = b.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      setDataB(updatedDataB);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchABmaterial();
  }, []);

  if (number == '') {
    setActiveTab('select');
  }

  const sendData = async () => {
    try {
      // Send updated data to the backend
      await Promise.all(
        data.map(async (item) => {
          // Only update the items that were changed
          await axios.put(`/api/abmaterial/${item.id}`, {
            ...item,
            rate: item.rate, // Only send fields that were modified
            cost: item.cost,
          });
        }),
      );
      // After updating, navigate to the next tab
      setActiveTab('material');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: '5%',
    },
    {
      title: '分類名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '20%',
    },
    {
      title: '乗率修正',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: (text, record) => (
        <>
          <div className="flex items-center justify-center">
            <p>
              {record.rate}
              {'  =>  '}
            </p>
            <InputNumber
              value={record.rate}
              max={1}
              min={0.0}
              step={0.01}
              onChange={(e) => handleInputChange(record.key, 'rate', e)}
              className="w-24"
            />
          </div>
        </>
      ),
    },
    {
      title: '修正',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (text, record) => (
        <>
          <div className="flex items-center justify-center">
            <p>
              {record.cost}
              {'=>'}
            </p>
            <InputNumber
              value={record.cost}
              max={1}
              min={0.0}
              step={0.01}
              onChange={(e) => handleInputChange(record.key, 'cost', e)}
              className="w-24"
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form>
        <div className="flex flex-row gap-4 justify-end items-center">
          <Form.Item label="表示分類">
            <Radio.Group
              optionType="button"
              defaultValue={'A'}
              onChange={(e) => {
                if (e.target.value === 'A') {
                  setData(dataA);
                }
                if (e.target.value === 'B') {
                  setData(dataB);
                }
              }}
            >
              <Radio value="A">A 材</Radio>
              <Radio value="B">B 材</Radio>
            </Radio.Group>
            {'  定'}
          </Form.Item>
        </div>

        <Form.Item>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomcenter'],
              pageSize: 5,
            }}
            bordered
            className="border border-gray-300"
          />
        </Form.Item>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        onClick={() => sendData()} // Trigger the sendData function
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}
export default PriceInput;
