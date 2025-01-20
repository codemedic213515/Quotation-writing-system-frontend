import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';

import {
  CalculatorOutlined,
  UserOutlined,
  TagsOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import SetInput from '@/components/calculation/SetInput';
import RankInput from '@/components/calculation/RankInput';
import PriceInput from '@/components/calculation/PriceInput';
import MaterialInput from '@/components/calculation/MaterialInput';
import OtherInput from '@/components/calculation/OtherInput';
import SelectQuotation from '@/components/calculation/SelectQuotation';

export function Print() {
  const [activeTab, setActiveTab] = useState('select');
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          {/* <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === `select`
                ? '明細書選択'
                : activeTab === 'set'
                ? '数量 (Net補給率)'
                : activeTab === 'rank'
                ? 'ランク（労務単価・現場雑費率・諸経費率)'
                : activeTab === 'price'
                ? '部材単価 (乗率・値引率)'
                : activeTab === 'material'
                ? '材料消費率'
                : activeTab === 'other'
                ? 'その他計算設定'
                : ''}
            </div>
            <div>
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="select"
                    onClick={() => setActiveTab('select')}
                    className={`${
                      activeTab === 'select'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <DocumentMagnifyingGlassIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    明細書選択
                  </Tab>
                  <Tab
                    value="set"
                    onClick={() => setActiveTab('set')}
                    className={`${
                      activeTab === 'set'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto px-4`}
                  >
                    <CalculatorOutlined className="items-center mr-2 h-5 w-5" />
                    数量
                  </Tab>
                  <Tab
                    value="rank"
                    onClick={() => setActiveTab('rank')}
                    className={`${
                      activeTab === 'rank'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    } w-auto px-4`}
                  >
                    <UserOutlined className="items-center mr-2 h-5 w-5" />
                    ランク
                  </Tab>
                  <Tab
                    value="price"
                    onClick={() => setActiveTab('price')}
                    className={`${
                      activeTab === 'price'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    } w-auto px-4`}
                  >
                    <TagsOutlined className="items-center mr-2 h-5 w-5" />
                    部材単価
                  </Tab>
                  <Tab
                    value="material"
                    onClick={() => setActiveTab('material')}
                    className={`${
                      activeTab === 'material'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    } w-auto px-4`}
                  >
                    <BarChartOutlined className="items-center mr-2 h-5 w-5" />
                    材料消費率
                  </Tab>
                  <Tab
                    value="other"
                    onClick={() => setActiveTab('other')}
                    className={`${
                      activeTab === 'other'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    } w-auto px-4`}
                  >
                    <SettingOutlined className="items-center mr-2 h-5 w-5" />
                    その他計算設定
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div> */}

          <div className="tab-content">
            {/* {activeTab === 'select' && (
              <SelectQuotation setActiveTab={setActiveTab} />
            )}
            {activeTab === 'set' && <SetInput setActiveTab={setActiveTab} />}
            {activeTab === 'rank' && <RankInput setActiveTab={setActiveTab} />}
            {activeTab === 'price' && (
              <PriceInput setActiveTab={setActiveTab} />
            )}
            {activeTab === 'material' && (
              <MaterialInput setActiveTab={setActiveTab} />
            )}
            {activeTab === 'other' && <OtherInput />} */}
            <p className="h-full w-full">Please check your connection...</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Print;
