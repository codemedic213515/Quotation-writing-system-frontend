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
      title: 'No',
      dataIndex: 'Id',
      key: 'Id',
      align: 'center',
    },
    {
      title: '工種',
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
      title: '雑素率',
      dataIndex: 'SiteMiscellRate',
      key: 'SiteMiscellRate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.SiteMiscellRate}
          onChange={(e) =>
            handleInputChange(
              record.key,
              'SiteMiscellRate',
              e.target.SiteMiscellRate,
            )
          }
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
        <Select showSearch allowClear className="w-1/4 mb-5" />
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
