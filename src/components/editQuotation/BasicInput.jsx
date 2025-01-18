import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, FloatButton, DatePicker } from 'antd';
import CTable from '../CTable';

const BasicInput = ({ setActiveTab }) => {
  const [selectedValue, setSelectedValue] = useState('0');
  const [selected, setSelected] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const radioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelected(e);
    console.log(`Selected: ${e}`);
  };

  const handleSelectSearch = (e) => {
    console.log(`Search: ${e}`);
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form
        layout="vertical"
        className=" border border-t-0 border-x-0 border-b-[#000000b8]"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Form.Item label="① 工事名称 :" required>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                allowClear
                placeholder="Enter construction name"
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="② 工事場所 :" required>
              <Radio.Group
                onChange={handleRadioChange}
                value={selectedValue}
                className="flex flex-col gap-4"
              >
                {/* Option 1: 都道府県選択 */}
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="1" style={{ width: 150 }}>
                    都道府県 :
                  </Radio>
                  <div className="flex flex-grow items-center gap-2 justify-start">
                    <Select
                      suffixIcon
                      placeholder="県"
                      className="w-full"
                      disabled={selectedValue && selectedValue !== '1'}
                      allowClear
                      options={[
                        { value: 'Tokyo', label: 'Tokyo' },
                        { value: 'Osaka', label: 'Osaka' },
                      ]}
                    />
                    <Select
                      suffixIcon
                      placeholder="都市"
                      className="w-full"
                      disabled={selectedValue && selectedValue !== '1'}
                      allowClear
                      options={[
                        { value: 'Shibuya', label: 'Shibuya' },
                        { value: 'Namba', label: 'Namba' },
                      ]}
                    />
                    <Input
                      placeholder="Other location"
                      disabled={selectedValue && selectedValue !== '1'}
                      allowClear
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Option 2: 直接入力 */}
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="2" style={{ width: 150 }}>
                    直接入力 :
                  </Radio>
                  <div className="flex-grow">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={selectedValue && selectedValue !== '2'}
                      placeholder="Enter location directly"
                      allowClear
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Option 3: 郵便番号検索 */}
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="3" style={{ width: 150 }}>
                    郵便番号検索 :
                  </Radio>
                  <div className="flex-grow">
                    <Select
                      showSearch
                      suffixIcon
                      value={selected}
                      placeholder="Search by postal code"
                      disabled={selectedValue && selectedValue !== '3'}
                      optionFilterProp="label"
                      onChange={handleSelectChange}
                      onSearch={handleSelectSearch}
                      allowClear
                      className="w-full"
                      options={[
                        { value: 'jack', label: '132' },
                        { value: 'lucy', label: '456' },
                        { value: 'tom', label: '123' },
                      ]}
                    />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="w-full md:w-1/2">
            <Form.Item label="③ 提出先 :" required>
              <Radio.Group
                value={selectedRadio}
                onChange={radioChange}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="type">手動入力 :</Radio>
                  <div className="flex-col flex-grow flex gap-4">
                    <div>
                      <Input
                        placeholder="得意先名"
                        allowClear
                        disabled={selectedRadio && selectedRadio !== 'type'}
                        className="w-full"
                      />
                    </div>
                    <Input
                      placeholder="支社名"
                      allowClear
                      disabled={selectedRadio && selectedRadio !== 'type'}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="select">選択入力 :</Radio>
                  <div>
                    <Select
                      suffixIcon
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      disabled={selectedRadio && selectedRadio !== 'select'}
                      allowClear
                      options={[
                        { value: 'ア', label: 'ア' },
                        { value: 'カ', label: 'カ' },
                        { value: 'サ', label: 'サ' },
                        { value: 'タ', label: 'タ' },
                        { value: 'ナ', label: 'ナ' },
                        { value: 'ハ', label: 'ハ' },
                        { value: 'マ', label: 'マ' },
                        { value: 'ヤ', label: 'ヤ' },
                        { value: 'ラ', label: 'ラ' },
                        { value: 'ワ', label: 'ワ' },
                      ]}
                    />
                  </div>
                  <div className="flex-col flex-grow flex gap-4">
                    <Select
                      suffixIcon
                      showSearch
                      placeholder="得意先名"
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      disabled={selectedRadio && selectedRadio !== 'select'}
                      allowClear
                      options={[
                        { value: 'Tokyo', label: 'Tokyo' },
                        { value: 'Osaka', label: 'Osaka' },
                      ]}
                    />
                    <Select
                      suffixIcon
                      showSearch
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      placeholder="支社名"
                      disabled={selectedRadio && selectedRadio !== 'select'}
                      allowClear
                      options={[
                        { value: 'Tokyo', label: 'Tokyo' },
                        { value: 'Osaka', label: 'Osaka' },
                      ]}
                    />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default BasicInput;
