export function SummaryTable({ number, setActiveTab }) {
  if (number == '') {
    setActiveTab('select');
  }
  return <>総括表</>;
}
export default SummaryTable;
