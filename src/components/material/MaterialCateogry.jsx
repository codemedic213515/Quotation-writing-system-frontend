import { Form, Input, Button, Table, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MaterialCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    Name: '',
    CategoryName: '',
    ABCode: '',
    page: 1,
    pageSize: 5,
  });
  const [total, setTotal] = useState(0);
  const [editingKey, setEditingKey] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    categoryName: '',
    abCode: '',
    rate: '',
    cost: '',
    otherRate: '',
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/abmaterial/masterdata', {
        params: filters,
      });
      setData(response.data.materials);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to fetch data');
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
      await axios.put(`/api/abmaterial/${record.id}`, record);
      message.success('Material updated successfully');
      setEditingKey(null);
      fetchData();
    } catch (error) {
      console.error('Error updating material:', error);
      message.error('Failed to update material');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/abmaterial/${selectedRow.id}`);
      message.success('Material deleted successfully');
      setIsDeleteModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting material:', error);
      message.error('Failed to delete material');
    }
  };

  const handleAddNew = async () => {
    try {
      const response = await axios.post('/api/abmaterial', newMaterial);
      if (response.status === 201) {
        message.success('Material added successfully');
        setIsAddModalVisible(false);
        fetchData();
        setNewMaterial({
          name: '',
          categoryName: '',
          abCode: '',
          rate: '',
          cost: '',
          otherRate: '',
        });
      }
    } catch (error) {
      console.error('Error adding material:', error);
      message.error('Failed to add material');
    }
  };

  const handleInputChange = (e, record, field) => {
    const newData = data.map((item) =>
      item.id === record.id ? { ...item, [field]: e.target.value } : item,
    );
    setData(newData);
  };

  const columns = [
    { title: 'No', dataIndex: 'id', key: 'id', align: 'center' },
    {
      title: '分類名',
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
      title: 'カテゴリ',
      dataIndex: 'categoryName',
      key: 'categoryName',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'categoryName')}
          />
        ) : (
          text
        ),
    },
    {
      title: '乗率',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'rate')}
          />
        ) : (
          text
        ),
    },
    {
      title: '原価率',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'cost')}
          />
        ) : (
          text
        ),
    },
    {
      title: '雑素率',
      dataIndex: 'otherRate',
      key: 'otherRate',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'otherRate')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'AB材',
      dataIndex: 'abCode',
      key: 'abCode',
      align: 'center',
      render: (text, record) =>
        editingKey === record.id ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e, record, 'abCode')}
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
          <Button onClick={() => handleSave(record)}>Save</Button>
        ) : (
          <>
            <Button type="link" onClick={() => handleEdit(record.id)}>
            編集
            </Button>
            <Button
              type="link"
              danger
              onClick={() => {
                setSelectedRow(record);
                setIsDeleteModalVisible(true);
              }}
            >
              削除
            </Button>
          </>
        ),
    },
  ];
  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <div className="mb-4">
        <Form layout="inline">
          <Form.Item>
            <Input
              placeholder="分類名"
              onChange={(e) => handleFilterChange('Name', e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="カテゴリ"
              onChange={(e) =>
                handleFilterChange('CategoryName', e.target.value)
              }
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="AB材"
              onChange={(e) => handleFilterChange('ABCode', e.target.value)}
              allowClear
            />
          </Form.Item>
        </Form>
      </div>

      <Button
        type="primary"
        onClick={() => setIsAddModalVisible(true)}
        className="mb-4"
      >
        Add Material
      </Button>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          position:["bottomCenter"],
          current: filters.page,
          pageSize: filters.pageSize,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
      <Modal
        title="Add New Material"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={handleAddNew}
      >
        <Form layout="vertical">
          {Object.keys(newMaterial).map((key) => (
            <Form.Item key={key} label={key}>
              <Input
                value={newMaterial[key]}
                onChange={(e) =>
                  setNewMaterial({ ...newMaterial, [key]: e.target.value })
                }
              />
            </Form.Item>
          ))}
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this material?</p>
      </Modal>
    </div>
  );
}

export default MaterialCategory;
