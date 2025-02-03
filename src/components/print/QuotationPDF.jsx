import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';

// ✅ Register Noto Sans JP font
Font.register({
  family: 'NotoSansJP',
  src: '/fonts/NotoSansJP-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'NotoSansJP', // ✅ Use Japanese-compatible font
  },
  section: {
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  boldText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalAmountBox: {
    border: '1px solid black',
    padding: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10,
  },
  companySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  companyInfo: {
    fontSize: 10,
    textAlign: 'right',
  },
  image: {
    width: 60,
    height: 60,
  },
});

const QuotationPDF = ({
  number,
  quotation,
  formattedDate,
  totalPrice,
  tax,
  des,
  other,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.section}>
        <Text style={styles.header}>御 見 積 書</Text>
        <Text style={{ textAlign: 'right' }}>№ {number}</Text>
        <Text style={{ textAlign: 'right' }}>{formattedDate}</Text>
      </View>

      {/* Divider */}
      <View style={{ borderBottom: '1px solid black', marginBottom: 10 }} />

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.text}>工 事 名: {quotation.name}</Text>
        <Text style={styles.text}>工 事 場 所: {quotation.address}</Text>
        <Text style={styles.text}>有 効 期 限: 3ヶ月</Text>
        <Text style={styles.text}>御 支 払 条 件: {other || '従来通り'}</Text>
      </View>

      {/* Total Amount */}
      <View style={styles.totalAmountBox}>
        <Text style={styles.boldText}>御 見 積 総 額</Text>
        <Text style={{ textAlign: 'right', fontSize: 16 }}>
          ¥{totalPrice.toLocaleString()}
        </Text>
      </View>

      {/* Remarks */}
      <Text style={styles.text}>備 考: {des}</Text>

      {/* Company Info */}
      <View style={styles.companySection}>
        <Image src="image/company.png" style={styles.image} />
        <View style={styles.companyInfo}>
          <Text style={styles.boldText}>松 尾 電 設</Text>
          <Text>〒565-0064 大阪府河内長野市殿ヶ丘2-3-2</Text>
          <Text>TEL: 072(154)5304</Text>
          <Text>FAX: 072(154)5522</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>この見積書は正式な見積書です</Text>
    </Page>
  </Document>
);

export default QuotationPDF;
