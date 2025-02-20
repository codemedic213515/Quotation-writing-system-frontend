import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form } from 'antd';
import axios from 'axios';

export function Customer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [filters, setFilters] = useState({
    Name: '',
    Group: '',
    Rank: '',
    page: 1,
    pageSize: 5,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/customer/masterdata', {
        params: filters,
      });
      setData(response.data.customers);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({ ...prev, page: pagination.current }));
  };

  const handleEdit = (key) => {
    setEditingKey(key);
  };

  const handleSave = async (record) => {
    try {
      await axios.put(`/api/customer/${record.id}`, record);
      setEditingKey(null);
      fetchData();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleInputChange = (e, record, field) => {
    const newData = data.map((item) =>
      item.id === record.id ? { ...item, [field]: e.target.value } : item,
    );
    setData(newData);
  };

  const columns = [
    {
      title: 'グループ',
      dataIndex: 'group',
      key: 'group',
      align: 'center',
    },
    {
      title: '名前',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'name')}
          />
        ) : (
          text
        ),
    },
    {
      title: '支社名',
      dataIndex: 'subName',
      key: 'subName',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'subName')}
          />
        ) : (
          text
        ),
    },
    {
      title: '住所',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'address')}
          />
        ) : (
          text
        ),
    },
    {
      title: '電話番号',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'phone')}
          />
        ) : (
          text
        ),
    },
    {
      title: '締切日',
      dataIndex: 'closeingDat',
      key: 'closeingDat',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'closeingDat')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'ランク',
      dataIndex: 'rank',
      key: 'rank',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'rank')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'FAX',
      dataIndex: 'fax',
      key: 'fax',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'fax')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'メール',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'email')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'HP',
      dataIndex: 'hp',
      key: 'hp',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'hp')}
          />
        ) : (
          text
        ),
    },
    {
      title: '備考',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'description')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'アクション',
      key: 'actions',
      align: 'center',
      render: (_, record) =>
        editingKey === record.id ? (
          <Button onClick={() => handleSave(record)}>保存</Button>
        ) : (
          <Button onClick={() => handleEdit(record.id)}>編集</Button>
        ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Form layout="inline" className="mb-5 justify-center">
        <Form.Item>
          <Input
            placeholder="名前"
            onChange={(e) => handleFilterChange('Name', e.target.value)}
            className="w-32"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="グループ"
            onChange={(e) => handleFilterChange('Group', e.target.value)}
            className="w-32"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="ランク"
            onChange={(e) => handleFilterChange('Rank', e.target.value)}
            className="w-32"
            allowClear
          />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          position: ['bottomcenter'],
          current: filters.page,
          pageSize: filters.pageSize,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Customer;
