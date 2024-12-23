const PDFDocument = require("pdfkit");

const generateInvoicePDF = (invoice, res) => {
    const doc = new PDFDocument();
    const filename = `Invoice-${invoice.invoiceNumber}.pdf`;


    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    doc.pipe(res);


    doc.fontSize(20).text("Invoice", { align: "center" }).moveDown();

    doc.fontSize(12)
        .text(`Invoice Number: ${invoice.invoiceNumber}`)
        .text(`Customer Name: ${invoice.CustomerDetail.name}`)
        .text(`Email: ${invoice.CustomerDetail.email}`)
        .text(`Phone: ${invoice.CustomerDetail.phone}`)
        .text(`Address: ${invoice.CustomerDetail.address}`)
        .text(`Invoice Date: ${new Date(invoice.invoiceDate).toDateString()}`)
        .text(`Due Date: ${new Date(invoice.dueDate).toDateString()}`)
        .moveDown();

    doc.fontSize(12).text("Items", { underline: true }).moveDown(0.5);
    doc.text(`Name        Quantity        Unit Price`);
    doc.moveDown(0.5);

    invoice.items.forEach((item) => {
        doc.text(`${item.name}       ${item.quantity}       ${item.unitPrice}`);
    });

    doc.moveDown(1);
    doc.text(`Tax Rate: ${invoice.taxRate}%`);
    doc.text(`Discount: ${invoice.discount}`);
    doc.text(`Total Amount: ${invoice.totalAmount}`, { underline: true });
    doc.moveDown();

    doc.text(`Payment Status: ${invoice.paymentStatus}`).moveDown();

    doc.end();
};

module.exports = generateInvoicePDF;
