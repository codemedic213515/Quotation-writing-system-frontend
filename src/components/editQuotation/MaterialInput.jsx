"use client"

import { useEffect, useState } from "react"
import { CloseOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons"
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
  Divider,
  Popconfirm,
  Typography,
} from "antd"
import axios from "axios"

const { Text } = Typography

const MaterialInput = ({ setActiveTab, number, setNumber }) => {
  const [form] = Form.useForm()
  const [quotationData, setQuotationData] = useState([])
  const [category1Option, setCategory1Option] = useState([])
  const [category2Option, setCategory2Option] = useState({})
  const [category3Option, setCategory3Option] = useState({})
  const [unitOption, setUnitOption] = useState([])
  const [categoryOption, setCategoryOption] = useState([])
  const [existingMaterials, setExistingMaterials] = useState({})
  const [editingMaterial, setEditingMaterial] = useState(null)
  const [loading, setLoading] = useState(false)

  // Redirect to basic tab if no number
  if (number == "") {
    setActiveTab("basic")
  }

  const fetchQuotationData = async () => {
    try {
      const response = await axios.get(`api/quotationtype?number=${number}`)
      setQuotationData(response.data)
console.log(response.data);

      // After fetching quotation types, fetch materials for each type
      response.data.forEach((type) => {
        fetchExistingMaterials(type.id)
      })
    } catch (error) {
      console.error("Error fetching quotation data:", error)
    }
  }

  const fetchExistingMaterials = async (typeId) => {
    try {
      setLoading(true)
      const response = await axios.get(`api/quotationmaterial/type/${typeId}`)
      setExistingMaterials((prev) => ({
        ...prev,
        [typeId]: response.data || [],
      }))
      
      
      setLoading(false)
    } catch (error) {
      console.error(`Error fetching materials for type ${typeId}:`, error)
      setLoading(false)
    }
  }

  const fetchUnitData = async () => {
    try {
      const response = await axios.get("api/unit")
      const unitData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.name,
        }))
      setUnitOption(unitData)
    } catch (error) {
      console.error("Error fetching Unit data:", error)
    }
  }

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get("api/abmaterial")
      const categoryData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.categoryName,
        }))
      setCategoryOption(categoryData)
    } catch (error) {
      console.error("Error fetching Unit data:", error)
    }
  }

  const fetchCategory1 = async () => {
    try {
      const response = await axios.get("api/category1")
      const transformedData = response.data
        .filter((item) => !item.delete)
        .map((item) => ({
          id: item.id,
          value: item.name,
        }))
      setCategory1Option(transformedData)
    } catch (error) {
      console.error("Error fetching category1:", error)
    }
  }

  const fetchCategory2 = async (category1Id, index) => {
    try {
      const response = await axios.get(`api/category2?category1=${category1Id}`)
      setCategory2Option((prev) => ({ ...prev, [index]: response.data }))
    } catch (error) {
      console.error("Error fetching category2:", error)
    }
  }

  const fetchCategory3 = async (category1Id, category2Id, index) => {
    try {
      const response = await axios.get(`api/category3?category1=${category1Id}&category2=${category2Id}`)
      setCategory3Option((prev) => ({ ...prev, [index]: response.data }))
    } catch (error) {
      console.error("Error fetching category3:", error)
    }
  }

  const fetchMaterials = async (category1Id, category2Id, category3Id, fieldKey, cardId) => {
    try {
      const response = await axios.get(
        `api/material?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
      )

      const materialDetails = response.data[0] // Assuming the response contains one material

      if (materialDetails) {
        // Get the current form state for the card
        const current = form.getFieldValue(`${cardId}`) || {}

        // Update the specific material field with fetched data
        form.setFieldsValue({
          [`${cardId}`]: {
            ...current,
            [fieldKey]: {
              ...current[fieldKey],
              quantity: "",
              unit: materialDetails.unit || "",
              externalCos: materialDetails.externalCos || "",
              stepRate: materialDetails.stepRateA || "",
              divide: materialDetails.divide || "",
              categoryNam: materialDetails.categoryNam || "",
            },
          },
        })
      }
    } catch (error) {
      console.error("Error fetching materials:", error)
    }
  }

  const handleCategory1Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {}
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
    })
    fetchCategory2(value.split("*")[1], `${cardId}-${fieldKey}`)
  }

  const handleCategory2Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {}
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
    })
    fetchCategory3(current[fieldKey]?.category1.split("*")[1], value.split("*")[1], `${cardId}-${fieldKey}`)
  }

  const handleCategory3Change = (value, fieldKey, cardId) => {
    const current = form.getFieldValue(`${cardId}`) || {}
    form.setFieldsValue({
      [`${cardId}`]: {
        ...current,
        [fieldKey]: {
          ...current[fieldKey],
          category3: value,
          category4: undefined,
        },
      },
    })
    const category1Id = current[fieldKey]?.category1.split("*")[1]
    const category2Id = current[fieldKey]?.category2.split("*")[1]

    fetchMaterials(category1Id, category2Id, value.split("*")[1], fieldKey, cardId)
    console.log(current)
  }

  // Edit existing material
  const startEditing = (material, typeId) => {
    setEditingMaterial({
      id: material.id,
      typeId: typeId,
      data: {
        category1: `${material.category1}*${material.category1Id || ""}`,
        category2: `${material.category2}*${material.category2Id || ""}`,
        category3: `${material.category3}*${material.category3Id || ""}`,
        quantity: material.quantity,
        unit: material.unit,
        externalCos: material.price,
        stepRate: material.stepRate,
        divide: material.divide,
        categoryNam: material.category,
      },
    })

    // Fetch category options for the editing material
    if (material.category1Id) {
      fetchCategory2(material.category1Id, `edit-${material.id}`)

      if (material.category2Id) {
        fetchCategory3(material.category1Id, material.category2Id, `edit-${material.id}`)
      }
    }
  }

  const cancelEditing = () => {
    setEditingMaterial(null)
  }

  const saveEditedMaterial = async () => {
    try {
      if (!editingMaterial) return

      const { id, typeId, data } = editingMaterial

      const transformedData = {
        Id: id,
        TypeId: typeId,
        Category1: data.category1.split("*")[0],
        Category2: data.category2.split("*")[0],
        Category3: data.category3.split("*")[0],
        Category4: "",
        Quantity: data.quantity || "",
        Unit: data.unit || "",
        Price: data.externalCos?.toString() || "",
        StepRate: data.stepRate || "",
        Divide: data.divide || "",
        Category: data.categoryNam || "",
        Delete: false,
      }

      await axios.put(`/api/quotationmaterial/${id}`, transformedData)

      message.success("Material updated successfully!")
      setEditingMaterial(null)

      // Refresh the materials list
      fetchExistingMaterials(typeId)
    } catch (error) {
      console.error("Error updating material:", error)
      message.error("Failed to update material")
    }
  }

  // Delete existing material
  const deleteMaterial = async (materialId, typeId) => {
    try {
      await axios.delete(`/api/quotationmaterial/${materialId}`)
      message.success("Material deleted successfully!")

      // Refresh the materials list
      fetchExistingMaterials(typeId)
    } catch (error) {
      console.error("Error deleting material:", error)
      message.error("Failed to delete material")
    }
  }

  const transformData = (data) => {
    const result = []
    Object.keys(data).forEach((typeId) => {
      data[typeId].forEach((material) => {
        result.push({
          TypeId: Number.parseInt(typeId), // Matches backend field name
          Category1: material.category1.split("*")[0].toString(),
          Category2: material.category2.split("*")[0].toString(),
          Category3: material.category3.split("*")[0].toString(),
          Category4: material.category4 || "", // Ensure this is present
          Quantity: material.quantity || "",
          Unit: material.unit || "",
          Price: material.externalCos.toString(),
          StepRate: material.stepRate || "",
          Divide: material.divide || "",
          Category: material.categoryNam || "",
          Delete: false,
        })
      })
    })
    return result
  }

  const handleSubmit = async () => {
    try {
      const formValues = form.getFieldsValue() // Raw data from the form
      const transformedData = transformData(formValues) // Transform data into required format

      console.log("Transformed Data:", transformedData)

      const response = await axios.post("/api/quotationmaterial", transformedData)
      if (response.status !== 200) {
        throw new Error(`Failed to save data`)
      }
      setNumber("")
      message.success("All data saved successfully!")

      // Reset form after successful save
      form.resetFields()
    } catch (error) {
      console.error("Error saving data:", error)
      message.error("Error saving data")
    }
  }

  useEffect(() => {
    fetchQuotationData()
    fetchCategory1()
    fetchUnitData()
    fetchCategoryData()
  }, [])

  // Update editing material form data
  const updateEditingMaterial = (field, value) => {
    if (!editingMaterial) return

    setEditingMaterial({
      ...editingMaterial,
      data: {
        ...editingMaterial.data,
        [field]: value,
      },
    })

    // Handle category changes
    if (field === "category1") {
      const category1Id = value.split("*")[1]
      fetchCategory2(category1Id, `edit-${editingMaterial.id}`)

      setEditingMaterial((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          category1: value,
          category2: undefined,
          category3: undefined,
        },
      }))
    } else if (field === "category2") {
      const category1Id = editingMaterial.data.category1.split("*")[1]
      const category2Id = value.split("*")[1]
      fetchCategory3(category1Id, category2Id, `edit-${editingMaterial.id}`)

      setEditingMaterial((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          category2: value,
          category3: undefined,
        },
      }))
    } else if (field === "category3") {
      const category1Id = editingMaterial.data.category1.split("*")[1]
      const category2Id = editingMaterial.data.category2.split("*")[1]
      const category3Id = value.split("*")[1]

      // Fetch material details based on categories
      fetchMaterialDetails(category1Id, category2Id, category3Id)
    }
  }

  const fetchMaterialDetails = async (category1Id, category2Id, category3Id) => {
    try {
      const response = await axios.get(
        `api/material?category1=${category1Id}&category2=${category2Id}&category3=${category3Id}`,
      )

      const materialDetails = response.data[0]

      if (materialDetails && editingMaterial) {
        setEditingMaterial((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            unit: materialDetails.unit || prev.data.unit,
            externalCos: materialDetails.externalCos || prev.data.externalCos,
            stepRate: materialDetails.stepRateA || prev.data.stepRate,
            divide: materialDetails.divide || prev.data.divide,
            categoryNam: materialDetails.categoryNam || prev.data.categoryNam,
          },
        }))
      }
    } catch (error) {
      console.error("Error fetching material details:", error)
    }
  }

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-hidden font-bold flex">
      <Form form={form} name="dynamic_form_complex" className="flex justify-between gap-4 w-full">
        <div className="w-full overflow-auto pr-4" style={{ maxHeight: "calc(60vh - 48px)" }}>
          {quotationData.map((item) => (
            <Card
              key={item.id}
              className="mb-4 border-gray-400"
              size="small"
              title={`${item.category1} - ${item.category2} - ${item.category3} - ${item.category4}`}
            >
              {/* Existing Materials Section */}
              {existingMaterials[item.id] && existingMaterials[item.id].length > 0 && (
                <>
                  <div className="mb-4">
                    <Text strong>Existing Materials</Text>
                    <Divider className="my-2" />

                    {/* Column Headers */}
                    <div className="flex items-center mb-2 font-bold text-sm bg-gray-100 p-2 rounded">
                      <div className="flex flex-1 space-x-2">
                        <div style={{ width: 100 }}>品名</div>
                        <div style={{ width: 100 }}>名称</div>
                        <div style={{ width: 100 }}>規格</div>
                        <div style={{ width: 60 }}>数量</div>
                        <div style={{ width: 60 }}>単位</div>
                        <div style={{ width: 80 }}>単価</div>
                        <div style={{ width: 60 }}>歩掛</div>
                        <div style={{ width: 80 }}>支給区分</div>
                        <div style={{ width: 100 }}>分類名</div>
                      </div>
                      <div style={{ width: 90 }}>操作</div>
                    </div>

                    {/* Only show materials that match this card's typeId */}
                    {existingMaterials[item.id].map((material) => (
                      <div key={material.id} className="p-2 border border-gray-200 rounded mb-2">
                        {editingMaterial && editingMaterial.id === material.id ? (
                          // Editing form
                          <Space align="baseline" className="w-full flex-wrap">
                            <Select
                              allowClear
                              placeholder="品名"
                              value={editingMaterial.data.category1}
                              onChange={(value) => updateEditingMaterial("category1", value)}
                              popupMatchSelectWidth={false}
                              style={{ width: 120 }}
                              options={category1Option.map((aa) => ({
                                label: aa.value,
                                value: aa.value + "*" + aa.id,
                              }))}
                            />

                            <Select
                              allowClear
                              placeholder="名称"
                              value={editingMaterial.data.category2}
                              onChange={(value) => updateEditingMaterial("category2", value)}
                              popupMatchSelectWidth={false}
                              style={{ width: 120 }}
                              options={category2Option[`edit-${material.id}`]?.map((aa) => ({
                                label: aa.name,
                                value: aa.name + "*" + aa.category2,
                              }))}
                            />

                            <Select
                              allowClear
                              placeholder="規格"
                              value={editingMaterial.data.category3}
                              onChange={(value) => updateEditingMaterial("category3", value)}
                              popupMatchSelectWidth={false}
                              style={{ width: 120 }}
                              options={category3Option[`edit-${material.id}`]?.map((aa) => ({
                                label: aa.name,
                                value: aa.name + "*" + aa.category3,
                              }))}
                            />

                            <Input
                              placeholder="数量"
                              value={editingMaterial.data.quantity}
                              onChange={(e) => updateEditingMaterial("quantity", e.target.value)}
                              style={{ width: 80 }}
                            />

                            <Select
                              placeholder="単位"
                              value={editingMaterial.data.unit}
                              onChange={(value) => updateEditingMaterial("unit", value)}
                              options={unitOption}
                              popupMatchSelectWidth={false}
                              style={{ width: 80 }}
                            />

                            <InputNumber
                              placeholder="単価"
                              value={editingMaterial.data.externalCos}
                              onChange={(value) => updateEditingMaterial("externalCos", value)}
                              style={{ width: 100 }}
                            />

                            <Input
                              placeholder="歩掛"
                              value={editingMaterial.data.stepRate}
                              onChange={(e) => updateEditingMaterial("stepRate", e.target.value)}
                              style={{ width: 80 }}
                            />

                            <Input
                              placeholder="支給区分"
                              value={editingMaterial.data.divide}
                              onChange={(e) => updateEditingMaterial("divide", e.target.value)}
                              style={{ width: 100 }}
                            />

                            <Select
                              placeholder="分類名"
                              value={editingMaterial.data.categoryNam}
                              onChange={(value) => updateEditingMaterial("categoryNam", value)}
                              options={categoryOption}
                              popupMatchSelectWidth={false}
                              style={{ width: 120 }}
                            />

                            <Button type="primary" icon={<SaveOutlined />} onClick={saveEditedMaterial} size="small" />

                            <Button onClick={cancelEditing} size="small">
                              Cancel
                            </Button>
                          </Space>
                        ) : (
                          // Display mode - single row format with fixed widths
                          <div className="flex items-center justify-between">
                            <div className="flex flex-1">
                              <div style={{ width: 100 }}>{material.category1}</div>
                              <div style={{ width: 100 }}>{material.category2}</div>
                              <div style={{ width: 100 }}>{material.category3}</div>
                              <div style={{ width: 60 }}>{material.quantity}</div>
                              <div style={{ width: 60 }}>{material.unit}</div>
                              <div style={{ width: 80 }}>¥{material.price}</div>
                              <div style={{ width: 60 }}>{material.stepRate}</div>
                              <div style={{ width: 80 }}>{material.divide}</div>
                              <div style={{ width: 100 }}>{material.category}</div>
                            </div>
                            <div className="flex gap-2" style={{ width: 90 }}>
                              <Button
                                type="primary"
                                icon={<EditOutlined />}
                                size="small"
                                onClick={() => startEditing(material, item.id)}
                              />
                              <Popconfirm
                                title="Delete this material?"
                                description="Are you sure you want to delete this material?"
                                onConfirm={() => deleteMaterial(material.id, item.id)}
                                okText="Yes"
                                cancelText="No"
                              >
                                <Button danger icon={<DeleteOutlined />} size="small" />
                              </Popconfirm>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Divider className="my-2">追加材料</Divider>
                </>
              )}

              {/* Add New Materials Form */}
              <Form.List name={`${item.id}`}>
                {(fields, { add, remove }) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 16,
                    }}
                  >
                    {fields.map((field) => (
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          name={[field.name, "category1"]}
                          rules={[{ required: true, message: "Select category 1" }]}
                        >
                          <Select
                            allowClear
                            placeholder="品名"
                            onSelect={(value) => handleCategory1Change(value, field.key, item.id)}
                            popupMatchSelectWidth={false}
                            options={category1Option.map((aa) => ({
                              label: aa.value,
                              value: aa.value + "*" + aa.id,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "category2"]}
                          rules={[{ required: true, message: "Select category 2" }]}
                        >
                          <Select
                            allowClear
                            placeholder="名称"
                            onSelect={(value) => handleCategory2Change(value, field.key, item.id)}
                            popupMatchSelectWidth={false}
                            options={category2Option[`${item.id}-${field.key}`]?.map((aa) => ({
                              label: aa.name,
                              value: aa.name + "*" + aa.category2,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item
                          name={[field.name, "category3"]}
                          rules={[{ required: true, message: "Select category 3" }]}
                        >
                          <Select
                            allowClear
                            placeholder="規格"
                            onSelect={(value) => handleCategory3Change(value, field.key, item.id)}
                            popupMatchSelectWidth={false}
                            options={category3Option[`${item.id}-${field.key}`]?.map((aa) => ({
                              label: aa.name,
                              value: aa.name + "*" + aa.category3,
                            }))}
                          />
                        </Form.Item>

                        <Form.Item name={[field.name, "quantity"]}>
                          <Input placeholder="数量" />
                        </Form.Item>

                        <Form.Item name={[field.name, "unit"]}>
                          <Select placeholder="単位" options={unitOption} popupMatchSelectWidth={false} />
                        </Form.Item>

                        <Form.Item name={[field.name, "externalCos"]}>
                          <InputNumber placeholder="単価" />
                        </Form.Item>

                        <Form.Item name={[field.name, "stepRate"]}>
                          <Input placeholder="歩掛" />
                        </Form.Item>

                        <Form.Item name={[field.name, "divide"]}>
                          <Input placeholder="支給区分" />
                        </Form.Item>

                        <Form.Item name={[field.name, "categoryNam"]}>
                          <Select popupMatchSelectWidth={false} placeholder="分類名" options={categoryOption} />
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
        onClick={handleSubmit}
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  )
}

export default MaterialInput
