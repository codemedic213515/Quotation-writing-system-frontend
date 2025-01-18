import { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import PropTypes from 'prop-types';
const CTable = (props) => {
  const [page, setPage] = useState({ pn: 1, ps: props.ps });
  const [data, setData] = useState([]);
  const { pn, ps } = page;

  useEffect(() => {
    let s = [];
    for (
      let i = (pn - 1) * ps;
      i <
      (pn * ps < props?.dataSource?.length
        ? pn * ps
        : props.dataSource?.length);
      i++
    ) {
      s.push({ ...props?.dataSource[i], no: i + 1 });
    }
    setData(s);
  }, [props.dataSource, props.flag, pn, ps]);

  useEffect(() => {
    if (props.toFirstPane) setPage({ ...page, pn: 1 });
  }, [props]);

  return (
    <div className="flex flex-col rounded-lg ">
      <Table
        {...props}
        dataSource={data}
        sticky
        pagination={false}
        style={{ width: '100%', height: '100%' }}
        tableLayout="fixed"
        rowClassName={(record) =>
          record?.delete === true || record?.選択 === true ? 'bg-base-300' : ''
        }
      />
      <div className="flex justify-center w-full bg-bg-light rounded-md ">
        <Pagination
          pageSizeOptions={[5, 10, 15, 20]}
          current={pn}
          pageSize={ps}
          showSizeChanger
          className="p-1"
          defaultPageSize={5}
          onChange={(pn, ps) => setPage({ pn, ps })}
          total={props.dataSource?.length}
        />
      </div>
    </div>
  );
};

CTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default CTable;
