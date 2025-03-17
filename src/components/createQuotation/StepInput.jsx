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
      message.error('建設データの取得に失敗しました');
    }
  };

  useEffect(() => {
    fetchConstruction();
  }, []);

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
  const transformData = () => {
    const treeData = renderTreeData(form.getFieldsValue());
    let result = [];
    const code = number;

    treeData.forEach((item) => {
      const category1 = item.title.split(':')[1].trim(); // Extract Category1

      item.children.forEach((subItem) => {
        const [category2, category3] = subItem.title
          .split(',')
          .map((part) => part.split(':')[1]?.trim() || '');
        const removalRate = subItem.removalRate || ''; // Capture removalRate from subItem
        result.push({
          Number: code || '',
          Category1: category1,
          Category2: category2 || '',
          Category3: category3 || '',
          Category4: '', // As per your example, no Category4 specified
          Delete: 0,
          RemovalRate: removalRate, // Assign the removalRate from the sub-category
        });
      });

      if (item.children.length === 0) {
        result.push({
          Number: code || '',
          Category1: category1,
          Category2: '',
          Category3: '',
          Category4: '',
          Delete: 0,
          RemovalRate: item.removalRate || '', // Use item.removalRate or a default value
        });
      }
    });

    return result;
  };
  const sendData = async () => {
    try {
      const transformedData = transformData(); // Assume this returns an array of QuotationType

      let allSuccessful = true; // Flag to track if all requests were successful

      for (let i = 0; i < transformedData.length; i++) {
        const dataToSend = {
          Number: transformedData[i].Number || '',
          Category1: transformedData[i].Category1 || '',
          Category2: transformedData[i].Category2 || '',
          Category3: transformedData[i].Category3 || '',
          Category4: transformedData[i].Category4 || '',
          Delete: transformedData[i].Delete === 0, // Convert Delete to boolean
          RemovalRate: transformedData[i].RemovalRate || 0,
        };

        try {
          // Send each item one by one
          const response = await axios.post('/api/quotationtype', dataToSend);

          if (response.status === 200) {
            console.log(`Create Type Success for item ${i + 1}`);
          } else {
            console.error(`Create type failed for item ${i + 1}`);
            message.error(`項目のタイプの作成に失敗しました ${i + 1}`);
            allSuccessful = false; // Set flag to false if any request fails
          }
        } catch (error) {
          console.error(`Error creating type for item ${i + 1}:`, error);
          message.error(`項目のタイプの作成に失敗しました ${i + 1}`);
          allSuccessful = false;
        }
      }

      // Show appropriate message based on request status
      if (allSuccessful) {
        message.success('すべての型が正常に作成されました');
        setActiveTab('material'); // Move to the next tab if successful
      } else {
        message.warning('一部のタイプの作成に失敗しました');
      }
    } catch (error) {
      message.error('タイプ作成プロセスに失敗しました');
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
                      
                      <Select allowClear popupMatchSelectWidth={false} options={options} />
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
                                    popupMatchSelectWidth={false}
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
                                    popupMatchSelectWidth={false}
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
