// import React, { useEffect, useState } from 'react';
// import {
//   Form,
//   Input,
//   Radio,
//   Select,
//   message,
//   Button,
//   Spin,
//   Typography,
// } from 'antd';
// import axios from 'axios';

// const { TextArea } = Input;

// const Customer = () => {
//   const [loading, setLoading] = useState(false);
//   const [prefectures, setPrefectures] = useState([]);
//   const [cities, setCities] = useState([]);

//   // Customer Data
//   const [customerName, setCustomerName] = useState('');
//   const [branchName, setBranchName] = useState('');
//   const [customerAddressValue, setCustomerAddressValue] = useState('0');
//   const [customerPrefecture, setCustomerPrefecture] = useState('');
//   const [customerCity, setCustomerCity] = useState('');
//   const [customerOtherAddress, setCustomerOtherAddress] = useState('');
//   const [customerAddressLocation, setCustomerAddressLocation] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [customerFax, setCustomerFax] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerWebsite, setCustomerWebsite] = useState('');
//   const [customerNotes, setCustomerNotes] = useState('');
//   const [customerRank, setCustomerRank] = useState('');
//   const [customerClosingDate, setCustomerClosingDate] = useState('');
//   const [customerGroup, setCustomerGroup] = useState('');
//   const [customerOption, setCustomerOption] = useState(null); // Postal code search result

//   useEffect(() => {
//     fetchPrefectures();
//   }, []);

//   // Fetch Prefectures
//   const fetchPrefectures = async () => {
//     try {
//       const response = await axios.get('/api/prefecture');
//       const filteredPrefectures = response.data
//         .filter((item) => !item.delete)
//         .map((item) => ({ value: item.name, label: item.name }));
//       setPrefectures(filteredPrefectures);
//     } catch (error) {
//       console.error('Error fetching prefectures:', error);
//       message.error('Failed to fetch prefectures');
//     }
//   };

//   // Fetch Cities Based on Prefecture
//   const handleCustomerPrefectureChange = async (prefecture) => {
//     setCustomerPrefecture(prefecture);
//     try {
//       const response = await axios.get(`/api/address?city=${prefecture}`);
//       const filteredCities = response.data.map((item) => ({
//         value: item,
//         label: item,
//       }));
//       setCities(filteredCities);
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//       message.error('Failed to fetch cities');
//     }
//   };

//   // Fetch Address from Postal Code
//   const handleCustomerPostalSearch = async (postalCode) => {
//     if (!postalCode) {
//       setCustomerOption(null);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/customer/postalcode', {
//         params: { code: postalCode },
//       });
//       setCustomerOption({
//         value: response.data[0].value,
//         label: response.data[0].label,
//       });
//     } catch (error) {
//       console.error('Error fetching postal code:', error);
//       setCustomerOption(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create Customer API Call
//   const createCustomer = async () => {
//     try {
//       const customerData = {
//         Name: customerName,
//         SubName: branchName,
//         Address:
//           customerAddressValue === '1'
//             ? `${customerPrefecture} ${customerCity} ${customerOtherAddress}`
//             : customerAddressValue === '2'
//             ? customerAddressLocation
//             : customerOption?.label || '',
//         Phone: customerPhone,
//         Fax: customerFax,
//         Email: customerEmail,
//         Hp: customerWebsite,
//         Description: customerNotes,
//         Rank: customerRank,
//         CloseingDat: customerClosingDate,
//         Group: customerGroup,
//       };

//       const response = await axios.post('/api/customer', customerData);
//       if (response.status === 200) {
//         message.success('Customer created successfully');
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Error creating customer:', error);
//       message.error('Failed to create customer');
//     }
//   };

//   // Reset Form After Submission
//   const resetForm = () => {
//     setCustomerName('');
//     setBranchName('');
//     setCustomerAddressValue('0');
//     setCustomerPrefecture('');
//     setCustomerCity('');
//     setCustomerOtherAddress('');
//     setCustomerAddressLocation('');
//     setCustomerPhone('');
//     setCustomerFax('');
//     setCustomerEmail('');
//     setCustomerWebsite('');
//     setCustomerNotes('');
//     setCustomerRank('');
//     setCustomerClosingDate('');
//     setCustomerGroup('');
//   };

