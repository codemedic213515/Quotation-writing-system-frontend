export function QuotationList({ number, setActiveTab }) {
  if (number == '') {
    setActiveTab('select');
  }
  return <>見積一覧表</>;
}
export default QuotationList;
