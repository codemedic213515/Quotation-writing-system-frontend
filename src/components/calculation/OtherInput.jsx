import React, { useState, useEffect } from 'react';
import {
  Form,
  InputNumber,
  Radio,
  FloatButton,
  Modal,
  notification,
} from 'antd';
import axios from 'axios';

export function OtherInput({ setActiveTab, number }) {
  const [formData, setFormData] = useState({
    pipeAccessoryRate: 0,
    pipeSupportRate: 0,
    cableRackAccessoryRate: 0,
    cableRackSupportRate: 0,
    racewayAccessoryRate: 0,
    racewaySupportRate: 0,
    cableAdditionalRate: 0,
    lightingAdditionalRate: 0,
    panelAdditionalRate: 0,
    performAuxiliaryWorks: true,
    auxiliaryWorkRate: 0,
    overheadRate: 0,
    costRate: 0,
  });

  useEffect(() => {
    if (number) {
      axios
        .get(`/api/calculation/${number}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          notification.error({
            message: 'Error fetching data',
            description:
              error.response?.data?.message || 'Something went wrong',
          });
        });
    } else {
      setActiveTab('select');
    }
  }, [number]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .put(`/api/calculation/${number}`, formData)
      .then(() => {
        notification.success({
          message: 'Data updated successfully',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Error updating data',
          description: error.response?.data?.message || 'Something went wrong',
        });
      });
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form className="mx-auto w-3/4">
        <Form.Item label="配管付属品の計算方法は">
          <Radio.Group
            value={formData.pipeAccessoryRate}
            onChange={(e) => handleChange('pipeAccessoryRate', e.target.value)}
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="自動"
                min={0}
                max={100}
                value={formData.pipeAccessoryRate}
                onChange={(value) => handleChange('pipeAccessoryRate', value)}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>付属品率から</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="配管支持材の計算方法は">
          <InputNumber
            addonAfter="%"
            addonBefore="自動"
            min={0}
            max={100}
            className="w-36"
          />
        </Form.Item>

        <Form.Item label="ケーブルラック付属品の計算方法は">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="ケーブルラック支持材の計算方法は">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="レースウェイ付属品の計算方法は">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="レースウェイ支持材の計算方法は">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="ケーブル補足材を追加し計算を">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="照明器具取付材を追加し計算を">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="盤取付材を追加し計算を">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                className="w-36"
              />
            </Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="付帯工事をまとめ、一式計上を">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>行う</Radio>
            <Radio value={2}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="付帯工事 入力された単価に率を掛けます。">
          <InputNumber
            addonBefore="乗率"
            addonAfter="%"
            min={0}
            max={100}
            className="w-36 p"
          />
          <InputNumber
            addonBefore="原価率"
            addonAfter="%"
            min={0}
            max={100}
            className="w-36"
          />
        </Form.Item>
        <Form.Item label="共益費 入力された単価に率を掛けます。">
          <InputNumber
            addonBefore="乗率"
            addonAfter="%"
            min={0}
            max={100}
            className="w-36"
          />
          <InputNumber
            addonBefore="原価率"
            addonAfter="%"
            min={0}
            max={100}
            className="w-36"
          />
        </Form.Item>
      </Form>
      <FloatButton
        shape="square"
        type="primary"
        description="保管"
        className="mb-16 mr-10 animate-bounce"
      />
      <Modal></Modal>
    </div>
  );
}
export default OtherInput;
