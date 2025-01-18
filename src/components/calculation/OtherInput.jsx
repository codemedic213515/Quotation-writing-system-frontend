import { Form, InputNumber, Radio, FloatButton, Modal } from 'antd';
export function OtherInput() {
  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form className="mx-auto w-3/4">
        <Form.Item label="配管付属品の計算方法は">
          <Radio.Group defaultValue={1} className="flex items-center">
            <Radio value={1}>
              <InputNumber
                addonAfter="%"
                addonBefore="自動"
                min={0}
                max={100}
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
