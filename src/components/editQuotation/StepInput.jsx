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
      if (!groupedData[item.category1]) {
        groupedData[item.category1] = {
          基本工種: item.category1,
          部分工種: [],
        };
      }

      const subItem = {};

      if (item.category2) {
        subItem['部分工種1'] = item.category2;
      }

      if (item.category3) {
        subItem['部分工種2'] = item.category3;
      }

      groupedData[item.category1].部分工種.push(subItem);
    });

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
        const result = initialFormData(data);
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
        removalRate: item?.siteMiscell || '',
      })),
    }));
  };

  const transformData = (formData) => {
    let result = [];

    formData.items.forEach((item) => {
      const category1 = item['基本工種'];
      (item['部分工種'] || [`'部分工種1':"", '部分工種2':""`]).forEach(
        (subItem) => {
          const category2 = subItem['部分工種1'] || '';
          const category3 = subItem['部分工種2'] || '';

          const removalRate = subItem['removalRate']
            ? parseFloat(subItem['removalRate']) || null
            : null;

          result.push({
            Number: formData.Number || '',
            Category1: category1 || '',
            Category2: category2 || '',
            Category3: category3 || '',
            Category4: '',
            Delete: 0,
            RemovalRate: removalRate,
          });
        },
      );

      if (item['部分工種'] && item['部分工種'].length === 0) {
        result.push({
          Number: formData.Number || '',
          Category1: category1 || '',
          Category2: '',
          Category3: '',
          Category4: '',
          Delete: 0,
          RemovalRate: item['removalRate']
            ? parseFloat(item['removalRate']) || null
            : null,
        });
      }
    });

    return result;
  };

  const sendData = async () => {
    try {
      const formData = form.getFieldsValue();

      const cleanedData = transformData(formData);

      const requestData = {
        Number: number,
        CleanedData: cleanedData,
      };
      const response = await axios.post('/api/quotationtype/save', requestData);

      if (response.status === 200) {
        message.success('Data saved successfully!');
        setActiveTab('material');
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
                      <Select allowClear options={options} popupMatchSelectWidth={false}/>
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
                                    popupMatchSelectWidth={false}
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
