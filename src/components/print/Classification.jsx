import {Table, Button,  Card, } from 'antd'
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Classification=({ number, setActiveTab })=> {
  if (number == '') {
    setActiveTab('select');
  }
  return (
  <div>
    <Button>Net</Button>
    <Button>total</Button>
    <Button>price</Button>
  </div>
  )
}
export default Classification;
