import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, FloatButton, message, Spin } from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const BasicInput = ({ setActiveTab, number }) => {
  const [option, setOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainName, setMainName] = useState('');
  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('token');
  const [prefectures, setPrefectures] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedMainAddressValue, setSelectedMainAddressValue] = useState('0');
  const [quotationAddress, setQuotationAddress] = useState('');
  const [selectedMainPrefecture, setSelectedMainPrefecture] = useState('');
  const [selectedMainCity, setSelectedMainCity] = useState('');
  const [selectedMain, setSelectedMain] = useState(null);
  const [subName, setSubName] = useState('');
  const [selectedExportRadio, setSelectedExportRadio] = useState('');
  const [selectedMainExportName, setSelectedMainExportName] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [mainImport, setMainImport] = useState('');
  const [exportName, setExportName] = useState('');

  if (number === '') {
    message.info('Plz select the Quotation');
    setActiveTab('select');
  }

  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        const response = await axios.get(`/api/quotationmain`, {
          params: { code: number },
        });
        const data = response.data.data[0];
        const result = data.export.split(/\s+/);

        // Access the individual parts
        const part1 = result[0] || ''; // "akitaken"
        const part2 = result[1] || '';
        setMainName(data.name);
        setSelectedMainAddressValue('2');
        setMainAddressLocation(data.address);
        setSelectedExportRadio('type');
        setSelectedMainExportName(part1);
        setSubName(part2);
        setMainImport(data.import);
      } catch (error) {
        console.error('error:', error);
      }
    };
    const fetchPrefectures = async () => {
      try {
        const response = await axios.get('/api/prefecture');
        const filteredPrefectures = response.data
          .filter((item) => !item.delete)
          .map((item) => ({
            value: item.name,
            label: item.name,
          }));
        setPrefectures(filteredPrefectures);
      } catch (error) {
        console.error('Error fetching prefectures:', error);
        message.error('Failed to fetch prefectures');
      }
    };
    if (number) {
      fetchQuotationData();
    }
    fetchPrefectures();
  }, [number]);

  const NumberDisplay = () => {
    const decodedPayload = jwtDecode(token);
    const decodedName = decodedPayload.name;

    setUserName(decodedName);

    return (
      <div className="flex flex-row justify-start gap-10 mb-4">
        <p>
          作成者名 : <i className="text-blue-500">{userName}</i>
        </p>
        <p>
          見積番号 : <i className=" text-green-500">{number}</i>
        </p>
      </div>
    );
  };

  const handleMainAddressRadioChange = (e) => {
    setSelectedMainAddressValue(e.target.value);
  };
  const setMainOtherAddress = (e) => {
    const a = selectedMainPrefecture + '  ' + selectedMainCity + '  ' + e;
    setQuotationAddress(a);
  };
  const setMainAddressLocation = (e) => {
    setQuotationAddress(e);
  };

  const setSelectedMainExportSubName = (e) => {
    const a = selectedMainExportName + '  ' + e;
    setExportName(a);
    setSubName(e);
  };

  const sendData = async () => {
    const data = {
      Code: number,
      Creater: userName,
      Name: mainName,
      Address: quotationAddress,
      Export: exportName,
      Import: mainImport,
    };
    const response = await axios.put(`/api/quotationmain/${number}`, data);
    if (response.status === 200) {
      setActiveTab('addition');
      message.success('Create Quotation Success!');
      console.log(response);
    } else {
      console.log(response);
      message.error('Failed create Quotation');
    }
  };

  const handleMainPrefectureChange = async (prefecture) => {
    try {
      const response = await axios.get(`/api/address?city=${prefecture}`);
      const filteredCities = response.data.map((item) => ({
        value: item,
        label: item,
      }));
      setCities(filteredCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
      message.error('Failed to fetch cities');
    }
  };

  const handleMainSearch = async (value) => {
    if (!value) {
      setOption({
        value: '一致するデータはありません。',
        label: '一致するデータはありません。',
      });
      setQuotationAddress('');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('/api/address/postalcode', {
        params: { code: value },
      });
      setOption({
        value: response.data[0].value,
        label: response.data[0].label,
      });
      setQuotationAddress(response.data[0].label);
    } catch (error) {
      console.error('Error fetching postal code:', error);
      setOption({
        value: '一致するデータはありません。',
        label: '一致するデータはありません。',
      });
      setQuotationAddress('');
    } finally {
      setLoading(false);
    }
  };

  const handleMainChange = (value) => {
    setSelectedMain(value);
  };

  const radioExportChange = (e) => {
    setSelectedExportRadio(e.target.value);
  };

  const fetchExportData = async (e) => {
    try {
      const response = await axios.get(`/api/customer/group?number=${e}`);
      setCustomerData(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
      message.error('Failed to fetch customer data');
    }
  };

  const handleCustomerSelect = (selectedOption) => {
    const b = customerData.find((customer) => customer.name === selectedOption);
    setSelectedCustomer(b);
    const a = selectedOption + ' ' + b.subName;
    setExportName(a);
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <NumberDisplay />
      <Form
        layout="vertical"
        className="border border-t-0 border-x-0 border-b-[#000000b8]"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <Form.Item label="① 工事名称 :" required>
              <Input
                value={mainName}
                onChange={(e) => setMainName(e.target.value)}
                allowClear
                placeholder="工事名称を入力してください。"
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="② 工事場所 :" required>
              <Radio.Group
                onChange={handleMainAddressRadioChange}
                value={selectedMainAddressValue}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="1" style={{ width: 150 }}>
                    都道府県 :
                  </Radio>
                  <div className="flex flex-grow items-center gap-2 justify-start">
                    <Select
                      placeholder="県"
                      className="w-full"
                      popupMatchSelectWidth={false}
                      disabled={selectedMainAddressValue !== '1'}
                      allowClear
                      onSelect={(e) => setSelectedMainPrefecture(e)}
                      onChange={handleMainPrefectureChange}
                      options={prefectures}
                    />
                    <Select
                      placeholder="都市"
                      className="w-full"
                      popupMatchSelectWidth={false}
                      disabled={selectedMainAddressValue !== '1'}
                      allowClear
                      onChange={setSelectedMainCity}
                      options={cities}
                    />
                    <Input
                      disabled={selectedMainAddressValue !== '1'}
                      allowClear
                      required
                      className="w-full"
                      onChange={(e) => setMainOtherAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="2" style={{ width: 150 }}>
                    直接入力 :
                  </Radio>
                  <div className="flex-grow">
                    <Input
                      onChange={(e) => setMainAddressLocation(e.target.value)}
                      disabled={selectedMainAddressValue !== '2'}
                      placeholder="手動で入力してください。"
                      allowClear
                      value={quotationAddress}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="3" style={{ width: 150 }}>
                    郵便番号検索 :
                  </Radio>
                  <div className="flex-grow">
                    <Select
                      showSearch
                      value={option.label}
                      popupMatchSelectWidth={false}
                      disabled={selectedMainAddressValue !== '3'}
                      onSearch={(value) => {
                        /* Wait for the user to press Enter */
                      }}
                      onInputKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleMainSearch(e.target.value);
                        }
                      }}
                      onChange={handleMainChange}
                      allowClear
                      notFoundContent={
                        loading ? (
                          <Spin size="small" />
                        ) : (
                          '一致するデータはありません。'
                        )
                      }
                      options={option ? [option] : []}
                      className="w-full"
                    />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="w-full md:w-1/2">
            <Form.Item label="③ 提出先 :" required>
              <Radio.Group
                value={selectedExportRadio}
                onChange={radioExportChange}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="type">手動入力 :</Radio>
                  <div className="flex-col flex-grow flex gap-4">
                    <div>
                      <Input
                        placeholder="得意先名"
                        allowClear
                        value={selectedMainExportName}
                        disabled={selectedExportRadio !== 'type'}
                        className="w-full"
                        onChange={(e) =>
                          setSelectedMainExportName(e.target.value)
                        }
                      />
                    </div>
                    <Input
                      placeholder="支社名"
                      allowClear
                      value={subName}
                      onChange={(e) =>
                        setSelectedMainExportSubName(e.target.value)
                      }
                      disabled={selectedExportRadio !== 'type'}
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
                      onSelect={(e) => {
                        fetchExportData(e);
                      }}
                      disabled={selectedExportRadio !== 'select'}
                      allowClear
                      options={[
                        { value: '1', label: 'ア' },
                        { value: '2', label: 'カ' },
                        { value: '3', label: 'サ' },
                        { value: '4', label: 'タ' },
                        { value: '5', label: 'ナ' },
                        { value: '6', label: 'ハ' },
                        { value: '7', label: 'マ' },
                        { value: '8', label: 'ヤ' },
                        { value: '9', label: 'ラ' },
                        { value: '10', label: 'ワ' },
                      ]}
                    />
                  </div>
                  <div>
                    <Select
                      suffixIcon
                      showSearch
                      placeholder="得意先名"
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      disabled={selectedExportRadio !== 'select'}
                      allowClear
                      options={customerData.map((customer) => ({
                        value: customer.name,
                        label: customer.name,
                      }))}
                      onChange={handleCustomerSelect}
                      value={
                        selectedCustomer ? selectedCustomer.name : undefined
                      }
                    />
                  </div>
                  <div className="flex-col flex-grow flex gap-4">
                    <Select
                      suffixIcon
                      showSearch
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      placeholder="支社名"
                      disabled={true}
                      value={
                        selectedCustomer ? selectedCustomer.subName : undefined
                      }
                    />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="④ 仕入先 : " required>
              <Input
                onChange={(e) => setMainImport(e.target.value)}
                value={mainImport}
              />
            </Form.Item>
          </div>
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
};

export default BasicInput;
