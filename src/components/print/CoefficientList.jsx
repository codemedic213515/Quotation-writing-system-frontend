export function CoefficientList({ number, setActiveTab }) {
  if (number == '') {
    setActiveTab('select');
  }
  return <>係数一覧表</>;
}
export default CoefficientList;
