import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Space,
  Tree,
  Select,
  message,
  FloatButton,
} from 'antd';
import axios from 'axios';

const StepInput = ({ setActiveTab, number }) => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  if (number == '') {
    setActiveTab('basic');
  }

  const initialFormData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      // Check if the basic category (Category1) already exists in the grouped data
      if (!groupedData[item.category1]) {
        groupedData[item.category1] = {
          基本工種: item.category1,
          部分工種: [],
        };
      }

      // Prepare the subcategory objects
      const subItem = {};

      if (item.category2) {
        subItem['部分工種1'] = item.category2;
      }

      if (item.category3) {
        subItem['部分工種2'] = item.category3;
      }

      // Add the subcategory to the "parts" array under the correct 基本工種
      groupedData[item.category1].部分工種.push(subItem);
    });

    // Convert the grouped data into the desired output format
    const result = {
      items: Object.values(groupedData),
    };

    return result;
  };
  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        const response = await axios.get(`api/quotationtype?number=${number}`);
        const data = response.data;
        console.log(data);

        const result = initialFormData(data);
        console.log('result:', result);

        form.setFieldsValue(result);
      } catch (error) {
        console.error('error:', error);
      }
    };
    const fetchConstruction = async () => {
      try {
        const response = await axios.get('/api/construction');
        const option = response.data
          .filter((item) => !item.delete)
          .map((item) => ({
            value: item.name,
            label: item.name,
            siteMiscell: item.siteMiscell,
          }));
        setOptions(option);
      } catch (error) {
        console.error('Error fetching constructions:', error);
        message.error('Failed to fetch construction data');
      }
    };

    if (number) {
      fetchQuotationData();
    }
    fetchConstruction();
  }, [number]);

  // Render Tree Data from the form values
  const renderTreeData = (data) => {
    if (!data || !data.items) return [];
    return data.items.map((item, itemIndex) => ({
      title: `基本工種 ${itemIndex + 1}: ${item?.['基本工種'] || ''}`,
      key: `item-${itemIndex}-base`,
      children: (item?.['部分工種'] || []).map((subItem, subIndex) => ({
        title: `部分工種1: ${subItem?.['部分工種1'] || ''}, 部分工種2: ${
          subItem?.['部分工種2'] || ''
        }`,
        key: `item-${itemIndex}-part-${subIndex}`,
        removalRate: item?.siteMiscell || '', // Access siteMiscell from the item, not subItem
      })),
    }));
  };

  // Transform the tree data for API
  const transformData = (formData) => {
    let result = [];

    // Loop over each item (工種)
    formData.items.forEach((item) => {
      const category1 = item['基本工種']; // Category1 (基本工種)

      // Loop over the 部分工種 (subcategories) to extract data
      (item['部分工種'] || [`'部分工種1':"", '部分工種2':""`]).forEach(
        (subItem) => {
          const category2 = subItem['部分工種1'] || ''; // Category2 (部分工種1) - Default to empty string if not selected
          const category3 = subItem['部分工種2'] || ''; // Category3 (部分工種2) - Default to empty string if not selected

          // Handle RemovalRate: convert empty strings to null, and keep valid numbers
          const removalRate = subItem['removalRate']
            ? parseFloat(subItem['removalRate']) || null
            : null;

          // Add each entry to the result array
          result.push({
            Number: formData.Number || '', // Assuming Number is passed as part of form data
            Category1: category1 || '',
            Category2: category2 || '', // Ensure Category2 is empty if not selected
            Category3: category3 || '', // Ensure Category3 is empty if not selected
            Category4: '', // Based on your example, Category4 is not used
            Delete: 0, // Always 0, assuming no delete action is needed
            RemovalRate: removalRate, // Ensure RemovalRate is correctly handled
          });
        },
      );

      // Handle the case where there are no subcategories (empty '部分工種' list)
      if (item['部分工種'] && item['部分工種'].length === 0) {
        result.push({
          Number: formData.Number || '',
          Category1: category1 || '',
          Category2: '', // Default to empty string if no subcategory
          Category3: '', // Default to empty string if no subcategory
          Category4: '',
          Delete: 0,
          RemovalRate: item['removalRate']
            ? parseFloat(item['removalRate']) || null
            : null, // Handle RemovalRate here too
        });
      }
    });

    return result;
  };

  const sendData = async () => {
    try {
      // Get the form data (items)
      const formData = form.getFieldsValue();

      // Transform formData into the structure required by the backend
      const cleanedData = transformData(formData);

      // Prepare the request object
      const requestData = {
        Number: number, // Send the current 'number'
        CleanedData: cleanedData, // Send the transformed data
      };

      console.log('Data to be sent:', requestData);

      // Send data to the backend
      const response = await axios.post('/api/quotationtype/save', requestData);

      if (response.status === 200) {
        message.success('Data saved successfully!');
        setActiveTab('material'); // Move to the next tab if successful
      } else {
        message.error('Failed to save data.');
      }
    } catch (error) {
      message.error('Error saving data');
      console.error('Error:', error);
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
          className="w-1/2 overflow-auto pr-4"
          style={{ maxHeight: 'calc(60vh - 48px)' }}
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <div
                style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`工種 ${field.name + 1}`}
                    key={field.key}
                    extra={<CloseOutlined onClick={() => remove(field.name)} />}
                  >
                    <Form.Item
                      required
                      label="基本工種"
                      name={[field.name, '基本工種']}
                    >
                      <Select allowClear options={options} />
                    </Form.Item>

                    <Form.Item label="部分工種">
                      <Form.List name={[field.name, '部分工種']}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space
                                key={subField.key}
                                style={{ display: 'flex', width: '100%' }}
                              >
                                <Form.Item
                                  noStyle
                                  name={[subField.name, '部分工種1']}
                                  style={{ flex: 1 }}
                                >
                                  <Select
                                    allowClear
                                    placeholder="部分工種1"
                                    options={options}
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, '部分工種2']}
                                  style={{ flex: 1 }}
                                >
                                  <Select
                                    allowClear
                                    placeholder="部分工種2"
                                    options={options}
                                    style={{ width: '100%' }}
                                  />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => subOpt.remove(subField.name)}
                                  style={{ padding: '0 8px' }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + 部分工種追加
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + 工種追加
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        <div
          className="w-1/2 sticky top-0 overflow-auto pl-4"
          style={{ maxHeight: 'calc(60vh - 48px)' }}
        >
          <Form.Item noStyle shouldUpdate>
            {() => {
              try {
                return (
                  <Tree
                    treeData={renderTreeData(form.getFieldsValue())}
                    defaultExpandAll
                    selectable={false}
                  />
                );
              } catch (error) {
                console.error('Error rendering tree:', error);
                return <p type="danger">Failed to render tree</p>;
              }
            }}
          </Form.Item>
        </div>

        <FloatButton
          shape="square"
          type="primary"
          description="次へ"
          onClick={() => sendData()}
          className="mb-16 mr-10 animate-bounce"
        />
      </Form>
    </div>
  );
};

export default StepInput;
