import { Form, Input, Table } from 'antd';

export function SetInput() {
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      className: 'bg-blue-100',
    },
    {
      title: '実Net率',
      dataIndex: 'netRate',
      key: 'netRate',
      align: 'center',
      render: () => <Input type="number" className="w-20" placeholder="%" />,
    },
    {
      title: '補給率',
      dataIndex: 'replenishmentRate',
      key: 'replenishmentRate',
      align: 'center',
      render: () => <Input type="number" className="w-20" placeholder="%" />,
    },
  ];

  const data = [
    {
      key: '1',
      name: '電線管',
    },
    {
      key: '2',
      name: '電線・ケーブル',
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center  flex flex-col gap-4 overflow-auto font-bold">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="border-collapse w-auto h-auto m-auto"
      />
      <p>
        ※
        実Net率･･･拾い出した数量にすでに補給率が含まれている場合に補正することができます。
      </p>
      <p>※補給率…提出時の数量に余分目な量を含めることができます。</p>
    </div>
  );
}
export default SetInput;
