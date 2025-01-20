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

export function PostCode() {
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
      title: 'PostCode',
      dataIndex: 'ZipCode',
      key: 'Zipcode',
      align: 'center',
    },
    {
      title: '県',
      dataIndex: 'Prefecture',
      key: 'Prefecture',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Prefecture}
          onChange={(e) =>
            handleInputChange(record.key, 'Prefecture', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '市',
      dataIndex: 'City',
      key: 'City',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.City}
          onChange={(e) =>
            handleInputChange(record.key, 'City', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'ストリート',
      dataIndex: 'Street',
      key: 'Street',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Street}
          onChange={(e) => handleInputChange(record.key, 'Street', e)}
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
          <Select showSearch allowClear placeholder="Code" className="w-1/4 " />
          <Select
            showSearch
            allowClear
            placeholder="Prefecture"
            className="w-1/4"
          />
          <Select showSearch allowClear placeholder="City" className="w-1/4" />
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
export default PostCode;
