import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  FloatButton,
  message,
  Spin,
  Typography,
  Button,
} from 'antd';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { TextArea } = Input;

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
  // New state for customer data processing
  const [customerOption, setCustomerOption] = useState(null); // Selected option for postal code
  const [customerName, setCustomerName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [customerAddressValue, setCustomerAddressValue] = useState('0');
  const [customerPrefecture, setCustomerPrefecture] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerOtherAddress, setCustomerOtherAddress] = useState('');
  const [customerAddressLocation, setCustomerAddressLocation] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerFax, setCustomerFax] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerWebsite, setCustomerWebsite] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [customerRank, setCustomerRank] = useState('');
  const [customerClosingDate, setCustomerClosingDate] = useState('');
  const [customerGroup, setCustomerGroup] = useState('');

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
        const part1 = result[0]; // "akitaken"
        const part2 = result[1];
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
    setSelectedCustomer(
      customerData.find((customer) => customer.name === selectedOption),
    );
    const a =
      selectedOption +
      '  ' +
      (selectedCustomer == null ? '' : selectedCustomer);
    setExportName(a);
  };

  // New functions for customer data processing
  const handleCustomerAddressRadioChange = (e) => {
    setCustomerAddressValue(e.target.value);
  };

  const handleCustomerPrefectureChange = async (prefecture) => {
    setCustomerPrefecture(prefecture);
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

  const handleCustomerPostalSearch = async (postalCode) => {
    if (!postalCode) {
      setCustomerOption(null); // Clear the option if input is empty
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('/api/customer/postalcode', {
        params: { code: postalCode },
      });
      const data = response.data[0];
      setCustomerOption({
        value: data.value, // Backend "value"
        label: data.label, // Backend "label"
      });
    } catch (error) {
      console.error('Error fetching postal code:', error);
      setCustomerOption(null); // Clear the option on error
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async () => {
    try {
      const customerData = {
        Name: customerName,
        SubName: branchName,
        Address:
          customerAddressValue === '1'
            ? `${customerPrefecture} ${customerCity} ${customerOtherAddress}`
            : customerAddressValue === '2'
            ? customerAddressLocation
            : customerOption?.label || '',
        Phone: customerPhone,
        Fax: customerFax,
        Email: customerEmail,
        Hp: customerWebsite,
        Description: customerNotes,
        Rank: customerRank,
        CloseingDat: customerClosingDate,
        Group: customerGroup,
        Creater: userName,
      };

      const response = await axios.post('/api/customer', customerData);
      if (response.status === 200) {
        message.success('Customer created successfully');
        // Clear the form fields after successful creation
        setCustomerName('');
        setBranchName('');
        setCustomerAddressValue('0');
        setCustomerPrefecture('');
        setCustomerCity('');
        setCustomerOtherAddress('');
        setCustomerAddressLocation('');
        setCustomerPhone('');
        setCustomerFax('');
        setCustomerEmail('');
        setCustomerWebsite('');
        setCustomerNotes('');
        setCustomerRank('');
        setCustomerClosingDate('');
        setCustomerGroup('');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      message.error('Failed to create customer');
    }
  };

  const handleSaveCustomerData = () => {
    createCustomer();
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
                      disabled={selectedMainAddressValue !== '1'}
                      allowClear
                      onSelect={(e) => setSelectedMainPrefecture(e)}
                      onChange={handleMainPrefectureChange}
                      options={prefectures}
                    />
                    <Select
                      placeholder="都市"
                      className="w-full"
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
                  className="flex-grow gap-2 w-full"
                >
                  <Input
                    placeholder="得意先名"
                    allowClear
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className="flex-row flex-grow flex gap-4 items-center w-full">
                <Form.Item
                  label="支社名 :"
                  required
                  style={{ width: 150 }}
                  className="flex-grow gap-2 w-full"
                >
                  <Input
                    placeholder="支社名"
                    allowClear
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    className="w-full"
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item layout="vertical" label="場所 :" required>
              <Radio.Group
                onChange={handleCustomerAddressRadioChange}
                value={customerAddressValue}
                className="flex flex-col gap-4"
              >
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
                      disabled={customerAddressValue !== '1'}
                      allowClear
                      value={customerPrefecture}
                      onChange={handleCustomerPrefectureChange}
                      options={prefectures}
                    />
                    <Select
                      suffixIcon
                      placeholder="都市"
                      className="w-full"
                      popupMatchSelectWidth={false}
                      placement="bottomLeft"
                      disabled={customerAddressValue !== '1'}
                      allowClear
                      value={customerCity}
                      onChange={(value) => setCustomerCity(value)}
                      options={cities}
                    />
                    <Input
                      placeholder="その他"
                      disabled={customerAddressValue !== '1'}
                      allowClear
                      className="w-full"
                      value={customerOtherAddress}
                      onChange={(e) => setCustomerOtherAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-start">
                  <Radio value="2" style={{ width: 150 }}>
                    直接入力 :
                  </Radio>
                  <div className="flex-grow">
                    <Input
                      value={customerAddressLocation}
                      onChange={(e) =>
                        setCustomerAddressLocation(e.target.value)
                      }
                      disabled={customerAddressValue !== '2'}
                      placeholder="住所を直接入力"
                      allowClear
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
                      value={customerOption?.label} // Display the label of the selected option
                      disabled={customerAddressValue !== '3'} // Disable when the condition is not met
                      onSearch={(value) => {
                        /* Wait for the user to press Enter */
                      }}
                      onInputKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCustomerPostalSearch(e.target.value); // Trigger search on Enter
                        }
                      }}
                      allowClear
                      notFoundContent={
                        loading ? (
                          <Spin size="small" />
                        ) : (
                          '一致するデータはありません。' // Fallback text if no matching data
                        )
                      }
                      options={customerOption ? [customerOption] : []} // Show the single result if available
                      className="w-full"
                    />
                  </div>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="w-full md:w-1/2">
            <Form.Item label="電話番号">
              <Input
                className="w-full"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="FAX">
              <Input
                className="w-full"
                value={customerFax}
                onChange={(e) => setCustomerFax(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="メール">
              <Input
                className="w-full"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="HPアドレス">
              <Input
                className="w-full"
                value={customerWebsite}
                onChange={(e) => setCustomerWebsite(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="備考">
              <TextArea
                className="w-full"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
              />
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
              allowClear
              value={customerRank}
              onChange={(value) => setCustomerRank(value)}
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
              allowClear
              value={customerClosingDate}
              onChange={(value) => setCustomerClosingDate(value)}
              options={Array.from({ length: 31 }, (_, i) => ({
                value: `${i + 1}`,
                label: `${i + 1}`,
              }))}
            />
          </Form.Item>
          <Form.Item label="グループ設定">
            <Select
              suffixIcon
              className="w-full"
              popupMatchSelectWidth={false}
              placement="bottomLeft"
              allowClear
              value={customerGroup}
              onChange={(value) => setCustomerGroup(value)}
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
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              onClick={handleSaveCustomerData}
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
        onClick={() => sendData()}
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default BasicInput;
