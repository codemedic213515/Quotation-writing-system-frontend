import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import { PuzzlePieceIcon, ServerIcon } from '@heroicons/react/24/solid';
import MaterialCategory from '@/components/material/MaterialCateogry';
import MaterialMaster from '@/components/material/MaterialMaster';

import { Link } from 'react-router-dom';
export function Material() {
  const [activeTab, setActiveTab] = useState('category');
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === 'category'
                ? 'カテゴリー'
                : activeTab === 'master'
                ? '部材マスターデータ'
                : ''}
            </div>
            <div className="text-lg">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="category"
                    onClick={() => setActiveTab('category')}
                    className={`${
                      activeTab === 'category'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <PuzzlePieceIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    カテゴリー
                  </Tab>
                  <Tab
                    value="master"
                    onClick={() => setActiveTab('master')}
                    className={`${
                      activeTab === 'master'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <ServerIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    部材マスターデータ
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {/* Render Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'category' && <MaterialCategory />}
            {activeTab === 'master' && <MaterialMaster />}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Material;
