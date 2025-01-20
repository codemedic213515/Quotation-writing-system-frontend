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
import CTable from '../CTable';

export function Unit() {
  const [data, setData] = useState([]);

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
      title: 'No',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center',
    },
    {
      title: '分類名',
      dataIndex: 'Name',
      key: 'Name',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Name}
          onChange={(e) =>
            handleInputChange(record.key, 'Name', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '乗率',
      dataIndex: 'Rate',
      key: 'Rate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Rate}
          onChange={(e) =>
            handleInputChange(record.key, 'Rate', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },

    {
      title: '原価率',
      dataIndex: 'Cost',
      key: 'Cost',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Cost}
          onChange={(e) => handleInputChange(record.key, 'Cost', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '雑素率',
      dataIndex: 'OtherRate',
      key: 'OtherRate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.OtherRate}
          onChange={(e) => handleInputChange(record.key, 'OtherRate', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'AB材',
      dataIndex: 'ABCode',
      key: 'ABCode',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.ABCode}
          onChange={(e) => handleInputChange(record.key, 'ABCode', e)}
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
      <Form>
        <div className="flex flex-row gap-4 mb-5 justify-center">
          <Select showSearch allowClear placeholder="Name" className="w-1/4 " />
          <Select showSearch allowClear placeholder="Group" className="w-1/4" />
          <Select showSearch allowClear placeholder="AB材" className="w-1/4" />
        </div>
        <Form.Item>
          <CTable
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            ps={5}
            className="mb-4 border-collapse"
            rowClassName={(record) =>
              record.key === selectedRowKey ? 'bg-blue-100' : ''
            }
            onRow={(record) => ({
              onClick: () => handleRowSelect(record),
            })}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
export default Unit;
