import React, { useState, useEffect } from 'react';
import { Table, InputNumber, Button, FloatButton, Radio, Form } from 'antd';
import axios from 'axios';

export function RankInput({ setActiveTab, number }) {
  const [data, setData] = useState([]);
  const [minority, setMinority] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  // Fetch Rank Data from Backend
  const fetchRankMaster = async () => {
    try {
      const response = await axios.get('/api/rank');
      const updatedData = response.data.map((item) => {
        const { id, ...rest } = item; // Destructure to remove `id`
        return { key: id, ...rest }; // Add `key` and rest of the properties
      });
      setData(updatedData);
    } catch (error) {
      console.error('Error fetching rank data:', error);
    }
  };

  useEffect(() => {
    fetchRankMaster();
  }, []);

  // Check for empty number and set active tab
  if (number === '') {
    setActiveTab('select');
  }

  // Send Data for Next Tab (Quotation Calculation)
  const sendData = async () => {
    try {
      const selected = data.find((item) => item.key === selectedRowKey);
      const { key, name, siteMiscell, otherExpens, ...rest } = selected;
      const convertedData = {
        number: number,
        rank: name,
        siteMiscellRate: siteMiscell,
        miscellRate: otherExpens,
        ...rest,
      };
      const response = await axios.post('/api/quotationcalc', convertedData);
      setActiveTab('price');
    } catch (error) {
      console.error('Error sending data for quotation calculation:', error);
    }
  };

  // Handle input changes in the table
  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  // Handle Row Selection
  const handleRowSelect = (record) => {
    setSelectedRowKey(record.key);
  };

  // Update Rank Master Data in Backend
  const updateRankPost = async (data) => {
    const { key, ...rest } = data;
    const aa = { id: key, ...rest };

    try {
      const response = await axios.put(`/api/rank/${aa.id}`, aa);
      console.log('Updated Row Response:', response);
    } catch (error) {
      console.error('Error updating rank data:', error);
    }
  };

  // Handle update button click
  const handleUpdate = () => {
    if (selectedRowKey) {
      const updatedRow = data.find((item) => item.key === selectedRowKey);
      updateRankPost(updatedRow); // Update rank master datas
    } else {
      console.log('No row selected for update.');
    }
  };

  const columns = [
    {
      title: 'ランク',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '労務単価A',
      dataIndex: 'laborCostA',
      key: 'laborCostA',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.laborCostA}
          addonAfter={'円'}
          min={0}
          onChange={(value) =>
            handleInputChange(record.key, 'laborCostA', value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '労務単価B',
      dataIndex: 'laborCostB',
      key: 'laborCostB',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.laborCostB}
          addonAfter={'円'}
          min={0}
          onChange={(value) =>
            handleInputChange(record.key, 'laborCostB', value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '現場雑率',
      dataIndex: 'siteMiscell',
      key: 'siteMiscell',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.siteMiscell}
          addonAfter="%"
          min={0}
          max={100}
          onChange={(value) =>
            handleInputChange(record.key, 'siteMiscell', value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '諸経率',
      dataIndex: 'otherExpens',
      key: 'otherExpens',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          addonAfter="%"
          min={0}
          max={100}
          value={record.otherExpens}
          onChange={(value) =>
            handleInputChange(record.key, 'otherExpens', value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
  ];

  return (
    <div className="p-2 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <p>
        下記の一覧からランクを設定するか、下記のテキストボックスにて直接入力することができます。
      </p>
      <p>※後から自由に変更が可能です。</p>
      <Form>
        <Form.Item>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ['bottomcenter'],
              pageSize: 5,
            }}
            bordered
            className="mb-0 border-collapse"
            rowClassName={(record) =>
              record.key === selectedRowKey ? 'bg-blue-100' : ''
            }
            onRow={(record) => ({
              onClick: () => handleRowSelect(record),
            })}
          />
        </Form.Item>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Form.Item>
            <Button
              onClick={handleUpdate}
              type="primary"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              更新内容を更新する (Update)
            </Button>
          </Form.Item>
          <Form.Item label="労務費の端数を">
            <Radio.Group
              value={minority}
              onChange={(e) => setMinority(e.target.value)}
            >
              <Radio value={false}>切り捨てる。</Radio>
              <Radio value={true}>雑材消耗に加算する。</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        onClick={() => sendData()}
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default RankInput;
