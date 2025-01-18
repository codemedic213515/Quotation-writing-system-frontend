import { Form, Select, DatePicker, FloatButton } from 'antd';
import CTable from '../CTable';
export function SelectQuotation() {
  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
      <Form.Item label="Choose ">
        <div className="flex flex-row justify-between gap-4">
          <Select
            showSearch
            allowClear
            placeholder="Number"
            className="w-1/4"
          />
          <DatePicker
            showSearch
            allowClear
            placeholder="date"
            className="w-1/4"
          />
          <Select
            showSearch
            allowClear
            placeholder="Work Name"
            className="w-1/4"
          />
          <Select
            showSearch
            allowClear
            placeholder="user name"
            className="w-1/4"
          />
        </div>
      </Form.Item>
      <CTable />
      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default SelectQuotation;
