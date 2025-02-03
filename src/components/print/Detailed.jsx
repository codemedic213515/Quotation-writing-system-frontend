import React from 'react';
import { Table } from 'antd';

const Detailed = () => {
  const columns = [
    { title: 'No.', dataIndex: 'no', key: 'no', align: 'center', width: 50 },
    {
      title: '項目',
      dataIndex: 'item',
      key: 'item',
      align: 'left',
      width: 180,
    },
    {
      title: '形状',
      dataIndex: 'shape',
      key: 'shape',
      align: 'center',
      width: 120,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      width: 80,
    },
    {
      title: '単位',
      dataIndex: 'unit',
      key: 'unit',
      align: 'center',
      width: 80,
    },
    {
      title: '単価',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'right',
      width: 100,
    },
    {
      title: '金額',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 120,
    },
    {
      title: '摘要',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'center',
      width: 100,
    },
  ];

  // Define table data
  const data = [
    {
      key: '1',
      no: '1',
      item: '電灯設備工事',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '276,000',
      remarks: '',
    },
    {
      key: '2',
      no: '',
      item: '',
      shape: '1 2 3',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '27,600',
      remarks: '',
    },
    {
      key: '3',
      no: '',
      item: '',
      shape: '5 6 3',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '151,800',
      remarks: '',
    },
    {
      key: '4',
      no: '',
      item: '',
      shape: '5 2 3',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '300,564',
      remarks: '',
    },
    {
      key: '5',
      no: '',
      item: '',
      shape: '1 2 3',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '136,619',
      remarks: '',
    },
    {
      key: '6',
      no: '',
      item: '合 計',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '892,583',
      remarks: '',
    },
    {
      key: '7',
      no: '',
      item: '出精値引',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '▲200',
      remarks: '',
    },
    {
      key: '8',
      no: '',
      item: '消 費 税',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '89,238',
      remarks: '',
    },
    {
      key: '9',
      no: '',
      item: '1 2 3 1',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '7,777',
      remarks: '',
    },
    {
      key: '10',
      no: '',
      item: '改め合計',
      shape: '',
      quantity: '1',
      unit: '式',
      unitPrice: '',
      amount: '989,398',
      remarks: '',
    },
  ];

  return (
    <div className="w-full p-6 bg-white">
      {/* Table Title */}
      <h2 className="text-center text-lg font-bold mb-4 border-b pb-2">
        工 種 別 内 訳 表
      </h2>

      {/* Ant Design Table with Tailwind Styling */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="w-full"
      />
    </div>
  );
};

export default Detailed;
