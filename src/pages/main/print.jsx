import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
} from '@material-tailwind/react';
import {
  DocumentMagnifyingGlassIcon,
  BookOpenIcon,
  CodeBracketSquareIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  QueueListIcon,
} from '@heroicons/react/24/solid';
import SelectQuotation from '@/components/print/SelectQuotation';
import QuotationCover from '@/components/print/QuotationCover';
import Detailed from '@/components/print/Detailed';
import Classification from '@/components/print/Classification';
import SummaryTable from '@/components/print/SummaryTable';
import QuotationList from '@/components/print/QuotationList';

export function Print() {
  const [activeTab, setActiveTab] = useState('select');
  const [number, setNumber] = useState('');
  return (
    <div>
      <div className="relative mt-8 h-28 w-full overflow-hidden rounded-xl ">
        <div className="absolute inset-0 h-full w-full bg-[#00B3F4]" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center ml-11 mt-4 text-lg gap-6 font-bold">
              {activeTab === 'select'
                ? '明細書選択'
                : activeTab === `cover`
                ? '見積書表紙'
                : activeTab === 'detailed'
                ? '内訳明細表'
                : activeTab === 'classific'
                ? '分類別集計表'
                : activeTab === 'summary'
                ? '総括表'
                : activeTab === 'list'
                ? '実行予算表'
                : ''}
            </div>
            <div className="text-lg">
              <Tabs value={activeTab}>
                <TabsHeader>
                  <Tab
                    value="select"
                    onClick={() => {
                      setActiveTab('select');
                      setNumber('');
                    }}
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
                    value="cover"
                    onClick={() => setActiveTab('cover')}
                    className={`${
                      activeTab === 'cover'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <BookOpenIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    見積書表紙
                  </Tab>
                  <Tab
                    value="detailed"
                    onClick={() => setActiveTab('detailed')}
                    className={`${
                      activeTab === 'detailed'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <CodeBracketSquareIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    内訳明細表
                  </Tab>
                  <Tab
                    value="classific"
                    onClick={() => setActiveTab('classific')}
                    className={`${
                      activeTab === 'classific'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <TagIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    分類別集計表
                  </Tab>
                  <Tab
                    value="summary"
                    onClick={() => setActiveTab('summary')}
                    className={`${
                      activeTab === 'summary'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <AdjustmentsHorizontalIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    総括表
                  </Tab>
                  <Tab
                    value="list"
                    onClick={() => setActiveTab('list')}
                    className={`${
                      activeTab === 'list'
                        ? 'active-tab font-bold text-[#00B3F4]'
                        : 'text-blue-gray-500 font-bold'
                    } w-auto `}
                  >
                    <QueueListIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    実行予算表
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          {/* Render Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'select' && (
              <SelectQuotation
                setActiveTab={setActiveTab}
                setNumber={setNumber}
              />
            )}
            {activeTab === 'cover' && (
              <QuotationCover setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'detailed' && (
              <Detailed setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'classific' && (
              <Classification setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'summary' && (
              <SummaryTable setActiveTab={setActiveTab} number={number} />
            )}
            {activeTab === 'list' && (
              <QuotationList setActiveTab={setActiveTab} number={number} />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Print;
