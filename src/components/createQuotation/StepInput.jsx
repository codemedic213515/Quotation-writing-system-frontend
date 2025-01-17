import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Space,
  Typography,
  Tree,
  Select,
  FloatButton,
} from 'antd';

const { Text } = Typography;

const StepInput = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const renderTreeData = (data) => {
    if (!data || !data.items) return [];

    return data.items.map((item, itemIndex) => ({
      title: `基本工種 ${itemIndex + 1}: ${item?.['基本工種'] || '未設定'}`,
      key: `item-${itemIndex}-base`,
      children: (item?.['部分工種'] || []).map((subItem, subIndex) => ({
        title: `部分工種1: ${subItem?.['部分工種1'] || '未設定'}, 部分工種2: ${
          subItem?.['部分工種2'] || '未設定'
        }`,
        key: `item-${itemIndex}-part-${subIndex}`,
      })),
    }));
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-hidden font-bold flex">
      <Form
        form={form}
        name="dynamic_form_complex"
        initialValues={{
          items: [
            {
              基本工種: 'aa',
              部分工種: [{ 部分工種1: 'bb', 部分工種2: 'cc' }],
            },
          ],
        }}
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
                    <Form.Item label="基本工種" name={[field.name, '基本工種']}>
                      <Select allowClear />
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
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, '部分工種1']}
                                >
                                  <Select allowClear placeholder="部分工種1" />
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, '部分工種2']}
                                >
                                  <Select allowClear placeholder="部分工種2" />
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => subOpt.remove(subField.name)}
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
          className="mb-16 mr-10 animate-bounce"
        />
      </Form>
    </div>
  );
};

export default StepInput;
