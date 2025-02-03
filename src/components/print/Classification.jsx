export function Classification({ number, setActiveTab }) {
  if (number == '') {
    setActiveTab('select');
  }
  return <>分類別集計表</>;
}
export default Classification;
