import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Space,
  Select,
  FloatButton,
  Input,
  message,
} from 'antd';
import axios from 'axios';

const MaterialInput = ({ number }) => {
  const [form] = Form.useForm();
  const [quotationData, setQuotationData] = useState([]);
  const [category1Option, setCategory1Option] = useState([]);
  const [category2Option, setCategory2Option] = useState({});
  const [category3Option, setCategory3Option] = useState({});
  const [category4Option, setCategory4Option] = useState({});
  const [materialData, setMaterialData] = useState({});

  // Fetch quotationTypes based on number
  const fetchQuotationData = async () => {
    try {
      const response = await axios.get(`api/quotationtype?number=${number}`);
      setQuotationData(response.data);
    } catch (error) {
      console.error('Error fetching quotation data:', error);
    }
  };

  // Fetch category1 options
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

  // Fetch category2 options based on category1Id
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

  // Fetch category3 options based on category1Id and category2Id
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

  // Fetch category4 options based on category1Id, category2Id, and category3Id
  const fetchCategory4 = async (
    category1Id,
    category2Id,
    category3Id,
    index,
  ) => {
    try {
      const response = await axios.get(
        `api/category4?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
      );
      setCategory4Option((prev) => ({ ...prev, [index]: response.data }));
    } catch (error) {
      console.error('Error fetching category4:', error);
    }
  };

  // Fetch materials based on all selected category ids
  const fetchMaterials = async (
    category1Id,
    category2Id,
    category3Id,
    category4Id,
    index,
  ) => {
    try {
      const response = await axios.get(
        `api/materials?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}&category4=${category4Id}`,
      );
      setMaterialData((prev) => ({ ...prev, [index]: response.data }));
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  useEffect(() => {
    fetchQuotationData();
    fetchCategory1();
  }, []);

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
          {quotationData.map((item, index) => (
            <Card
              key={index}
              size="small"
              title={`${item.category1} - ${item.category2} - ${item.category3} - ${item.category4}`}
            >
              <Form.List name={`materials-${index}`}>
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
                        <Form.Item name={[field.name, 'category1']} noStyle>
                          <Select
                            allowClear
                            placeholder="品名"
                            onSelect={(value) => {
                              const currentValues =
                                form.getFieldValue(`materials-${index}`) || {};
                              form.setFieldsValue({
                                [`materials-${index}`]: {
                                  ...currentValues,
                                  category1: value,
                                },
                              });
                              fetchCategory2(value, index);
                            }}
                            options={category1Option.map((item) => ({
                              label: item.value,
                              value: item.id,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category2']} noStyle>
                          <Select
                            allowClear
                            placeholder="名称"
                            onSelect={(value) => {
                              const currentValues =
                                form.getFieldValue(`materials-${index}`) || {};
                              if (!currentValues.category1) {
                                message.error(
                                  'Category 1 must be selected first',
                                );
                                return;
                              }
                              form.setFieldsValue({
                                [`materials-${index}`]: {
                                  ...currentValues,
                                  category2: value,
                                },
                              });
                              fetchCategory3(
                                currentValues.category1,
                                value,
                                index,
                              );
                            }}
                            options={category2Option[index]?.map((item) => ({
                              label: item.name,
                              value: item.category2,
                            }))}
                            disabled={!category2Option[index]}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category3']} noStyle>
                          <Select
                            allowClear
                            placeholder="規格"
                            onSelect={(value) => {
                              const currentValues =
                                form.getFieldValue(`materials-${index}`) || {};
                              if (
                                !currentValues.category1 ||
                                !currentValues.category2
                              ) {
                                message.error(
                                  'Please select Category 1 and Category 2 first',
                                );
                                return;
                              }
                              form.setFieldsValue({
                                [`materials-${index}`]: {
                                  ...currentValues,
                                  category3: value,
                                },
                              });
                              fetchCategory4(
                                currentValues.category1,
                                currentValues.category2,
                                value,
                                index,
                              );
                            }}
                            options={category3Option[index]?.map((item) => ({
                              label: item.name,
                              value: item.category3,
                            }))}
                            disabled={!category3Option[index]}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category4']} noStyle>
                          <Select
                            allowClear
                            placeholder="規格"
                            onSelect={(value) => {
                              const currentValues =
                                form.getFieldValue(`materials-${index}`) || {};
                              if (
                                !currentValues.category1 ||
                                !currentValues.category2 ||
                                !currentValues.category3
                              ) {
                                message.error(
                                  'Please select all previous categories first',
                                );
                                return;
                              }
                              form.setFieldsValue({
                                [`materials-${index}`]: {
                                  ...currentValues,
                                  category4: value,
                                },
                              });
                              fetchMaterials(
                                currentValues.category1,
                                currentValues.category2,
                                currentValues.category3,
                                value,
                                index,
                              );
                            }}
                            options={category4Option[index]?.map((item) => ({
                              label: item.name,
                              value: item.category4,
                            }))}
                            disabled={!category4Option[index]}
                          />
                        </Form.Item>

                        <Input allowClear placeholder="数量" />
                        <Select allowClear placeholder="単位" />
                        <Input allowClear placeholder="単価" />
                        <Input allowClear placeholder="歩掛" />
                        <Input allowClear placeholder="支給区分" />
                        <Select allowClear placeholder="分類名" />

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
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default MaterialInput;

// import React, { useEffect, useState } from 'react';
// import { CloseOutlined } from '@ant-design/icons';
// import { Button, Card, Form, Space, Select, FloatButton, Input } from 'antd';
// import axios from 'axios';

// const MaterialInput = (number) => {
//   const [form] = Form.useForm();
//   const [category1Option, setCategory1Option] = useState([]);
//   const [cat1, setCat1] = useState('');
//   const [cat1Id, setCat1Id] = useState('');
//   const [category2Option, setCategory2Option] = useState([]);
//   const [cat2, setCat2] = useState('');
//   const [cat2Id, setCat2Id] = useState('');
//   const [category3Option, setCategory3Option] = useState([]);
//   const [cat3, setCat3] = useState('');
//   const [cat3Id, setCat3Id] = useState('');
//   const [category4Option, setCategory4Option] = useState([]);
//   const [cat4, setCat4] = useState('');
//   const [cat4Id, setCat4Id] = useState('');
//   const [productName, setProductName] = useState('');
//   const [name, setName] = useState('');
//   console.log(number);

//   const category1 = async () => {
//     const response = await axios.get('api/category1');
//     const transformedData = response.data
//       .filter((item) => !item.delete)
//       .map((item) => ({
//         id: item.id,
//         value: item.name,
//       }));
//     console.log(transformedData);
//     setCategory1Option(transformedData);
//   };

//   const category2 = async (category1Id) => {
//     console.log(category1Id);

//     const response = await axios.get(`api/category2?category1=${category1Id}`);
//     const transformedData = response.data
//       .filter((item) => !item.delete)
//       .map((item) => ({
//         id: item.category2,
//         value: item.name,
//       }));
//     console.log(transformedData);
//     setCategory2Option(transformedData);
//   };

//   const category3 = async (category2Id) => {
//     const response = await axios.get(
//       `api/category3/?category1=${category1Id}&category2=${category2Id}`,
//     );
//     const transformedData = response.data
//       .filter((item) => !item.delete)
//       .map((item) => ({
//         id: item.category3,
//         value: item.name,
//       }));
//     console.log(transformedData);
//     setCategory3Option(transformedData);
//   };

//   const category4 = async (category3Id) => {
//     const response = await axios.get(`api/category4/?category3=${category3Id}`);
//     const transformedData = response.data
//       .filter((item) => !item.delete)
//       .map((item) => ({
//         id: item.id,
//         value: item.name,
//       }));
//     console.log(transformedData);
//     setCategory4Option(transformedData);
//   };

//   useEffect(() => {
//     category1();
//   }, []);
//   return (
//     <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-hidden font-bold flex">
//       <Form
//         form={form}
//         name="dynamic_form_complex"
//         className="flex justify-between gap-4 w-full"
//         initialValues={{
//           items: [
//             {
//               基本工種: 'aa',
//               部分工種: [{ 部分工種1: 'bb', 部分工種2: 'cc' }],
//             },
//           ],
//         }}
//       >
//         <div
//           className="w-full overflow-auto pr-4"
//           style={{ maxHeight: 'calc(60vh - 48px)' }}
//         >
//           <Form.List name="items">
//             {(fields, { add, remove }) => (
//               <div
//                 style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
//               >
//                 {fields.map((field) => (
//                   <Card
//                     size="small"
//                     title={`工種 ${field.name + 1}`}
//                     key={field.key}
//                   >
//                     <Form.Item label="部材入力">
//                       <Form.List name={[field.name, '部材入力']}>
//                         {(subFields, subOpt) => (
//                           <div
//                             style={{
//                               display: 'flex',
//                               flexDirection: 'column',
//                               rowGap: 16,
//                             }}
//                           >
//                             {subFields.map((subField) => (
//                               <Space key={subField.key}>
//                                 <Form.Item
//                                   noStyle
//                                   name={[subField.name, '部分工種1']}
//                                 >
//                                   <div className="flex flex-row items-center">
//                                     <Select
//                                       allowClear
//                                       placeholder="品名"
//                                       onSelect={(e) => {
//                                         setCat1(e);
//                                         const selectedCategory =
//                                           category1Option.find(
//                                             (item) => item.value === e,
//                                           );
//                                         if (selectedCategory) {
//                                           category2(selectedCategory.id);
//                                         }
//                                       }}
//                                       options={category1Option}
//                                     />

//                                     <Select
//                                       allowClear
//                                       placeholder="名称"
//                                       onSelect={(e) => {
//                                         setCat2(e);
//                                         const selectedCategory =
//                                           category2Option.find(
//                                             (item) => item.value === e,
//                                           );
//                                         if (selectedCategory) {
//                                           category3(selectedCategory.id);
//                                         }
//                                       }}
//                                       options={category2Option}
//                                     />
//                                     <Select
//                                       allowClear
//                                       placeholder="規格"
//                                       onSelect={(e) => {
//                                         setCat3(e);
//                                         const selectedCategory =
//                                           category3Option.find(
//                                             (item) => item.value === e,
//                                           );
//                                         if (selectedCategory) {
//                                           category4(selectedCategory.id);
//                                         }
//                                       }}
//                                       options={category3Option}
//                                     />
//                                     <Select
//                                       allowClear
//                                       placeholder="規格"
//                                       onSelect={(e) => {
//                                         setCat4(e);
//                                       }}
//                                       options={category4Option}
//                                     />
//                                     {'  :  '}
//                                     <Input allowClear placeholder="数量" />
//                                     <Select allowClear placeholder="単位" />
//                                     <Input allowClear placeholder="単価" />
//                                     <Input allowClear placeholder="歩掛" />
//                                     <Input allowClear placeholder="支給区分" />
//                                     <Select allowClear placeholder="分類名" />
//                                   </div>
//                                 </Form.Item>
//                                 <CloseOutlined
//                                   onClick={() => subOpt.remove(subField.name)}
//                                 />
//                               </Space>
//                             ))}
//                             <Button
//                               type="dashed"
//                               onClick={() => subOpt.add()}
//                               block
//                             >
//                               + 部材入力追加
//                             </Button>
//                           </div>
//                         )}
//                       </Form.List>
//                     </Form.Item>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </Form.List>
//         </div>
//       </Form>
//       <FloatButton
//         shape="square"
//         type="primary"
//         description="作成"
//         className="mb-16 mr-10 animate-bounce"
//       />
//     </div>
//   );
// };

// export default MaterialInput;
