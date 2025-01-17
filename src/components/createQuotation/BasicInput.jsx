import React, { useEffect, useState } from 'react';
import {
  Typography,
  Form,
  Input,
  Radio,
  Select,
  Button,
  FloatButton,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';

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

      {/* Display Selected Value */}
      <Typography variant="body1" className="my-4 text-blue-gray-500">
        ※ 得意先データ処理
      </Typography>
      <Form>
        <div className="flex justify-between gap-4">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-2 justify-start">
              <div className="flex-row flex-grow flex gap-4 items-center">
                <Form.Item
                  label="得意先名 :"
                  required
                  style={{ width: 150 }}
                  className=" flex-grow gap-2 w-full"
                >
                  <Input
                    placeholder="得意先名"
                    allowClear
                    disabled={selectedRadio && selectedRadio !== 'type'}
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="flex-row flex-grow flex gap-4 items-center w-full">
                <Form.Item
                  label="支社名 :"
                  required
                  style={{ width: 150 }}
                  className=" flex-grow gap-2 w-full"
                >
                  <Input
                    placeholder="支社名"
                    allowClear
                    disabled={selectedRadio && selectedRadio !== 'type'}
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item layout="vertical" label="場所 :" required>
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
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
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
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
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
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      value={selected}
                      placeholder="Search by postal code"
                      disabled={selectedValue && selectedValue !== '3'}
                      optionFilterProp="label"
                      onChange={handleSelectChange}
                      onSearch={handleSelectSearch}
                      allowClear
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
            <Form.Item label="電話番号">
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="FAX">
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="メール">
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="HPアドレス">
              <Input className="w-full" />
            </Form.Item>
            <Form.Item label="備考">
              <TextArea className="w-full" />
            </Form.Item>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 md:px-20">
          <Form.Item label="ランク">
            <Select
              suffixIcon
              className="w-full"
              popupMatchSelectWidth={false}
              placement="bottomLeft"
              disabled={selectedRadio && selectedRadio !== 'select'}
              allowClear
              options={[
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
                { value: 'E', label: 'E' },
              ]}
            />
          </Form.Item>
          <Form.Item label="締切日">
            <Select
              suffixIcon
              className="w-full"
              popupMatchSelectWidth={false}
              placement="bottomLeft"
              disabled={selectedRadio && selectedRadio !== 'select'}
              allowClear
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
                { value: '6', label: '6' },
                { value: '7', label: '7' },
                { value: '8', label: '8' },
                { value: '9', label: '9' },
                { value: '10', label: '10' },
                { value: '11', label: '11' },
                { value: '12', label: '12' },
                { value: '13', label: '13' },
                { value: '14', label: '14' },
                { value: '15', label: '15' },
                { value: '16', label: '16' },
                { value: '17', label: '17' },
                { value: '18', label: '18' },
                { value: '19', label: '19' },
                { value: '20', label: '20' },
                { value: '21', label: '21' },
                { value: '22', label: '22' },
                { value: '23', label: '23' },
                { value: '24', label: '24' },
                { value: '25', label: '25' },
                { value: '26', label: '26' },
                { value: '27', label: '27' },
                { value: '28', label: '28' },
                { value: '29', label: '29' },
                { value: '30', label: '30' },
                { value: '31', label: '31' },
              ]}
            />
          </Form.Item>
          <Form.Item label="グループ設定">
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
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              保管
            </Button>
          </Form.Item>
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
