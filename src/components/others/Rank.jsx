import { Form, Input, Button, Table, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Rank() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ page: 1, pageSize: 5 });

  useEffect(() => {
    fetchRankMasters();
  }, [filters]);

  const fetchRankMasters = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/rank/rankdata', { params: filters });
      setData(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      message.error('Failed to load rank master data');
    }
    setLoading(false);
  };

  const handleInputChange = (key, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === key ? { ...item, [field]: value } : item
      )
    );
  };
  const saveChanges = async (record) => {
    try {
      await axios.put(`/api/rank/${record.Id}`, record);
      message.success('Updated successfully');
      setEditingKey(null);
      fetchRankMasters();
    } catch (error) {
      message.error('Update failed');
    }
  };

  const handleTableChange = (pagination) => {
    setFilters((prev) => ({ ...prev, page: pagination.current }));
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'ランク',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.name}
          onChange={(e) => handleInputChange(record.Id, 'name', e.target.value)}
          disabled={editingKey !== record.Id}
        />
      ),
    },
    {
      title: '労務単価A',
      dataIndex: 'laborCostA',
      key: 'laborCostA',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.laborCostA}
          onChange={(e) => handleInputChange(record.Id, 'laborCostA', e.target.value)}
          disabled={editingKey !== record.Id}
        />
      ),
    },
    {
      title: '労務単価B',
      dataIndex: 'laborCostB',
      key: 'laborCostB',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.laborCostB}
          onChange={(e) => handleInputChange(record.Id, 'laborCostB', e.target.value)}
          disabled={editingKey !== record.Id}
        />
      ),
    },
    {
      title: '現場雑率',
      dataIndex: 'siteMiscell',
      key: 'siteMiscell',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.siteMiscell}
          onChange={(e) => handleInputChange(record.Id, 'siteMiscell', e.target.value)}
          disabled={editingKey !== record.Id}
        />
      ),
    },
    {
      title: '諸経率',
      dataIndex: 'otherExpens',
      key: 'otherExpens',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.otherExpens}
          onChange={(e) => handleInputChange(record.Id, 'otherExpens', e.target.value)}
          disabled={editingKey !== record.Id}
        />
      ),
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        editingKey === record.Id ? (
          <Button type="primary" onClick={() => saveChanges(record)}>
            保存
          </Button>
        ) : (
          <Button onClick={() => setEditingKey(record.Id)}>編集</Button>
        )
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          position: ['bottomCenter'],
          current: filters.page,
          pageSize: filters.pageSize,
          total: total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        bordered
      />
    </div>
  );
}
export default Rank;
