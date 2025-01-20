import React, { useState } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Button,
  Select,
  FloatButton,
  Radio,
  Form,
} from 'antd';
import CTable from '../CTable';

export function MaterialMaster() {
  const [data, setData] = useState([]);

  const [selectedRowKey, setSelectedRowKey] = useState(null);

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const handleRowSelect = (record) => {
    setSelectedRowKey(record.key);
  };

  const columns = [
    {
      title: '品名',
      dataIndex: 'ItemName',
      key: 'ItemName',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.ItemName}
          onChange={(e) =>
            handleInputChange(record.key, 'ItemName', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '名称・規格',
      dataIndex: 'Specification',
      key: 'Specification',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Specification}
          onChange={(e) =>
            handleInputChange(record.key, 'Specification', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '標準単価',
      dataIndex: 'StandardPrice',
      key: 'StandardPrice',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.StandardPrice}
          onChange={(e) =>
            handleInputChange(record.key, 'StandardPrice', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '提出単価',
      dataIndex: 'SubmissionPrice',
      key: 'SubmissionPrice',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.SubmissionPrice}
          onChange={(e) =>
            handleInputChange(record.key, 'SubmissionPrice', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '社内単価',
      dataIndex: 'InternalPrice',
      key: 'InternalPrice',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.InternalPrice}
          onChange={(e) =>
            handleInputChange(record.key, 'InternalPrice', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '建設物価',
      dataIndex: 'ConstructionPrice',
      key: 'ConstructionPrice',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.ConstructionPrice}
          onChange={(e) =>
            handleInputChange(record.key, 'ConstructionPrice', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '歩掛',
      dataIndex: 'LaborCost',
      key: 'LaborCost',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.LaborCost}
          onChange={(e) =>
            handleInputChange(record.key, 'LaborCost', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '補充率',
      dataIndex: 'ReplenishmentRate',
      key: 'ReplenishmentRate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.ReplenishmentRate}
          onChange={(e) =>
            handleInputChange(record.key, 'ReplenishmentRate', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '付属品率',
      dataIndex: 'AccessoryRate',
      key: 'AccessoryRate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.AccessoryRate}
          onChange={(e) =>
            handleInputChange(record.key, 'AccessoryRate', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '材料率',
      dataIndex: 'MaterialRate',
      key: 'MaterialRate',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.MaterialRate}
          onChange={(e) =>
            handleInputChange(record.key, 'MaterialRate', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: '単位',
      dataIndex: 'Unit',
      key: 'Unit',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.Unit}
          onChange={(e) =>
            handleInputChange(record.key, 'Unit', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
    {
      title: 'ABC素材',
      dataIndex: 'ABCMaterial',
      key: 'ABCMaterial',
      align: 'center',
      render: (text, record) => (
        <Input
          value={record.ABCMaterial}
          onChange={(e) =>
            handleInputChange(record.key, 'ABCMaterial', e.target.value)
          }
          className="w-auto"
          disabled={selectedRowKey !== record.key}
        />
      ),
    },
  ];

  const handleUpdate = () => {
    if (selectedRowKey) {
      const updatedRow = data.find((item) => item.key === selectedRowKey);
      console.log('Updated row:', updatedRow);
    } else {
      console.log('No row selected for update.');
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center overflow-auto font-bold">
      <Form>
        <div className="flex flex-row gap-4 mb-5 justify-center">
          <Select showSearch allowClear placeholder="Name" className="w-1/4 " />
          <Select showSearch allowClear placeholder="Group" className="w-1/4" />
          <Select showSearch allowClear placeholder="Rank" className="w-1/4" />
        </div>
        <Form.Item>
          <CTable
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            ps={5}
            className="mb-4 border-collapse"
            rowClassName={(record) =>
              record.key === selectedRowKey ? 'bg-blue-100' : ''
            }
            onRow={(record) => ({
              onClick: () => handleRowSelect(record),
            })}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
export default MaterialMaster;
