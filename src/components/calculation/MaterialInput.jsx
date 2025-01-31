import React, { useState } from 'react';
import { Table, InputNumber, Radio, Select, Form, FloatButton } from 'antd';

const { Option } = Select;

export function MaterialInput({ setActiveTab, number }) {
  if (number == '') {
    setActiveTab('select');
  }
  const sendData = () => {
    setActiveTab('other');
  };
  const [data, setData] = useState([
    {
      key: '1',
      no: '1',
      workType: '幹線動力設備工事',
      rate: 3.0,
      calculation: 'する',
    },
    {
      key: '2',
      no: '2',
      workType: '照明器具設備工事',
      rate: 3.0,
      calculation: 'する',
    },
    {
      key: '3',
      no: '3',
      workType: '非常通報設備工事',
      rate: 3.0,
      calculation: 'する',
    },
  ]);

  const [materialMethod, setMaterialMethod] = useState('B材のみ');

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
      dataIndex: 'no',
      key: 'no',
      align: 'center',
      width: '10%',
    },
    {
      title: '工種名',
      dataIndex: 'workType',
      key: 'workType',
      align: 'center',
      width: '50%',
    },
    {
      title: '雑消率',
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          value={record.rate}
          addonAfter="%"
          max={100}
          min={0}
          onChange={(e) => handleInputChange(record.key, 'rate', e)}
          className="w-24"
        />
      ),
    },
    {
      title: '計算を',
      dataIndex: 'calculation',
      key: 'calculation',
      align: 'center',
      render: (text, record) => (
        <Select
          value={record.calculation}
          onChange={(value) =>
            handleInputChange(record.key, 'calculation', value)
          }
          className="w-24"
        >
          <Option value="する">する</Option>
          <Option value="しない">しない</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form>
        <Form.Item label="計算方法 : ">
          <Radio.Group
            className="items-center flex flex-row gap-4"
            defaultValue="aaa"
          >
            <Radio value="aaa">工種ごとの部材ごと</Radio>
            <Radio value="bbb">
              <div className="flex flex-row gap-2 items-center">
                <p>労務費基準:</p>
                <InputNumber
                  label="労務費基準"
                  name="労務費基準"
                  addonAfter="%"
                  max={100}
                  min={0}
                />
              </div>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <div className="flex flex-row gap-4">
          <Form.Item className="w-full">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              className="mb-4 border-collapse"
            />
          </Form.Item>
          <Form.Item className="p-4 border border-gray-300 bg-gray-100">
            <div className="font-bold text-lg mb-2">雑材消耗費の計算方法</div>
            <Radio.Group
              onChange={(e) => setMaterialMethod(e.target.value)}
              value={materialMethod}
              className="space-y-2"
            >
              <Radio value="B材のみ" className="block">
                B材のみ
              </Radio>
              <Radio value="A材も含む" className="block">
                A材も含む
              </Radio>
            </Radio.Group>

            <div className="text-gray-500 mt-2">
              ※ 工種・部材を選択した場合のみ有効です。
            </div>
          </Form.Item>
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        onClick={() => sendData()}
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default MaterialInput;
