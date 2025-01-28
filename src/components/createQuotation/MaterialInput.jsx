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
  const [unitOption, setUnitOption] = useState([]);
  const [materialData, setMaterialData] = useState({});

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

  const fetchMaterials = async (
    category1Id,
    category2Id,
    category3Id,
    index,
  ) => {
    try {
      const response = await axios.get(
        `api/material?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
      );
      setMaterialData((prev) => ({ ...prev, [index]: response.data[0] }));
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleCategory1Change = (value, index) => {
    const current = form.getFieldValue(`${index}`) || {};
    form.setFieldsValue({
      [`${index}`]: {
        ...current,
        category1: value,
        category2: undefined,
        category3: undefined,
        // category4: undefined,
      },
    });
    fetchCategory2(value, index);
  };

  const handleCategory2Change = (value, index) => {
    const current = form.getFieldValue(`${index}`) || {};
    form.setFieldsValue({
      [`${index}`]: {
        ...current,
        category2: value,
        category3: undefined,
        // category4: undefined,
      },
    });
    fetchCategory3(current[0].category1, value, index);
  };

  const handleCategory3Change = (value, index) => {
    const current = form.getFieldValue(`${index}`) || {};
    form.setFieldsValue({
      [`${index}`]: {
        ...current,
        category3: value,
        // category4: undefined,
      },
    });
    fetchMaterials(
      current[0].category1,
      current[0].category2,
      current[0].category3,
      index,
    );
    fetchCategory4(current[0].category1, current[0].category2, value, index);
  };

  const handleCategory4Change = (value, index) => {
    const current = form.getFieldValue(`${index}`) || {};
    form.setFieldsValue({
      [`${index}`]: {
        ...current,
        category4: value,
      },
    });
  };

  useEffect(() => {
    fetchQuotationData();
    fetchCategory1();
    fetchUnitData();
  }, []);

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    const allCardData = [];

    Object.keys(formValues).forEach((key) => {
      const card = formValues[key];

      const selectedCategories = {
        category1: card.category1,
        category2: card.category2,
        category3: card.category3,
        // category4: card.category4,
      };

      const materialData = {
        typeId: number,
        category1: card.category1,
        category2: card.category2,
        category3: card.category3,
        // category4: card.category4,
        quantity: card.quantity,
        unit: card.unit,
        price: card.unitPrice,
        stepRate: card.stepRate,
        divide: card.divide,
        category: card.category,
      };

      allCardData.push({
        ...materialData,
        selectedCategories,
      });
    });

    console.log(formValues);
    console.log(quotationData);
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
                        <Form.Item name={[field.name, 'category1']} noStyle>
                          <Select
                            allowClear
                            placeholder="品名"
                            onSelect={(value) =>
                              handleCategory1Change(value, item.id)
                            }
                            options={category1Option.map((aa) => ({
                              label: aa.value,
                              value: aa.id,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category2']} noStyle>
                          <Select
                            allowClear
                            placeholder="名称"
                            onSelect={(value) =>
                              handleCategory2Change(value, item.id)
                            }
                            options={category2Option[item.id]?.map((aa) => ({
                              label: aa.name,
                              value: aa.category2,
                            }))}
                            disabled={!category2Option[item.id]}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category3']} noStyle>
                          <Select
                            allowClear
                            placeholder="規格"
                            onSelect={(value) =>
                              handleCategory3Change(value, item.id)
                            }
                            options={category3Option[item.id]?.map((aa) => ({
                              label: aa.name,
                              value: aa.category3,
                            }))}
                            disabled={!category3Option[item.id]}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, 'category4']} noStyle>
                          <Select
                            allowClear
                            placeholder="規格"
                            onSelect={(value) =>
                              handleCategory4Change(value, item.id)
                            }
                            options={category4Option[item.id]?.map((aa) => ({
                              label: aa.name,
                              value: aa.category4,
                            }))}
                            disabled={!category4Option[item.id]}
                          />
                        </Form.Item>

                        <Input allowClear placeholder="数量" />
                        <Select
                          allowClear
                          placeholder="単位"
                          options={unitOption}
                        />
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
        onClick={handleSubmit}
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
};

export default MaterialInput;

// import React, { useEffect, useState } from 'react';
// import { CloseOutlined } from '@ant-design/icons';
// import {
//   Button,
//   Card,
//   Form,
//   Space,
//   Select,
//   FloatButton,
//   Input,
//   message,
// } from 'antd';
// import axios from 'axios';

// const MaterialInput = ({ number }) => {
//   const [form] = Form.useForm();
//   const [quotationData, setQuotationData] = useState([]);
//   const [category1Option, setCategory1Option] = useState([]);
//   const [category2Option, setCategory2Option] = useState({});
//   const [category3Option, setCategory3Option] = useState({});
//   const [category4Option, setCategory4Option] = useState({});
//   const [unitOption, setUnitOption] = useState([]);
//   const [materialData, setMaterialData] = useState({});

//   // Fetch quotationTypes based on number
//   const fetchQuotationData = async () => {
//     try {
//       const response = await axios.get(`api/quotationtype?number=${number}`);
//       setQuotationData(response.data);
//     } catch (error) {
//       console.error('Error fetching quotation data:', error);
//     }
//   };

//   const fetchUnitData = async () => {
//     try {
//       const response = await axios.get(`api/unit`);
//       const unitData = response.data
//         .filter((item) => !item.delete)
//         .map((item) => ({
//           id: item.id,
//           value: item.name,
//         }));
//       setUnitOption(unitData);
//     } catch (error) {
//       console.error('Error fetching Unit data:', error);
//     }
//   };

//   // Fetch category1 options
//   const fetchCategory1 = async () => {
//     try {
//       const response = await axios.get('api/category1');
//       const transformedData = response.data
//         .filter((item) => !item.delete)
//         .map((item) => ({
//           id: item.id,
//           value: item.name,
//         }));
//       setCategory1Option(transformedData);
//     } catch (error) {
//       console.error('Error fetching category1:', error);
//     }
//   };

//   // Fetch category2 options based on category1Id
//   const fetchCategory2 = async (category1Id, index) => {
//     try {
//       const response = await axios.get(
//         `api/category2?category1=${category1Id}`,
//       );
//       setCategory2Option((prev) => ({ ...prev, [index]: response.data }));
//     } catch (error) {
//       console.error('Error fetching category2:', error);
//     }
//   };

//   // Fetch category3 options based on category1Id and category2Id
//   const fetchCategory3 = async (category1Id, category2Id, index) => {
//     try {
//       const response = await axios.get(
//         `api/category3?category1=${category1Id}&category2=${category2Id}`,
//       );
//       setCategory3Option((prev) => ({ ...prev, [index]: response.data }));
//     } catch (error) {
//       console.error('Error fetching category3:', error);
//     }
//   };

//   // Fetch category4 options based on category1Id, category2Id, and category3Id
//   const fetchCategory4 = async (
//     category1Id,
//     category2Id,
//     category3Id,
//     index,
//   ) => {
//     try {
//       const response = await axios.get(
//         `api/category4?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
//       );
//       setCategory4Option((prev) => ({ ...prev, [index]: response.data }));
//     } catch (error) {
//       console.error('Error fetching category4:', error);
//     }
//   };

//   // Fetch materials based on all selected category ids
//   const fetchMaterials = async (
//     category1Id,
//     category2Id,
//     category3Id,
//     index,
//   ) => {
//     try {
//       const response = await axios.get(
//         `api/material?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
//       );
//       setMaterialData((prev) => ({ ...prev, [index]: response.data[0] }));
//     } catch (error) {
//       console.error('Error fetching materials:', error);
//     }
//   };

//   // Handle category1 select
//   const handleCategory1Change = (value, index) => {
//     const current = form.getFieldValue(`${index}`) || {};
//     form.setFieldsValue({
//       [`${index}`]: {
//         ...current,
//         category1: value,
//         category2: undefined, // Reset category2, category3, category4 when category1 changes
//         category3: undefined,
//         category4: undefined,
//       },
//     });
//     fetchCategory2(value, index);
//   };

//   // Handle category2 select
//   const handleCategory2Change = (value, index) => {
//     const current = form.getFieldValue(`${index}`) || {};
//     form.setFieldsValue({
//       [`${index}`]: {
//         ...current,
//         category2: value,
//         category3: undefined, // Reset category3, category4 when category2 changes
//         category4: undefined,
//       },
//     });
//     fetchCategory3(current[0].category1, value, index);
//   };

//   // Handle category3 select
//   const handleCategory3Change = (value, index) => {
//     const current = form.getFieldValue(`${index}`) || {};
//     form.setFieldsValue({
//       [`${index}`]: {
//         ...current,
//         category3: value,
//         category4: undefined, // Reset category4 when category3 changes
//       },
//     });
//     fetchMaterials(
//       current[0].category1,
//       current[0].category2,
//       current[0].category3,
//       index,
//     );
//     fetchCategory4(current[0].category1, current[0].category2, value, index);
//   };

//   // Handle category4 select
//   const handleCategory4Change = (value, index) => {
//     const current = form.getFieldValue(`${index}`) || {};
//     form.setFieldsValue({
//       [`${index}`]: {
//         ...current,
//         category4: value,
//       },
//     });
//   };

//   useEffect(() => {
//     fetchQuotationData();
//     fetchCategory1();
//     fetchUnitData();
//   }, []);

//   const handleSubmit = async () => {
//     // try {
//     const formValues = form.getFieldsValue();
//     const allCardData = [];

//     // Iterate through each material card's form values
//     Object.keys(formValues).forEach((key) => {
//       const card = formValues[key];

//       // Create the selected categories object
//       const selectedCategories = {
//         category1: card.category1,
//         category2: card.category2,
//         category3: card.category3,
//         category4: card.category4,
//       };

//       // Create the material data object
//       const materialData = {
//         typeId: number, // `number` is the TypeId passed from the parent
//         category1: card.category1,
//         category2: card.category2,
//         category3: card.category3,
//         category4: card.category4,
//         quantity: card.quantity,
//         unit: card.unit,
//         price: card.unitPrice,
//         stepRate: card.stepRate,
//         divide: card.divide,
//         category: card.category,
//       };

//       // Push each material data entry with selected categories and TypeId
//       allCardData.push({
//         ...materialData, // Include the material-specific data
//         selectedCategories, // Add the selected categories to the material
//       });
//     });

//     console.log(formValues); // For debugging
//     console.log(quotationData);
//     //   // Send the data to the server via POST request
//     //   const response = await axios.post('/api/save-materials', {
//     //     data: allCardData,
//     //   });

//     //   // Check for successful response
//     //   if (response.status === 200) {
//     //     message.success('Data saved successfully!');
//     //   } else {
//     //     message.error('Failed to save data');
//     //   }
//     // } catch (error) {
//     //   console.error('Error saving data:', error);
//     //   message.error('Error saving data');
//     // }
//   };

//   return (
//     <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-hidden font-bold flex">
//       <Form
//         form={form}
//         name="dynamic_form_complex"
//         className="flex justify-between gap-4 w-full"
//       >
//         <div
//           className="w-full overflow-auto pr-4"
//           style={{ maxHeight: 'calc(60vh - 48px)' }}
//         >
//           {quotationData.map((item) => (
//             <Card
//               key={item.id}
//               className="mb-4 border-gray-400"
//               size="small"
//               title={`${item.category1} - ${item.category2} - ${item.category3} - ${item.category4}`}
//             >
//               <Form.List name={`${item.id}`}>
//                 {(fields, { add, remove }) => (
//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'column',
//                       rowGap: 16,
//                     }}
//                   >
//                     {fields.map((field) => (
//                       <Space key={field.key} align="baseline">
//                         <Form.Item name={[field.name, 'category1']} noStyle>
//                           <Select
//                             allowClear
//                             placeholder="品名"
//                             onSelect={(value) =>
//                               handleCategory1Change(value, item.id)
//                             }
//                             options={category1Option.map((aa) => ({
//                               label: aa.value,
//                               value: aa.id,
//                             }))}
//                           />
//                         </Form.Item>

//                         <Form.Item name={[field.name, 'category2']} noStyle>
//                           <Select
//                             allowClear
//                             placeholder="名称"
//                             onSelect={(value) =>
//                               handleCategory2Change(value, item.id)
//                             }
//                             options={category2Option[item.id]?.map((aa) => ({
//                               label: aa.name,
//                               value: aa.category2,
//                             }))}
//                             disabled={!category2Option[item.id]}
//                           />
//                         </Form.Item>

//                         <Form.Item name={[field.name, 'category3']} noStyle>
//                           <Select
//                             allowClear
//                             placeholder="規格"
//                             onSelect={(value) =>
//                               handleCategory3Change(value, item.id)
//                             }
//                             options={category3Option[item.id]?.map((aa) => ({
//                               label: aa.name,
//                               value: aa.category3,
//                             }))}
//                             disabled={!category3Option[item.id]}
//                           />
//                         </Form.Item>

//                         <Form.Item name={[field.name, 'category4']} noStyle>
//                           <Select
//                             allowClear
//                             placeholder="規格"
//                             onSelect={(value) =>
//                               handleCategory4Change(value, item.id)
//                             }
//                             options={category4Option[item.id]?.map((aa) => ({
//                               label: aa.name,
//                               value: aa.category4,
//                             }))}
//                             disabled={!category4Option[item.id]}
//                           />
//                         </Form.Item>

//                         <Input allowClear placeholder="数量" />
//                         <Select
//                           allowClear
//                           value={materialData.unit}
//                           placeholder="単位"
//                           options={unitOption}
//                         />
//                         <Input
//                           allowClear
//                           placeholder="単価"
//                           value={materialData.externalCos}
//                         />
//                         <Input
//                           allowClear
//                           placeholder="歩掛"
//                           value={materialData.stepRateB}
//                         />
//                         <Input allowClear placeholder="支給区分" />
//                         <Select
//                           allowClear
//                           placeholder="分類名"
//                           value={materialData.categoryNam}
//                         />

//                         <CloseOutlined onClick={() => remove(field.name)} />
//                       </Space>
//                     ))}
//                     <Button type="dashed" onClick={() => add()} block>
//                       + 部材入力追加
//                     </Button>
//                   </div>
//                 )}
//               </Form.List>
//             </Card>
//           ))}
//         </div>
//       </Form>
//       <FloatButton
//         shape="square"
//         type="primary"
//         description="作成"
//         onClick={handleSubmit}
//         className="mb-16 mr-10 animate-bounce"
//       />
//     </div>
//   );
// };

// export default MaterialInput;
