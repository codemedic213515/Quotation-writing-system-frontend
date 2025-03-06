import { Form, Input, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MaterialMaster() {
  const [data, setData] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState(null);
  const [selectedCategory2, setSelectedCategory2] = useState(null);
  const [selectedCategory3, setSelectedCategory3] = useState(null);
  const [selectedABCode, setSelectedABCode] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0,  });

  const fetchMaterialMasterData = async (params = {}) => {
    try {
      const response = await axios.get('/api/material', {
        params: {
          category1: selectedCategory1 || undefined,
          category2: selectedCategory2 || undefined,
          category3: selectedCategory3 || undefined,
          abCode: selectedABCode || undefined,
          page: params.page || pagination.current,
          pageSize: params.pageSize || pagination.pageSize,
        },
      });
      setData(response.data.items);
      setPagination({ ...pagination, total: response.data.total });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory1Data = async () => {
    try {
      const response = await axios.get('/api/category1');
      setCategory1(response.data.map(item => ({ value: item.id, label: item.name })));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory2Data = async (value) => {
    setSelectedCategory1(value);
    setCategory2([]);
    setCategory3([]);
    setSelectedCategory2(null);
    setSelectedCategory3(null);
    fetchMaterialMasterData();
    try {
      const response = await axios.get(`/api/category2?category1=${value}`);
      setCategory2(response.data.map(item => ({ value: item.id, label: item.name })));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory3Data = async (value) => {
    setSelectedCategory2(value);
    setCategory3([]);
    setSelectedCategory3(null);
    fetchMaterialMasterData();
    try {
      const response = await axios.get(`/api/category3?category1=${selectedCategory1}&category2=${value}`);
      setCategory3(response.data.map(item => ({ value: item.id, label: item.name })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMaterialMasterData();
    fetchCategory1Data();
  }, []);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    fetchMaterialMasterData({ page: pagination.current, pageSize: pagination.pageSize });
  };

  const columns = [
    { title: 'カテゴリー', dataIndex: 'categoryNam', key: 'categoryNam', align: 'center' },
    { title: '名称・規格', dataIndex: 'specification', key: 'specification', align: 'center' },
    { title: '標準単価', dataIndex: 'standardPrice', key: 'standardPrice', align: 'center' },
    { title: '提出単価', dataIndex: 'submissionPrice', key: 'submissionPrice', align: 'center' },
    { title: '社内単価', dataIndex: 'internalPrice', key: 'internalPrice', align: 'center' },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Form>
        <div className="flex flex-row gap-4 mb-5 justify-center">
          <Select showSearch allowClear popupMatchSelectWidth={false} placeholder="Category1" className="w-1/4" options={category1} onChange={fetchCategory2Data} />
          <Select showSearch allowClear popupMatchSelectWidth={false} placeholder="Category2" className="w-1/4" options={category2} onChange={fetchCategory3Data} disabled={!selectedCategory1} />
          <Select showSearch allowClear  popupMatchSelectWidth={false}placeholder="Category3" className="w-1/4" options={category3} onChange={(value) => { setSelectedCategory3(value); fetchMaterialMasterData(); }} disabled={!selectedCategory2} />
          <Select showSearch allowClear popupMatchSelectWidth={false} placeholder="Rank" className="w-1/4" options={[{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }]} onChange={(value) => { setSelectedABCode(value); fetchMaterialMasterData(); }} />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          onChange={handleTableChange}
          bordered
          className="mb-4 border-collapse"
        />
      </Form>
    </div>
  );
}
export default MaterialMaster;


// import { Form, Input, Select, Table } from 'antd';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export function MaterialMaster() {
//   const [data, setData] = useState([]);
//   const [selectedRowKey, setSelectedRowKey] = useState(null);
//   const [category1, setCategory1] = useState([]);
//   const [category2, setCategory2] = useState([]);
//   const [category3, setCategory3] = useState([]);
//   const [selectedCategory1, setSelectedCategory1] = useState(0);
//   const [selectedCategory2, setSelectedCategory2] = useState(0);
//   const [selectedCategory3, setSelectedCategory3] = useState(0);
//   const [selectedABCode, setSelectedABCode] = useState(0);

//   const handleInputChange = (key, field, value) => {
//     const newData = data.map((item) => {
//       if (item.key === key) {
//         return { ...item, [field]: value };
//       }
//       return item;
//     });
//     setData(newData);
//   };

//   const handleRowSelect = (record) => {
//     setSelectedRowKey(record.key);
//   };

//   const fetchCategory1Data = async () => {
//     try {
//       const response = await axios.get('/api/category1');
//       let a = response.data.map((item) => ({
//         value: item.id,
//         label: item.name,
//         id: item.id,
//       }));
//       setCategory1(a);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCategory2Data = async (e) => {
//     setSelectedCategory1(e);
//     try {
//       const response = await axios.get(`/api/category2?category1=${e}`);
//       let b = response.data.map((item) => ({
//         value: item.category2,
//         label: item.name,
//         id: item.id,
//       }));
//       setCategory2(b);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCategory3Data = async (e) => {
//     setSelectedCategory2(e);
//     try {
//       const response = await axios.get(
//         `/api/category3?category1=${selectedCategory1}&category2=${e}`,
//       );
//       let c = response.data.map((item) => ({
//         value: item.category3,
//         label: item.name,
//         id: item.id,
//       }));
//       setCategory3(c);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchMaterialMasterData = async (e) => {
//     setSelectedCategory3(e)
//     try {
//       const response = await axios.get('/api/material', {
//         params: {
//           category1: selectedCategory1,
//           category2: selectedCategory2,
//           category3: selectedCategory3,
//           abCode: selectedABCode,
//         },
//       });
//       console.log(response.data);
//       const newData = response.data.map((item) => {
        
//           return { ...item, [field]: value };
      
//       });
//       setData(newData);
      
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchMaterialMasterData();
//     fetchCategory1Data();
//   }, []);

//   const columns = [
//     {
//       title: 'カテゴリー',
//       dataIndex: 'categoryNam',
//       key: 'categoryNam',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.ItemName}
//           onChange={(e) =>
//             handleInputChange(record.key, 'categoryNam', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '名称・規格',
//       dataIndex: 'specification',
//       key: 'specification',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.Specification}
//           onChange={(e) =>
//             handleInputChange(record.key, 'specification', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '標準単価',
//       dataIndex: 'standardPrice',
//       key: 'standardPrice',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.StandardPrice}
//           onChange={(e) =>
//             handleInputChange(record.key, 'standardPrice', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '提出単価',
//       dataIndex: 'submissionPrice',
//       key: 'submissionPrice',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.SubmissionPrice}
//           onChange={(e) =>
//             handleInputChange(record.key, 'submissionPrice', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '社内単価',
//       dataIndex: 'internalPrice',
//       key: 'internalPrice',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.InternalPrice}
//           onChange={(e) =>
//             handleInputChange(record.key, 'internalPrice', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '建設物価',
//       dataIndex: 'constructionPrice',
//       key: 'constructionPrice',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.ConstructionPrice}
//           onChange={(e) =>
//             handleInputChange(record.key, 'constructionPrice', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '歩掛',
//       dataIndex: 'laborCost',
//       key: 'lborCost',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.LaborCost}
//           onChange={(e) =>
//             handleInputChange(record.key, 'laborCost', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '補充率',
//       dataIndex: 'replenishmentRate',
//       key: 'replenishmentRate',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.ReplenishmentRate}
//           onChange={(e) =>
//             handleInputChange(record.key, 'replenishmentRate', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '付属品率',
//       dataIndex: 'AccessoryRate',
//       key: 'AccessoryRate',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.AccessoryRate}
//           onChange={(e) =>
//             handleInputChange(record.key, 'AccessoryRate', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '材料率',
//       dataIndex: 'materialRate',
//       key: 'materialRate',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.MaterialRate}
//           onChange={(e) =>
//             handleInputChange(record.key, 'materialRate', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: '単位',
//       dataIndex: 'unit',
//       key: 'unit',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.Unit}
//           onChange={(e) =>
//             handleInputChange(record.key, 'unit', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//     {
//       title: 'ABC素材',
//       dataIndex: 'ABCMaterial',
//       key: 'ABCMaterial',
//       align: 'center',
//       render: (text, record) => (
//         <Input
//           value={record.ABCMaterial}
//           onChange={(e) =>
//             handleInputChange(record.key, 'ABCMaterial', e.target.value)
//           }
//           className="w-auto"
//           disabled={selectedRowKey !== record.key}
//         />
//       ),
//     },
//   ];

//   const handleUpdate = () => {
//     if (selectedRowKey) {
//       const updatedRow = data.find((item) => item.key === selectedRowKey);
//       console.log('Updated row:', updatedRow);
//     } else {
//       console.log('No row selected for update.');
//     }
//   };

//   return (
//     <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
//       <Form>
//         <div className="flex flex-row gap-4 mb-5 justify-center">
//           <Select
//             showSearch
//             allowClear
//popupMatchSelectWidth={false}
//             placeholder="Category1"
//             className="w-1/4 "
//             options={category1}
//             onSelect={(e) => {
//               fetchCategory2Data(e);
//             }}
//           />
//           <Select
//             showSearch
//             allowClear
//popupMatchSelectWidth={false}
//             placeholder="Category2"
//             className="w-1/4"
//             options={category2}
//             onSelect={(e) => {
//               fetchCategory3Data(e);
//             }}
//           />
//           <Select
//             showSearch
//             allowClear
//             placeholder="Category3"
//             className="w-1/4"
//             options={category3}
//popupMatchSelectWidth={false}
//             onSelect={(e) => {
//               fetchMaterialMasterData(e);
//             }}
//           />

//           <Select
//             showSearch
//             allowClear
//             placeholder="Rank"
//             className="w-1/4"
//popupMatchSelectWidth={false}
//             options={[
//               { key: 'A', value: 'A', id: 'A' },
//               { key: 'B', value: 'B', id: 'B' },
//             ]}
//             onSelect={(e) => {
//               setSelectedABCode(e);
//             }}
//           />
//         </div>
//         <Form.Item>
//           <Table
//             columns={columns}
//             dataSource={data}
//             pagination={false}
//             bordered
//             ps={5}
//             className="mb-4 border-collapse"
//             rowClassName={(record) =>
//               record.key === selectedRowKey ? 'bg-blue-100' : ''
//             }
//             onRow={(record) => ({
//               onClick: () => handleRowSelect(record),
//             })}
//           />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
// export default MaterialMaster;
