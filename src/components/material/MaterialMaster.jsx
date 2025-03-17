import { Form, Input, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function MaterialMaster() {
  const [data, setData] = useState([]);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");
  const [pagination, setPagination] = useState({ position:["bottomcenter"] ,current: 1, pageSize: 5, total: 0, showSizeChanger: false,});
const [filters, setFilters]=useState({
  category1: selectedCategory1 || undefined,
  category2: selectedCategory2 || undefined,
  category3: selectedCategory3 || undefined,
  page: 1,
  pageSize: 5,
})

  const fetchMaterialMasterData = async () => {
    try {
      const response = await axios.get('/api/material/masterdata', {
        params: filters
      });
      setData(response.data.items);
      setPagination({ ...pagination, total: response.data.total });
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  fetchMaterialMasterData()
},[filters])
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
    setFilters((prev) => ({ ...prev, category1: value }));
    setCategory2([]);
    setCategory3([]);
    setSelectedCategory2(null);
    setSelectedCategory3(null);
    try {
      const response = await axios.get(`/api/category2?category1=${value}`);
      setCategory2(response.data.map(item => ({ value: item.category2, label: item.name })));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory3Data = async (value) => {
    setSelectedCategory2(value);
    setFilters((prev) => ({ ...prev, category2: value }));
    setCategory3([]);
    setSelectedCategory3(null);
    try {
      const response = await axios.get(`/api/category3?category1=${selectedCategory1}&category2=${value}`);
      setCategory3(response.data.map(item => ({ value: item.category3, label: item.name })));
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
    setFilters((prev) => ({ ...prev, page: pagination.current }));
  };

  const columns = [
    { title: 'カテゴリー', dataIndex: 'categoryNam', key: 'categoryNam', align: 'center' },
    { title: '名称・規格', dataIndex: 'name', key: 'name', align: 'center' },
    { title: '標準単価', dataIndex: 'buildingCos', key: 'buildingCos', align: 'center' },
    { title: '提出単価', dataIndex: 'externalCos', key: 'externalCos', align: 'center' },
    { title: '社内単価', dataIndex: 'internalCos', key: 'internalCos', align: 'center' },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Form>
        <div className="flex flex-row gap-4 mb-5 justify-center">
          <Select showSearch allowClear popupMatchSelectWidth={false} placeholder="" className="w-1/4" options={category1} onChange={fetchCategory2Data} />
          <Select showSearch allowClear popupMatchSelectWidth={false} placeholder="" className="w-1/4" options={category2} onChange={fetchCategory3Data} disabled={!selectedCategory1} />
          <Select showSearch allowClear  popupMatchSelectWidth={false}placeholder="" className="w-1/4" options={category3} onChange={(value) => { setSelectedCategory3(value);     setFilters((prev) => ({ ...prev, category3:value }));}} disabled={!selectedCategory2} />
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
