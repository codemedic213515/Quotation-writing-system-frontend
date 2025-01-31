import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Button,
  FloatButton,
  Radio,
  Form,
} from 'antd';
import axios from 'axios';
export function RankInput({ setActiveTab, number }) {
  const [data, setData] = useState([]);
  const [minority, setMinority] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const fetchRankMaster = async () => {
    try {
      const response = await axios.get('/api/rank');
      const updatedData = response.data.map((item) => {
        const { id, ...rest } = item; // Destructure to remove `id`
        return { key: id, ...rest }; // Add `key` and rest of the properties
      });

      setData(updatedData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRankMaster();
  }, []);
  if (number == '') {
    setActiveTab('select');
  }
  const sendData = () => {
    setActiveTab('price');
  };

  const [selectedRowKey, setSelectedRowKey] = useState(null);

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const handleRowSelect = (record) => {
    setSelectedRowKey(record.key);
    setSelectedRow(record);
  };
  console.log(selectedRow);

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
          onChange={(e) => handleInputChange(record.key, 'laborCostA', e)}
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
          onChange={(e) => handleInputChange(record.key, 'laborCostB', e)}
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
          onChange={(e) => handleInputChange(record.key, 'siteMiscell', e)}
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
          onChange={(e) => handleInputChange(record.key, 'otherExpens', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
  ];
  const updateRankPost = async (updatedRow) => {
    try {
      const response = await axios.put(
        `/api/rank/${updatedRow.id}`,
        updatedRow,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = () => {
    if (selectedRowKey) {
      const updatedRow = data.find((item) => item.id === selectedRowKey);

      setSelectedRow(updatedRow);
      updateRankPost(updatedData);
      console.log('Updated row:', updatedRow);
    } else {
      console.log('No row selected for update.');
    }
  };

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
              record.name === selectedRowKey ? 'bg-blue-100' : ''
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
