import React, { useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Button,
  Select,
  FloatButton,
  Radio,
  Form,
} from 'antd';

const { Option } = Select;
export function RankInput() {
  const [data, setData] = useState([
    {
      key: '1',
      rank: 'A',
      laborRateA: 12000,
      laborRateB: 7000,
      fieldRate: 3,
      miscRate: 10,
    },
    {
      key: '2',
      rank: 'B',
      laborRateA: 12000,
      laborRateB: 10000,
      fieldRate: 3,
      miscRate: 10,
    },
    {
      key: '3',
      rank: 'C',
      laborRateA: 9000,
      laborRateB: 7000,
      fieldRate: 2,
      miscRate: 10,
    },
    {
      key: '4',
      rank: 'D',
      laborRateA: 16000,
      laborRateB: 12000,
      fieldRate: 2,
      miscRate: 8,
    },
    {
      key: '5',
      rank: 'E',
      laborRateA: 18000,
      laborRateB: 14000,
      fieldRate: 3,
      miscRate: 10,
    },
  ]);

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
  };

  const columns = [
    {
      title: 'ランク',
      dataIndex: 'rank',
      key: 'rank',
      align: 'center',
    },
    {
      title: '労務単価A',
      dataIndex: 'laborRateA',
      key: 'laborRateA',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.laborRateA}
          addonAfter={'円'}
          min={0}
          onChange={(e) =>
            handleInputChange(record.key, 'laborRateA', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '労務単価B',
      dataIndex: 'laborRateB',
      key: 'laborRateB',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.laborRateB}
          addonAfter={'円'}
          min={0}
          onChange={(e) =>
            handleInputChange(record.key, 'laborRateB', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '現場雑率',
      dataIndex: 'fieldRate',
      key: 'fieldRate',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.fieldRate}
          addonAfter="%"
          min={0}
          max={100}
          onChange={(e) => handleInputChange(record.key, 'fieldRate', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '諸経率',
      dataIndex: 'miscRate',
      key: 'miscRate',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          addonAfter="%"
          min={0}
          max={100}
          value={record.miscRate}
          onChange={(e) => handleInputChange(record.key, 'miscRate', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
  ];

  const handleUpdate = () => {
    if (selectedRowKey) {
      const updatedRow = data.find((item) => item.key === selectedRowKey);
      console.log('Updated row:', updatedRow);
    } else {
      console.log('No row selected for update.');
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <p>
        下記の一覧からランクを設定するか、下記のテキストボックスにて直接入力することができます。
      </p>
      <p>※後から自由に変更が可能です。</p>
      <Form>
        <Form.Item>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="mb-4 border-collapse"
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
            <Radio.Group defaultValue={false}>
              <Radio value={false}>切り捨てる。</Radio>
              <Radio value={true}>雑材消耗に加算する。</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}
export default RankInput;