//   return (
//     <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto">
//       <Typography.Title level={4}>Create Customer</Typography.Title>
//       <Form layout="vertical">
//         <Form.Item label="Customer Name" required>
//           <Input
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             allowClear
//           />
//         </Form.Item>
//         <Form.Item label="Branch Name">
//           <Input
//             value={branchName}
//             onChange={(e) => setBranchName(e.target.value)}
//             allowClear
//           />
//         </Form.Item>

//         {/* Address Section */}
//         <Form.Item label="Address" required>
//           <Radio.Group
//             onChange={(e) => setCustomerAddressValue(e.target.value)}
//             value={customerAddressValue}
//           >
//             <Radio value="1">Prefecture & City</Radio>
//             <Radio value="2">Manual Input</Radio>
//             <Radio value="3">Postal Code Search</Radio>
//           </Radio.Group>
//         </Form.Item>
//         {customerAddressValue === '1' && (
//           <>
//             <Select
//               placeholder="Prefecture"
//               value={customerPrefecture}
//popupMatchSelectWidth={false}
//               onChange={handleCustomerPrefectureChange}
//               options={prefectures}
//             />
//             <Select
//               placeholder="City"
//               value={customerCity}
//popupMatchSelectWidth={false}
//               onChange={setCustomerCity}
//               options={cities}
//             />
//             <Input
//               placeholder="Other Address"
//               value={customerOtherAddress}
//               onChange={(e) => setCustomerOtherAddress(e.target.value)}
//             />
//           </>
//         )}
//         {customerAddressValue === '2' && (
//           <Input
//             placeholder="Full Address"
//             value={customerAddressLocation}
//             onChange={(e) => setCustomerAddressLocation(e.target.value)}
//           />
//         )}
//         {customerAddressValue === '3' && (
//           <Select
//             showSearch
//             value={customerOption?.label}
//             onInputKeyDown={(e) => {
//               if (e.key === 'Enter') handleCustomerPostalSearch(e.target.value);
//             }}
//popupMatchSelectWidth={false}
//             options={customerOption ? [customerOption] : []}
//             notFoundContent={loading ? <Spin size="small" /> : 'No data found'}
//           />
//         )}

//         {/* Contact Information */}
//         <Form.Item label="Phone">
//           <Input
//             value={customerPhone}
//             onChange={(e) => setCustomerPhone(e.target.value)}
//           />
//         </Form.Item>
//         <Form.Item label="Fax">
//           <Input
//             value={customerFax}
//             onChange={(e) => setCustomerFax(e.target.value)}
//           />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input
//             value={customerEmail}
//             onChange={(e) => setCustomerEmail(e.target.value)}
//           />
//         </Form.Item>
//         <Form.Item label="Website">
//           <Input
//             value={customerWebsite}
//             onChange={(e) => setCustomerWebsite(e.target.value)}
//           />
//         </Form.Item>
//         <Form.Item label="Notes">
//           <TextArea
//             value={customerNotes}
//             onChange={(e) => setCustomerNotes(e.target.value)}
//           />
//         </Form.Item>

//         {/* Rank & Group */}
//         <Form.Item label="Rank">
//           <Select
//             value={customerRank}
//             onChange={setCustomerRank}
//popupMatchSelectWidth={false}
//             options={[
//               { value: 'A', label: 'A' },
//               { value: 'B', label: 'B' },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item label="Group">
//           <Select
//             value={customerGroup}
//             onChange={setCustomerGroup}
//popupMatchSelectWidth={false}
//             options={[
//               { value: '1', label: 'Group 1' },
//               { value: '2', label: 'Group 2' },
//             ]}
//           />
//         </Form.Item>

//         {/* Submit Button */}
//         <Button type="primary" onClick={createCustomer}>
//           Create Customer
//         </Button>
//       </Form>
//     </div>
//   );
// };

// export default Customer;

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
