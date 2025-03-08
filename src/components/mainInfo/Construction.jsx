import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Form, Modal } from 'antd';
import axios from 'axios';

export function Construction() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 5,
  });
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConstruction, setNewConstruction] = useState({
    name: '',
    siteMiscell: 0,
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/construction/masterdata', {
        params: filters,
      });
      setData(response.data.constructions);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({ ...prev, page: pagination.current }));
  };

  const handleEdit = (key) => {
    setEditingKey(key);
  };

  const handleSave = async (record) => {
    try {
      await axios.put(`/api/construction/${record.id}`, record);
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

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      await axios.post('/api/construction', newConstruction);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleNewInputChange = (e, field) => {
    setNewConstruction((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '工種',
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
      title: '雑素率',
      dataIndex: 'siteMiscell',
      key: 'siteMiscell',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'siteMiscell')}
          />
        ) : (
          text
        ),
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (_, record) =>
        editingKey === record.id ? (
          <Button onClick={() => handleSave(record)}>削除</Button>
        ) : (
          <Button onClick={() => handleEdit(record.id)}>編集</Button>
        ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Button
        type="primary"
        onClick={handleAddNew}
        className="mb-4 bg-blue-400 float-right"
      >
        追加
      </Button>
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
      <Modal
        title="Add New Construction"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Construction Name">
            <Input
              value={newConstruction.name}
              onChange={(e) => handleNewInputChange(e, 'name')}
            />
          </Form.Item>
          <Form.Item label="Site Miscellaneous Rate">
            <Input
              value={newConstruction.siteMiscell}
              onChange={(e) => handleNewInputChange(e, 'siteMiscell')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Construction;
