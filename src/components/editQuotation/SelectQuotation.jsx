import {
  Button,
  DatePicker,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Table,
  message,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function SelectQuotation({ setActiveTab, setNumber }) {
  const [quotations, setQuotations] = useState([]);
  const [users, setUsers] = useState([]); // State to store users for filtering
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({
    creater: null,
    code: null,
    createDate: null,
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/quotationmain/users');
      setUsers(response.data); // Set the list of users for the "Creator Name" filter
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to fetch users');
    }
  };

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      // Only pass filters that are not null or empty
      const activeFilters = {};
      if (filters.code) activeFilters.code = filters.code;
      if (filters.creater) activeFilters.creater = filters.creater;
      if (filters.createDate) activeFilters.createDate = filters.createDate;

      const response = await axios.get('/api/quotationmain', {
        params: {
          page,
          pageSize,
          ...activeFilters, // Apply filters dynamically
        },
      });

      setQuotations(response.data.data);
      setTotalRecords(response.data.totalRecords);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      message.error('Failed to fetch quotations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users once on component mount
    fetchQuotations(); // Fetch quotations when the component mounts or when filters/page/size change
  }, [page, pageSize, filters]);

  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value || null, // Ensure empty values are treated as null
    }));
  };

  const handleDelete = (id) => {
    // Show confirmation modal before deletion
    Modal.confirm({
      title: '見積書を本当に削除してもよろしいですか？',
      content: '一度削除すると元に戻すことはできません。',
      okText: 'はい',
      okType: 'danger',
      cancelText: 'いいえ',
      onOk: async () => {
        try {
          await axios.delete(`/api/quotationmain/${id}`);
          message.success('Quotation deleted successfully');
          fetchQuotations(); // Refresh data after deletion
        } catch (error) {
          console.error('Error deleting quotation:', error);
          message.error('Failed to delete quotation');
        }
      },
      onCancel: () => {
        console.log('Deletion canceled');
      },
    });
  };

  const handleEdit = (quotation) => {
    setNumber(quotation.code);
    setActiveTab('basic');

    console.log('Editing quotation:', quotation);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '見積番号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '作成者名',
      dataIndex: 'creater',
      key: 'creater',
    },
    {
      title: '作成日',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button onClick={() => handleEdit(record)} type="link">
            編集
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="link" danger>
            削除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form layout="inline" className="mb-4">
        <Form.Item label="見積番号">
          <Input
            allowClear
            placeholder="見積番号"
            onChange={(e) => handleFilterChange('code', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="作成日">
          <DatePicker
            allowClear
            placeholder="作成日"
            onChange={(value) =>
              handleFilterChange('createDate', value?.format('YYYY-MM-DD'))
            }
          />
        </Form.Item>
        <Form.Item label="作成者名">
          <Select
            showSearch
            allowClear
            placeholder="作成者名"
            options={users.map((user) => ({ label: user, value: user }))}
            onChange={(value) => handleFilterChange('creater', value)}
          />
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={quotations}
        loading={loading}
        rowKey="id"
        pagination={{
          position: ['bottomcenter'],
          pageSize: 5,
        }}
      />

      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default SelectQuotation;
