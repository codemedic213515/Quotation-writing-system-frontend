import React from 'react';

const Detail = ({ data }) => {
  return (<>sss</>
    // <div
    //   id="pdf-content"
    //   className="max-w-4xl p-2 pb-2 font-sans   rounded-none bg-white "
    // >
    //   {/* Header Section */}
    //   <div className="relative text-center mb-8">
    //     <h2 className="text-2xl font-normal">御 見 積 書</h2>
    //     <p className="absolute right-0 top-0 border-b border-gray-300">
    //       № {data.number}
    //     </p>
    //     <p className="absolute right-0 top-8 border-b border-gray-300">
    //       {data.formattedDate}
    //     </p>
    //   </div>
    //   <hr className="border-gray-300" />

    //   <div className="flex justify-between mt-4">
    //     <div className="w-3/5">
    //       <div className="flex gap-10">
    //         <p className="text-lg">{data.export}</p>
    //         {data.greeting}
    //       </div>

    //       {/* Total Amount */}
    //       <div className="my-8 w-96">
    //         <div className="flex border border-gray-900">
    //           <div className="bg-black text-white px-4 py-2 pt-3 font-bold">
    //             御 見 積 総 額
    //           </div>
    //           <div className="text-right w-1/2 h-full px-6 py-2 mb-3 text-2xl italic">
    //             ¥{data.totalPrice?.toLocaleString()}
    //           </div>
    //         </div>
    //       </div>

    //       {/* Project Details */}
    //       <div className="space-y-4">
    //         <div className="flex border-b border-gray-300 pb-2">
    //           <p className="w-32 font-bold">工 事 名</p>
    //           <p>{data.name}</p>
    //         </div>
    //         <div className="flex border-b border-gray-300 pb-2">
    //           <p className="w-32 font-bold">工 事 場 所</p>
    //           <p>{data.address}</p>
    //         </div>
    //         <div className="flex border-b border-gray-300 pb-2">
    //           <p className="w-32 font-bold">有 効 期 限</p>
    //           <p>3ヶ月</p>
    //         </div>
    //         <div className="flex border-b border-gray-300 pb-2 items-center">
    //           <p className="w-32 font-bold">御 支 払 条 件</p>
    //           {data.method} / {data.other}
    //         </div>
    //       </div>

    //       {/* Remarks */}
    //       <div className="mt-4">
    //         <p>備 考: {data.des}</p>
    //       </div>
    //     </div>

    //     {/* Company Info */}
    //     <div className="w-2/5">
    //       <div className="flex flex-col">
    //         <div className="p-10">
    //           <div className="text-lg flex justify-between">
    //             <span>関</span>
    //             <span>西</span>
    //             <span>電</span>
    //             <span>力</span>
    //             <span>認</span>
    //             <span>定</span>
    //           </div>
    //           <div className="text-lg flex justify-between mb-6">
    //             <span>各</span>
    //             <span>種</span>
    //             <span>電</span>
    //             <span>気</span>
    //             <span>設</span>
    //             <span>備</span>
    //             <span>工</span>
    //             <span>事</span>
    //             <span>設</span>
    //             <span>計</span>
    //             <span>施</span>
    //             <span>工</span>
    //           </div>
    //           <div className="w-full flex justify-between">
    //             <div className="w-1/3 h-full my-auto">
    //               <img
    //                 src="/img/company.png"
    //                 alt="Company Logo"
    //                 className="w-20 h-18"
    //               />
    //             </div>
    //             <div className="text-right w-2/3">
    //               <h3 className="text-lg font-bold">松 尾 電 設</h3>
    //               <p>〒565-0064 大阪府河内長野市殿ヶ丘2-3-2</p>
    //               <p>TEL: 072(154)5304</p>
    //               <p>FAX: 072(154)5522</p>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex flex-row gap-0 justify-end align-bottom mt-9">
    //           <div className="w-16 h-16 border border-black"></div>
    //           <div className="w-20 h-16 border border-black"></div>
    //           <div className="w-16 h-16 border border-black"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <textarea
    //     className="w-full p-4 border border-black mt-4"
    //     rows="4"
    //   ></textarea>
    // </div>
  );
};

export default Detail;
