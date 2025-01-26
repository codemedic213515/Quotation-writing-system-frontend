import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import {
  DocumentTextIcon,
  SquaresPlusIcon,
  ArrowPathRoundedSquareIcon,
  CubeTransparentIcon,
} from '@heroicons/react/24/solid';
import BasicInput from '@/components/createQuotation/BasicInput';
import AdditionalInput from '@/components/createQuotation/AdditionalInput';
import StepInput from '@/components/createQuotation/StepInput';
import MaterialInput from '@/components/createQuotation/MaterialInput';

export function CreateQuotation() {
  const [activeTab, setActiveTab] = useState('basic');
  const [number, setNumber] = useState('');
  useEffect(() => {
    setActiveTab;
  }, []);
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === 'basic'
                ? '基本入力'
                : activeTab === 'addition'
                ? '詳細入力'
                : activeTab === 'step'
                ? '工種入力'
                : activeTab === 'material'
                ? '部材入力'
                : ''}
            </div>
            <div className="text-lg">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="basic"
                    onClick={() => setActiveTab('basic')}
                    className={
                      activeTab === 'basic'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    }
                  >
                    <DocumentTextIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    基本入力
                  </Tab>
                  <Tab
                    value="addition"
                    onClick={() => setActiveTab('addition')}
                    className={
                      activeTab === 'addition'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    }
                  >
                    <SquaresPlusIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    詳細入力
                  </Tab>
                  <Tab
                    value="step"
                    onClick={() => setActiveTab('step')}
                    className={
                      activeTab === 'step'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    }
                  >
                    <ArrowPathRoundedSquareIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    工種入力
                  </Tab>
                  <Tab
                    value="material"
                    onClick={() => setActiveTab('material')}
                    className={
                      activeTab === 'material'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'font-bold text-blue-gray-500'
                    }
                  >
                    <CubeTransparentIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    部材入力
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {/* Render Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'basic' && (
              <BasicInput setActiveTab={setActiveTab} setNumber={setNumber} />
            )}
            {activeTab === 'addition' && (
              <AdditionalInput setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'step' && (
              <StepInput setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'material' && <MaterialInput number={number} />}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default CreateQuotation;
