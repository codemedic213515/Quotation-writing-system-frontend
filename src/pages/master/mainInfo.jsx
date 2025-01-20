import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import {
  GlobeAltIcon,
  BuildingOffice2Icon,
  SquaresPlusIcon,
} from '@heroicons/react/24/solid';
import Construction from '@/components/mainInfo/Construction';
import Customer from '@/components/mainInfo/Customer';
import PostCode from '@/components/mainInfo/PostCode';

import { Link } from 'react-router-dom';
export function MainInfo() {
  const [activeTab, setActiveTab] = useState('post');
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === 'post'
                ? 'ポストコード'
                : activeTab === 'construction'
                ? '工事種類'
                : activeTab === 'customer'
                ? '提出先管理'
                : ''}
            </div>
            <div className="text-lg">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="post"
                    onClick={() => setActiveTab('post')}
                    className={`${
                      activeTab === 'post'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <GlobeAltIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    ポストコード
                  </Tab>
                  <Tab
                    value="customer"
                    onClick={() => setActiveTab('customer')}
                    className={`${
                      activeTab === 'customer'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <SquaresPlusIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    提出先管理
                  </Tab>
                  <Tab
                    value="construction"
                    onClick={() => setActiveTab('construction')}
                    className={`${
                      activeTab === 'construction'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <BuildingOffice2Icon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    工種入力
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {/* Render Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'post' && <PostCode />}
            {activeTab === 'construction' && <Construction />}
            {activeTab === 'customer' && <Customer />}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default MainInfo;
