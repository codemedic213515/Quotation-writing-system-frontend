import React, { useState } from 'react';
import { Table, InputNumber, Select, Form, Radio, FloatButton } from 'antd';

const { Option } = Select;

export function PriceInput() {
  const [data, setData] = useState([
    {
      key: '1',
      category: '照明器具',
      rateCorrection: 55,
      adjustment: 50,
      rank: 'Aランク',
    },
    {
      key: '2',
      category: '換気扇',
      rateCorrection: 65,
      adjustment: 60,
      rank: 'Bランク',
    },
    {
      key: '3',
      category: '盤類',
      rateCorrection: 100,
      adjustment: 70,
      rank: 'Cランク',
    },
    {
      key: '4',
      category: '高圧機器',
      rateCorrection: 75,
      adjustment: 32,
      rank: 'Dランク',
    },
    {
      key: '5',
      category: '放送機器',
      rateCorrection: 35,
      adjustment: 27,
      rank: 'Eランク',
    },
    // Add more rows as needed
  ]);

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setData(newData);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: '5%',
    },
    {
      title: '分類名',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
      width: '20%',
    },
    {
      title: '乗率修正',
      dataIndex: 'rateCorrection',
      key: 'rateCorrection',
      align: 'center',
      render: (text, record) => (
        <>
          <div className="flex items-center justify-center">
            <p>{' aaa =>  '}</p>
            <InputNumber
              value={record.rateCorrection}
              addonAfter={'%'}
              max={100}
              min={0}
              onChange={(e) =>
                handleInputChange(record.key, 'rateCorrection', e)
              }
              className="w-32"
            />
          </div>
        </>
      ),
    },
    {
      title: '修正',
      dataIndex: 'adjustment',
      key: 'adjustment',
      align: 'center',
      render: (text, record) => (
        <>
          <div className="flex items-center justify-center">
            <p>{'  bbb =>  '}</p>
            <InputNumber
              value={record.adjustment}
              addonAfter={'%'}
              max={100}
              min={0}
              onChange={(e) => handleInputChange(record.key, 'adjustment', e)}
              className="w-32"
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form>
        <div className="flex flex-row gap-4 justify-end items-center">
          <Form.Item label="表示分類">
            <Radio.Group optionType="button" defaultValue={'A'}>
              <Radio value="A">A 材</Radio>
              <Radio value="B">B 材</Radio>
            </Radio.Group>
            {'  定'}
          </Form.Item>
          <Form.Item label="分類名: ">
            <Select className="w-24" suffixIcon>
              <Option value="ユーザー設定">ユーザー設定</Option>
              <Option value="Aランク">Aランク</Option>
              <Option value="Bランク">Bランク</Option>
              <Option value="Cランク">Cランク</Option>
              <Option value="Dランク">Dランク</Option>
              <Option value="Eランク">Eランク</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            className="border border-gray-300"
          />
        </Form.Item>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}
export default PriceInput;
