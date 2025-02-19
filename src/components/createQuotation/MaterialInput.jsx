import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Space,
  Select,
  FloatButton,
  Input,
  InputNumber,
  message,
} from 'antd';
import axios from 'axios';

const MaterialInput = ({ setActiveTab, number, setNumber }) => {
  const [form] = Form.useForm();
  const [quotationData, setQuotationData] = useState([]);
  const [category1Option, setCategory1Option] = useState([]);
  const [category2Option, setCategory2Option] = useState({});
  const [category3Option, setCategory3Option] = useState({});
  // const [category4Option, setCategory4Option] = useState({});
  const [unitOption, setUnitOption] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);
  // Fetch quotationTypes based on number
  if (number == '') {
    setActiveTab('basic');
  }
  const fetchQuotationData = async () => {
    try {
      const response = await axios.get(`api/quotationtype?number=${number}`);
      setQuotationData(response.data);
    } catch (error) {
      console.error('Error fetching quotation data:', error);
    }
  };

  const fetchUnitData = async () => {
    try {
      const response = await axios.get('api/unit');
      const unitData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.name,
        }));
      setUnitOption(unitData);
    } catch (error) {
      console.error('Error fetching Unit data:', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get('api/abmaterial');
      const categoryData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.categoryName,
        }));
      setCategoryOption(categoryData);
    } catch (error) {
      console.error('Error fetching Unit data:', error);
    }
  };

  const fetchCategory1 = async () => {
    try {
      const response = await axios.get('api/category1');
      const transformedData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.name,
        }));
      setCategory1Option(transformedData);
    } catch (error) {
      console.error('Error fetching category1:', error);
    }
  };

  const fetchCategory2 = async (category1Id, index) => {
    try {
      const response = await axios.get(
        `api/category2?category1=${category1Id}`,
      );
      setCategory2Option((prev) => ({ ...prev, [index]: response.data }));
    } catch (error) {
      console.error('Error fetching category2:', error);
    }
  };

  const fetchCategory3 = async (category1Id, category2Id, index) => {
    try {
      const response = await axios.get(
        `api/category3?category1=${category1Id}&category2=${category2Id}`,
      );
      setCategory3Option((prev) => ({ ...prev, [index]: response.data }));
    } catch (error) {
      console.error('Error fetching category3:', error);
    }
  };

  const fetchMaterials = async (
    category1Id,
    category2Id,
    category3Id,
    fieldKey,
    cardId,
  ) => {
    try {
      const response = await axios.get(
        `api/material?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
      );

      const materialDetails = response.data[0]; // Assuming the response contains one material

      if (materialDetails) {
        // Get the current form state for the card
        const current = form.getFieldValue(`${cardId}`) || {};

        // Update the specific material field with fetched data
        form.setFieldsValue({
          [`${cardId}`]: {
            ...current,
            [fieldKey]: {
              ...current[fieldKey],
              quantity: '',
              unit: materialDetails.unit || '',
              externalCos: materialDetails.externalCos || '',
              stepRate: materialDetails.stepRateA || '',
              divide: materialDetails.divide || '',
              categoryNam: materialDetails.categoryNam || '',
            },
          },
        });
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleCategory1Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {};
    form.setFieldsValue({
      [`${cardId}`]: {
        ...current,
        [fieldKey]: {
          ...current[fieldKey],
          category1: value,
          category2: undefined,
          category3: undefined,
          category4: undefined,
        },
      },
    });
    fetchCategory2(value, `${cardId}-${fieldKey}`);
  };

  const handleCategory2Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {};
    form.setFieldsValue({
      [`${cardId}`]: {
        ...current,
        [fieldKey]: {
          ...current[fieldKey],
          category2: value,
          category3: undefined,
          category4: undefined,
        },
      },
    });
    fetchCategory3(
      current[fieldKey]?.category1,
      value,
      `${cardId}-${fieldKey}`,
    );
  };

  const handleCategory3Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {};
    form.setFieldsValue({
      [`${cardId}`]: {
        ...current,
        [fieldKey]: {
          ...current[fieldKey],
          category3: value,
          category4: undefined,
        },
      },
    });
    const category1Id = current[fieldKey]?.category1;
    const category2Id = current[fieldKey]?.category2;

    fetchMaterials(category1Id, category2Id, value, fieldKey, cardId);
    // fetchCategory4(category1Id, category2Id, value, cardId`${}-${fieldKey}`);
    console.log(current);
  };

  useEffect(() => {
    fetchQuotationData();
    fetchCategory1();
    fetchUnitData();
    fetchCategoryData();
  }, []);

  const transformData = (data) => {
    const result = [];
    Object.keys(data).forEach((typeId) => {
      data[typeId].forEach((material) => {
        result.push({
          TypeId: parseInt(typeId), // Matches backend field name
          Category1: material.category1.toString(),
          Category2: material.category2.toString(),
          Category3: material.category3.toString(),
          Category4: material.category4 || '', // Ensure this is present
          Quantity: material.quantity || '',
          Unit: material.unit || '',
          Price: material.externalCos.toString(),
          StepRate: material.stepRate || '',
          Divide: material.divide || '',
          Category: material.categoryNam || '',
          Delete: false,
        });
      });
    });
    return result;
  };

  const handleSubmit = async () => {
    try {
      const formValues = form.getFieldsValue(); // Raw data from the form
      const transformedData = transformData(formValues);
      console.log('Transformed Data:', transformedData);
      const response = await axios.post(
        '/api/quotationmaterial',
        transformedData,
      );
      if (response.status !== 200) {
        throw new Error(`Failed to save data for typeId: ${data.typeId}`);
      }
      message.success('All data saved successfully!');
      setNumber('');
    } catch (error) {
      console.error('Error saving data:', error);
      message.error('Error saving data');
    }
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-hidden font-bold flex">
      <Form
        form={form}
        name="dynamic_form_complex"
        className="flex justify-between gap-4 w-full"
      >
        <div
          className="w-full overflow-auto pr-4"
          style={{ maxHeight: 'calc(60vh - 48px)' }}
        >
          {quotationData.map((item) => (
            <Card
              key={item.id}
              className="mb-4 border-gray-400"
              size="small"
              title={`${item.category1} - ${item.category2} - ${item.category3} - ${item.category4}`}
            >
              <Form.List name={`${item.id}`}>
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: 16,
                    }}
                  >
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          name={[field.name, 'category1']}
                          rules={[
                            { required: true, message: 'Select category 1' },
                          ]}
                        >
                          <Select
                            allowClear
                            placeholder="品名"
                            popupMatchSelectWidth={false}
                            onSelect={(value) =>
                              handleCategory1Change(value, field.key, item.id)
                            }
                            options={category1Option.map((aa) => ({
                              label: aa.value,
                              value: aa.id,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, 'category2']}
                          rules={[
                            { required: true, message: 'Select category 2' },
                          ]}
                        >
                          <Select
                            allowClear
                            placeholder="名称"
                            popupMatchSelectWidth={false}
                            onSelect={(value) =>
                              handleCategory2Change(value, field.key, item.id)
                            }
                            options={category2Option[
                              `${item.id}-${field.key}`
                            ]?.map((aa) => ({
                              label: aa.name,
                              value: aa.category2,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, 'category3']}
                          rules={[
                            { required: true, message: 'Select category 3' },
                          ]}
                        >
                          <Select
                            allowClear
                            placeholder="規格"
                            popupMatchSelectWidth={false}
                            onSelect={(value) =>
                              handleCategory3Change(value, field.key, item.id)
                            }
                            options={category3Option[
                              `${item.id}-${field.key}`
                            ]?.map((aa) => ({
                              label: aa.name,
                              value: aa.category3,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'quantity']}>
                          <Input placeholder="数量" />
                        </Form.Item>

                        <Form.Item name={[field.name, 'unit']}>
                          <Select placeholder="単位" options={unitOption}  popupMatchSelectWidth={false}/>
                        </Form.Item>

                        <Form.Item name={[field.name, 'externalCos']}>
                          <InputNumber placeholder="単価" />
                        </Form.Item>

                        <Form.Item name={[field.name, 'stepRate']}>
                          <Input placeholder="歩掛" />
                        </Form.Item>

                        <Form.Item name={[field.name, 'divide']}>
                          <Input placeholder="支給区分" />
                        </Form.Item>

                        <Form.Item name={[field.name, 'categoryNam']}>
                          <Select
                            placeholder="分類名"
                            popupMatchSelectWidth={false}
                            options={categoryOption}
                          />
                        </Form.Item>

                        <CloseOutlined onClick={() => remove(field.name)} />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      + 部材入力追加
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>
          ))}
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="作成"
        // onClick={() => form.submit()}
        onClick={handleSubmit}
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default MaterialInput;
