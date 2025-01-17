import React, { useState } from 'react';
import { Table, Input, Button, Select, Space } from 'antd';

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
          onChange={(e) =>
            handleInputChange(record.key, 'laborRateA', e.target.value)
          }
          type="number"
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
          onChange={(e) =>
            handleInputChange(record.key, 'laborRateB', e.target.value)
          }
          type="number"
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
        <Input
          value={record.fieldRate}
          addonAfter={'%'}
          onChange={(e) =>
            handleInputChange(record.key, 'fieldRate', e.target.value)
          }
          type="number"
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
        <Input
          addonAfter={'%'}
          value={record.miscRate}
          onChange={(e) =>
            handleInputChange(record.key, 'miscRate', e.target.value)
          }
          type="number"
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
    <div className="p-5 font-sans">
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

      <Button
        onClick={handleUpdate}
        type="primary"
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        更新内容を更新する (Update)
      </Button>
    </div>
  );
}
export default RankInput;
