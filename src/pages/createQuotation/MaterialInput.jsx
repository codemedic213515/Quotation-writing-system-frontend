import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Space, Select, FloatButton, Input } from 'antd';

const MaterialInput = () => {
  const [form] = Form.useForm();
  // const renderTreeData = (data) => {
  //   if (!data || !data.items) return [];

  //   return data.items.map((item, itemIndex) => ({
  //     title: `基本工種 ${itemIndex + 1}: ${item?.['基本工種'] || '未設定'}`,
  //     key: `item-${itemIndex}-base`,
  //     children: (item?.['部分工種'] || []).map((subItem, subIndex) => ({
  //       title: `部分工種1: ${subItem?.['部分工種1'] || '未設定'}, 部分工種2: ${
  //         subItem?.['部分工種2'] || '未設定'
  //       }`,
  //       key: `item-${itemIndex}-part-${subIndex}`,
  //     })),
  //   }));
  // };

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
          className="w-full overflow-auto pr-4"
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
                  >
                    <Form.Item label="部材入力">
                      <Form.List name={[field.name, '部材入力']}>
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
                                  <div className="flex flex-row items-center">
                                    <Select allowClear placeholder="品名" />
                                    <Select allowClear placeholder="名称" />
                                    <Select allowClear placeholder="規格" />
                                    {'  :  '}
                                    <Input allowClear placeholder="数量" />
                                    <Select allowClear placeholder="単位" />
                                    <Input allowClear placeholder="単価" />
                                    <Input allowClear placeholder="歩掛" />
                                    <Input allowClear placeholder="支給区分" />
                                    <Select allowClear placeholder="分類名" />
                                  </div>
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
                              + 部材入力追加
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
        </div>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="作成"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default MaterialInput;
