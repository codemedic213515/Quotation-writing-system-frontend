import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Radio, FloatButton, notification } from 'antd';
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
    costOverHeadRate: 0,
    costAuxiliaryRate: 0,
    number: number,
  });

  useEffect(() => {
    if (number) {
      axios
        .get(`/api/calculationdata/${number}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.log(error);
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
      .put(`/api/calculationdata/${number}`, formData)
      .then(() => {
        notification.success({
          message: 'データが正常に更新されました',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'データの更新中にエラーが発生しました',
          description: error.response?.data?.message || 'Something went wrong',
        });
      });
  };

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form className="mx-auto w-3/4">
        <Form.Item label="配管付属品の計算方法は">
          <Radio.Group
            defaultValue={1}
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
            <Radio value={0}>付属品率から</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="配管支持材の計算方法は">
          <InputNumber
            addonAfter="%"
            addonBefore="自動"
            min={0}
            max={100}
            value={formData.pipeSupportRate}
            onChange={(value) => handleChange('pipeSupportRate', value)}
            className="w-36"
          />
        </Form.Item>

        <Form.Item label="ケーブルラック付属品の計算方法は">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('cableRackAccessoryRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.cableRackAccessoryRate}
                onChange={(value) =>
                  handleChange('cableRackAccessoryRate', value)
                }
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="ケーブルラック支持材の計算方法は">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('cableRackSupportRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.cableRackSupportRate}
                onChange={(value) =>
                  handleChange('cableRackSupportRate', value)
                }
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="レースウェイ付属品の計算方法は">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('racewayAccessoryRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.racewayAccessoryRate}
                onChange={(value) =>
                  handleChange('racewayAccessoryRate', value)
                }
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="レースウェイ支持材の計算方法は">
          <Radio.Group
            defaultValue={1}
            onChange={(e) => handleChange('racewaySupportRate', e.target.value)}
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.racewaySupportRate}
                onChange={(value) => handleChange('racewaySupportRate', value)}
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="ケーブル補足材を追加し計算を">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('cableAdditionalRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.cableAdditionalRate}
                onChange={(value) => handleChange('cableAdditionalRate', value)}
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="照明器具取付材を追加し計算を">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('lightingAdditionalRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.lightingAdditionalRate}
                onChange={(value) =>
                  handleChange('lightingAdditionalRate', value)
                }
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="盤取付材を追加し計算を">
          <Radio.Group
            defaultValue={1}
            onChange={(e) =>
              handleChange('panelAdditionalRate', e.target.value)
            }
            className="flex items-center"
          >
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="行う"
                min={0}
                max={100}
                value={formData.panelAdditionalRate}
                onChange={(value) => handleChange('panelAdditionalRate', value)}
                className="w-36"
              />
            </Radio>
            <Radio value={0}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="付帯工事をまとめ、一式計上を">
          <Radio.Group
            value={formData.performAuxiliaryWorks ? true : false}
            onChange={(e) =>
              handleChange('performAuxiliaryWorks', e.target.value === true)
            }
            className="flex items-center"
          >
            <Radio value={true}>行う</Radio>
            <Radio value={false}>行わない</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="付帯工事 入力された単価に率を掛けます。">
          <InputNumber
            addonBefore="乗率"
            addonAfter="%"
            min={0}
            max={100}
            value={formData.auxiliaryWorkRate}
            onChange={(value) => handleChange('auxiliaryWorkRate', value)}
            className="w-36"
          />
          <InputNumber
            addonBefore="原価率"
            addonAfter="%"
            min={0}
            max={100}
            value={formData.overheadRate}
            onChange={(value) => handleChange('overheadRate', value)}
            className="w-36"
          />
        </Form.Item>

        <Form.Item label="共益費 入力された単価に率を掛けます。">
          <InputNumber
            addonBefore="乗率"
            addonAfter="%"
            min={0}
            max={100}
            value={formData.costAuxiliaryRate}
            onChange={(value) => handleChange('costAuxiliaryRate', value)}
            className="w-36"
          />
          <InputNumber
            addonBefore="原価率"
            addonAfter="%"
            min={0}
            max={100}
            value={formData.costOverHeadRate}
            onChange={(value) => handleChange('costOverHeadRate', value)}
            className="w-36"
          />
        </Form.Item>

        <FloatButton
          shape="square"
          type="primary"
          onClick={handleSubmit}
          description="保存"
          className="mb-16 mr-10 animate-bounce"
        />
      </Form>
    </div>
  );
}

export default OtherInput;
