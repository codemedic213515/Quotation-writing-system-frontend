import { FloatButton, InputNumber, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function SetInput({ setActiveTab, number }) {
  if (number === '') {
    setActiveTab('select');
  }
  const transformData = (data) => {
    return data.reduce((acc, item) => {
      if (item.name === '電線管') {
        acc.tubeNetRate = item.netRate;
        acc.tubeReplenishmentRate = item.replenishmentRate;
      }
      if (item.name === '電線・ケーブル') {
        acc.cableNetRate = item.netRate;
        acc.cableReplenishmentRate = item.replenishmentRate;
      }
      return acc;
    }, {});
  };

  // function decodeData(transformedData) {
  //   setData([])

  //   if (
  //     transformedData.tubeNetRate !== undefined &&
  //     transformedData.tubeReplenishmentRate !== undefined
  //   ) {
  //     data.push({
  //       key: '1',
  //       name: '電線管',
  //       netRate: transformedData.tubeNetRate,
  //       replenishmentRate: transformedData.tubeReplenishmentRate,
  //     });
  //   }

  //   if (
  //     transformedData.cableNetRate !== undefined &&
  //     transformedData.cableReplenishmentRate !== undefined
  //   ) {
  //     data.push({
  //       key: '2',
  //       name: '電線・ケーブル',
  //       netRate: transformedData.cableNetRate,
  //       replenishmentRate: transformedData.cableReplenishmentRate,
  //     });
  //   }

  //   return data;
  // }

  // State to store the net rate and replenishment rate for each material
  const [data, setData] = useState([
    {
      key: '1',
      name: '電線管',
      netRate: 100, // Actual Net Rate for Conduit
      replenishmentRate: 100, // Supply Rate for Conduit
    },
    {
      key: '2',
      name: '電線・ケーブル',
      netRate: 100, // Actual Net Rate for Cable
      replenishmentRate: 100, // Supply Rate for Cable
    },
  ]);
  const send = async (result) => {
    console.log(result);

    try {
      const response = await axios.post(`/api/quotationcalc`, result);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const sendData = () => {
    const result = transformData(data);
    result.number = number;
    console.log(result);
    send(result);
    setActiveTab('rank');
  };

  // Handle changes in input fields for net rate and replenishment rate
  const handleInputChange = (value, key, type) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? { ...item, [type]: value } // Update either 'netRate' or 'replenishmentRate'
          : item,
      ),
    );
  };

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
      render: (text, record) => (
        <InputNumber
          max={100}
          min={0}
          className="w-24"
          addonAfter="%"
          defaultValue={100}
          value={record.netRate}
          onChange={(value) => handleInputChange(value, record.key, 'netRate')}
        />
      ),
    },
    {
      title: '補給率',
      dataIndex: 'replenishmentRate',
      key: 'replenishmentRate',
      align: 'center',
      render: (text, record) => (
        <InputNumber
          max={100}
          min={0}
          className="w-24"
          addonAfter="%"
          defaultValue={100}
          value={record.replenishmentRate}
          onChange={(value) =>
            handleInputChange(value, record.key, 'replenishmentRate')
          }
        />
      ),
    },
  ];

  return (
    <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] text-center flex flex-col gap-4 overflow-auto font-bold">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        className="border-collapse w-auto h-auto mb-20 mx-auto"
      />
      <p>
        ※
        実Net率･･･拾い出した数量にすでに補給率が含まれている場合に補正することができます。
      </p>
      <p>※補給率…提出時の数量に余分目な量を含めることができます。</p>
      <FloatButton
        shape="square"
        type="primary"
        description="次へ"
        onClick={() => sendData()}
        className="mb-16 mr-10 animate-bounce"
      />
    </div>
  );
}

export default SetInput;
