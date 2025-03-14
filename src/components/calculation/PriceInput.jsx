import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Form, Radio, FloatButton, Button } from 'antd';
import axios from 'axios';

export function PriceInput({ setActiveTab, number }) {
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [data, setData] = useState([]);

  // Fetch material data
  const fetchABmaterial = async () => {
    try {
      const response = await axios.get('/api/abmaterial');
      const a = response.data.filter((item) => item.abCode === '1');
      const updatedDataA = a.map((item, index) => ({
        ...item,
        key: index + 1,
        isUpdated: false, // Initially, no row is updated
      }));
      setDataA(updatedDataA);
      setData(updatedDataA);
      const b = response.data.filter((item) => item.abCode === '2');
      const updatedDataB = b.map((item, index) => ({
        ...item,
        key: index + 1,
        isUpdated: false, // Initially, no row is updated
      }));
      setDataB(updatedDataB);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchABmaterial();
  }, []);

  // Switch between categories A and B
  const handleCategoryChange = (e) => {
    if (e.target.value === 'A') {
      setData(dataA);
    } else if (e.target.value === 'B') {
      setData(dataB);
    }
  };

  // Handle row-specific input changes
  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value, isUpdated: true }; // Mark this row as updated
      }
      return item;
    });
    setData(newData);
  };

  // Send updated data to the backend
  const sendData = async () => {
    try {
      // Filter out only the rows that have been updated
      const updatedRows = data.filter((item) => item.isUpdated);

      if (updatedRows.length > 0) {
        // Send only the updated rows
        await Promise.all(
          updatedRows.map(async (item) => {
            await axios.put(`/api/abmaterial/${item.id}`, {
              ...item,
              rate: item.rate,
              cost: item.cost,
            });
          }),
        );
      } else {
        console.log('No rows have been updated.');
      }
      setActiveTab('material');
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
        <InputNumber
          value={record.rate}
          max={1}
          min={0.0}
          step={0.01}
          onChange={(value) => {
            handleInputChange(record.key, 'rate', value);
          }}
          className="w-24"
        />
      ),
    },
    {
      title: '修正',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.cost}
          max={1}
          min={0.0}
          step={0.01}
          onChange={(value) => {
            handleInputChange(record.key, 'cost', value);
          }}
          className="w-24"
        />
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
              onChange={handleCategoryChange}
            >
              <Radio value="A">A 材</Radio>
              <Radio value="B">B 材</Radio>
            </Radio.Group>
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
            rowClassName="editable-row"
            className="border border-gray-300"
          />
        </Form.Item>
      </Form>

      <FloatButton
        shape="square"
        type="primary"
        onClick={sendData} // Trigger the sendData function
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default PriceInput;
