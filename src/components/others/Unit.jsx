import { Form, Input, Button, Table, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function UnitData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ page: 1, pageSize: 5 });
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newUnit, setNewUnit] = useState({ Name: '' });

  useEffect(() => {
    fetchUnitData();
  }, [filters]);

  const fetchUnitData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/unit/unitdata', { params: filters });
      setData(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      message.error('ユニットマスターデータの読み込みに失敗しました');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/unit/${selectedRow.id}`);
      message.success('ユニットが正常に削除されました');
      setIsDeleteModalVisible(false);
      fetchUnitData();
    } catch (error) {
      message.error('ユニットの削除に失敗しました');
    }
  };

  const handleAddNew = async () => {
    try {
      const response = await axios.post('/api/unit', newUnit);
      if (response.status === 201) {
        message.success('ユニットの追加が成功しました');
        setIsAddModalVisible(false);
        fetchUnitData();
        setNewUnit({ Name: '' });
      }
    } catch (error) {
      message.error('ユニットの追加に失敗しました');
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
      title: '単位',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <>
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
      <div className="mb-4 flex justify-between">
        <Button onClick={() => setIsAddModalVisible(true)} className="mb-4 bg-blue">
        追加
        </Button>
      </div>
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
        bordered
        onChange={handleTableChange}
      />
      <Modal
        title="単位を追加"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={handleAddNew}
      >
        <Form layout="vertical">
          <Form.Item label="単位名">
            <Input
              value={newUnit.Name}
              onChange={(e) => setNewUnit({ ...newUnit, Name: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="削除"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>この単位を削除してもよろしいですか?</p>
      </Modal>
    </div>
  );
}
export default UnitData;