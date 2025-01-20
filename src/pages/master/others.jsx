import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import { BarsArrowDownIcon, AtSymbolIcon } from '@heroicons/react/24/solid';
import Rank from '@/components/others/Rank';
import Unit from '@/components/others/Unit';

import { Link } from 'react-router-dom';
export function Others() {
  const [activeTab, setActiveTab] = useState('rank');
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === 'rank'
                ? 'ランク'
                : activeTab === 'unit'
                ? '単位'
                : ''}
            </div>
            <div className="text-lg">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="rank"
                    onClick={() => setActiveTab('rank')}
                    className={`${
                      activeTab === 'rank'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <BarsArrowDownIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    ランク
                  </Tab>
                  <Tab
                    value="unit"
                    onClick={() => setActiveTab('unit')}
                    className={`${
                      activeTab === 'unit'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <AtSymbolIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    単位
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {/* Render Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'rank' && <Rank />}
            {activeTab === 'unit' && <Unit />}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Others;
