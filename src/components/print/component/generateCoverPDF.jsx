import jsPDF from "jspdf"

const generateCoverPDF = async ({ data, setIsGenerating }) => {
  setIsGenerating(true)

  try {
    // Create PDF document in landscape orientation (A4)
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" })
    const pageWidth = 297 // A4 landscape width in mm
    const pageHeight = 210 // A4 landscape height in mm
    const margin = 20 // 20mm padding as requested

    // Load Japanese font
    const fontResponse = await fetch(
      "https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf",
    )
    const fontBuffer = await fontResponse.arrayBuffer()
    const fontBase64 = btoa(new Uint8Array(fontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ""))
    doc.addFileToVFS("NotoSansJP-Regular.ttf", fontBase64)
    doc.addFont("NotoSansJP-Regular.ttf", "NotoSansJP", "normal")
    doc.setFont("NotoSansJP")

    // Content area dimensions
    const contentWidth = pageWidth - margin * 2
    const contentHeight = pageHeight - margin * 2

    // Calculate column widths for better layout
    const leftColWidth = contentWidth * 0.6
    const rightColWidth = contentWidth * 0.4
    const rightColX = margin + leftColWidth

    // **Header Section**
    // Title
    doc.setFontSize(24) // Slightly smaller to fit better
    doc.setFont("NotoSansJP", "normal")
    doc.text("御 見 積 書", pageWidth / 2, margin + 12, { align: "center" })

    // Document number with underline
    doc.setFontSize(12)
    const docNumberText = `№ ${data.number }`
    const docNumberWidth = doc.getTextWidth(docNumberText)
    doc.text(docNumberText, pageWidth - margin, margin + 8, { align: "right" })
    doc.setDrawColor(224, 224, 224)
    doc.line(pageWidth - margin - docNumberWidth, margin + 10, pageWidth - margin, margin + 10)

    // Date with underline
    const dateText = data.formattedDate 
    const dateWidth = doc.getTextWidth(dateText)
    doc.text(dateText, pageWidth - margin, margin + 16, { align: "right" })
    doc.line(pageWidth - margin - dateWidth, margin + 18, pageWidth - margin, margin + 18)

    // Horizontal separator
    doc.setDrawColor(224, 224, 224)
    doc.line(margin, margin + 24, pageWidth - margin, margin + 24)

    // **Client Information Section**
    // Client name
    doc.setFontSize(16)
    doc.text(data.export , margin, margin + 35)

    // 御中 box
    doc.setDrawColor(217, 217, 217)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(margin + 65, margin +28, 20, 10, 1, 1, "FD")
    doc.setFontSize(12)
    doc.text(data.greeting , margin + 75, margin + 35, { align: "center" })

    // **Total Amount Box**
    // Black background for label
    doc.setFillColor(33, 33, 33)
    doc.setDrawColor(33, 33, 33)
    const totalBoxWidth = leftColWidth * 0.8 // Make it proportional to column width
    const totalLabelWidth = totalBoxWidth * 0.5
    doc.rect(margin, margin + 45, totalLabelWidth, 12, "F")

    // Label text
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.text("御 見 積 総 額", margin + totalLabelWidth / 2, margin + 53, { align: "center" })

// Amount box with black border
doc.setDrawColor(0, 0, 0); // Set border color to black
doc.setFillColor(255, 255, 255); // Keep background white
const amountBoxX = margin + totalLabelWidth;
const amountBoxY = margin + 45;
const amountBoxWidth = totalBoxWidth - totalLabelWidth;
const amountBoxHeight = 12;

// Draw the bordered rectangle
doc.rect(amountBoxX, amountBoxY, amountBoxWidth, amountBoxHeight, "FD"); // 'FD' fills and draws border

// Amount text inside the box
doc.setTextColor(0, 0, 0);
doc.setFontSize(18);
doc.setFont("NotoSansJP", "italic");
doc.text(`¥${data.totalPrice?.toLocaleString() }`, amountBoxX + 5, margin + 53);
doc.setFont("NotoSansJP", "normal");

    // **Project Details Section**
    const detailsStartY = margin + 70
    const detailsLineHeight = 12 // Reduced line height
    doc.setFontSize(12)

    // Project name
    doc.text("工 事 名", margin, detailsStartY)
    doc.text(data.name , margin + 40, detailsStartY)
    doc.setDrawColor(224, 224, 224)
    doc.line(margin, detailsStartY + 2, margin + leftColWidth - 10, detailsStartY + 2)

    // Project location
    const locationY = detailsStartY + detailsLineHeight
    doc.text("工 事 場 所", margin, locationY)
    doc.text(data.address , margin + 40, locationY)
    doc.line(margin, locationY + 2, margin + leftColWidth - 10, locationY + 2)

    // Validity period
    const validityY = locationY + detailsLineHeight
    doc.text("有 効 期 限", margin, validityY)
    doc.text("3ヶ月", margin + 40, validityY)
    doc.line(margin, validityY + 2, margin + leftColWidth - 10, validityY + 2)

    // Payment terms
    const paymentY = validityY + detailsLineHeight
    doc.text("御 支 払 条 件", margin, paymentY)

    // Payment method box
    doc.setDrawColor(217, 217, 217)
    doc.setFillColor(255, 255, 255)
    doc.text(data.method +"    "+data.other, margin + 40, paymentY)
    doc.line(margin, paymentY + 2, margin + leftColWidth - 10, paymentY + 2)

    // Notes
    const notesY = paymentY + detailsLineHeight + 5
    doc.text(`備 考: ${data.des }`, margin, notesY)

    // **Right Side Content**
    let rightY = detailsStartY -30

    // Spaced out text for "関西電力認定"
    const certChars = ["関", "西", "電", "力", "認", "定"]
    const certSpacing = (rightColWidth-15) / (certChars.length-1)
    doc.setFontSize(16)
    for (let i = 0; i < certChars.length; i++) {
      doc.text(certChars[i], rightColX + i * certSpacing, rightY)
    }

    // Spaced out text for "各種電気設備工事設計施工"
    rightY += 12
    const serviceChars = ["各", "種", "電", "気", "設", "備", "工", "事", "設", "計", "施", "工"]
    const serviceSpacing = (rightColWidth-15) / (serviceChars.length-1)
    for (let i = 0; i < serviceChars.length; i++) {
      doc.text(serviceChars[i], rightColX + i * serviceSpacing, rightY)
    }

    // Company logo and info section
    rightY += 5

    // Add company logo  
      doc.addImage("/img/company.webp", "webp", rightColX, rightY, 30, 30)
    // Company name and info
    const companyInfoX = rightColX + rightColWidth-10
    doc.setFontSize(18)
    doc.text("松 尾 電 設", companyInfoX, rightY + 8, { align: "right" })

    // Company address and contact
    doc.setFontSize(12)
    rightY += 16
    // Company address in three lines
doc.text("〒565-0064", companyInfoX, rightY, { align: "right" }); // Postal code
rightY += 5; // Move to next line

doc.text("大阪府河内長野市", companyInfoX, rightY, { align: "right" }); // Prefecture & City
rightY += 5; // Move to next line

doc.text("殿ヶ丘2-3-2", companyInfoX, rightY, { align: "right" }); // Street address

    rightY += 5
    doc.text("TEL: 072(154)5304", companyInfoX, rightY, { align: "right" })
    rightY += 5
    doc.text("FAX: 072(154)5522", companyInfoX, rightY, { align: "right" })

    // Signature boxes
    const sigY = rightY + 10
    const sigWidth = 14
    const sigHeight = 14
    const sigGap = 4
    const sigStartX = rightColX + rightColWidth - (sigWidth * 3 + sigGap * 2)

    doc.setDrawColor(33, 33, 33)
    doc.rect(sigStartX, sigY, sigWidth, sigHeight)
    doc.rect(sigStartX + sigWidth + sigGap, sigY, sigWidth, sigHeight)
    doc.rect(sigStartX + (sigWidth + sigGap) * 2, sigY, sigWidth, sigHeight)

    // Textarea at the bottom - ensure it fits within the page
    const textareaY = Math.min(sigY + sigHeight + 10, pageHeight - margin - 20)
    const textareaHeight = pageHeight - margin - textareaY
    doc.setDrawColor(217, 217, 217)
    doc.setFillColor(255, 255, 255)
    doc.rect(margin, textareaY, contentWidth, textareaHeight, "FD")

    const pdfBlob = doc.output("blob")
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, "_blank")
    doc.save(`Cover_${data.number || "template"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
  } finally {
    setIsGenerating(false)
  }
}

export default generateCoverPDF

