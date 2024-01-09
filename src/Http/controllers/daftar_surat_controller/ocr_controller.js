const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

async function changeTextInPdf() {
  // Baca file PDF
  const pdfBytes = fs.readFileSync("input.pdf");
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Dapatkan halaman pertama dari dokumen PDF
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Ganti teks
  const existingText = "xxxxx";
  const newText = "Januari 9, 2024";

  // Cari dan ganti teks pada halaman
  const textFound = firstPage.getText().includes(existingText);
  if (textFound) {
    firstPage.drawText(newText, {
      x: 50,
      y: 500,
      size: 50,
      color: rgb(0, 0, 0),
    });
  } else {
    console.log("Teks tidak ditemukan dalam PDF");
    return;
  }

  // Simpan perubahan ke file baru
  const modifiedPdfBytes = await pdfDoc.save();
  fs.writeFileSync("output.pdf", modifiedPdfBytes);
}

changeTextInPdf().catch(console.error);
