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

export function Customer() {
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
      title: 'グループ',
      dataIndex: 'Group',
      key: 'Group',
      align: 'center',
    },
    {
      title: '名前',
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
      title: '支社名',
      dataIndex: 'SubName',
      key: 'SubName',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.SubName}
          onChange={(e) =>
            handleInputChange(record.key, 'SubName', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },

    {
      title: '住所',
      dataIndex: 'Address',
      key: 'Address',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Address}
          onChange={(e) => handleInputChange(record.key, 'Address', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '電話番号',
      dataIndex: 'Phone',
      key: 'Phone',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Phone}
          onChange={(e) => handleInputChange(record.key, 'Phone', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '締切日',
      dataIndex: 'CloseingDate',
      key: 'CloseingDate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.CloseingDate}
          onChange={(e) => handleInputChange(record.key, 'CloseingDate', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'ランク',
      dataIndex: 'Rank',
      key: 'Rank',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Rank}
          onChange={(e) => handleInputChange(record.key, 'Rank', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'FAX',
      dataIndex: 'FAX',
      key: 'FAX',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.FAX}
          onChange={(e) => handleInputChange(record.key, 'FAX', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'メール',
      dataIndex: 'Email',
      key: 'Email',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Email}
          onChange={(e) => handleInputChange(record.key, 'Email', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'HP',
      dataIndex: 'HP',
      key: 'HP',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.HP}
          onChange={(e) => handleInputChange(record.key, 'HP', e)}
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '備考',
      dataIndex: 'Description',
      key: 'Description',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Description}
          onChange={(e) => handleInputChange(record.key, 'Description', e)}
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
          <Select showSearch allowClear placeholder="Rank" className="w-1/4" />
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
export default Customer;
