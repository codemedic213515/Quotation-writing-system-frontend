import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Form, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

export function PostCode() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [filters, setFilters] = useState({
    ZipCode: '',
    Prefecture: '',
    City: '',
    page: 1,
    pageSize: 5,
  });
  const [total, setTotal] = useState(0);
  const [prefectures, setPrefectures] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
    fetchPrefectures();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/address/masterdata', {
        params: filters,
      });
      setData(response.data.addresses);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchPrefectures = async () => {
    try {
      const response = await axios.get('/api/prefecture');
      setPrefectures(response.data);
    } catch (error) {
      console.error('Error fetching prefectures:', error);
    }
  };

  const fetchCities = async (prefecture) => {
    try {
      const response = await axios.get('/api/address', {
        params: { city: prefecture },
      });
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value, page: 1 }));
    if (field === 'Prefecture') {
      fetchCities(value);
    }
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({ ...prev, page: pagination.current }));
  };

  const handleEdit = (key) => {
    setEditingKey(key);
  };

  const handleSave = async (record) => {
    try {
      await axios.put(`/api/address/${record.id}`, record);
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
      title: '郵便番号',
      dataIndex: 'zipCode',
      key: 'zipCode',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'zipCode')}
          />
        ) : (
          text
        ),
    },
    {
      title: '県',
      dataIndex: 'prefecture',
      key: 'prefecture',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'prefecture')}
          />
        ) : (
          text
        ),
    },
    {
      title: '市',
      dataIndex: 'city',
      key: 'city',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'city')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'ストリート',
      dataIndex: 'street',
      key: 'street',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'street')}
          />
        ) : (
          text
        ),
    },
    {
      title: '操作',
      key: 'actions',
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
            placeholder="郵便番号"
            onChange={(e) => handleFilterChange('ZipCode', e.target.value)}
            className="w-auto"
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Select
            showSearch
            allowClear
            popupMatchSelectWidth={false}
            placeholder="県"
            className="w-auto"
            onChange={(value) => handleFilterChange('Prefecture', value)}
          >
            {prefectures.map((pref) => (
              <Option key={pref.id} value={pref.name}>
                {pref.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            showSearch
            allowClear
            placeholder="市"
            popupMatchSelectWidth={false}
            className="w-auto"
            onChange={(value) => handleFilterChange('City', value)}
          >
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
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

export default PostCode;
