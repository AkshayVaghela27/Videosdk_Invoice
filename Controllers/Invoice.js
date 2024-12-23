const Invoice = require('../Models/Invoice')
const generateInvoicePDF = require("../Utils/Generatepdf");
const calculateTotalAmount = (items, taxRate, discount) => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = (subtotal * taxRate) / 100;
    return subtotal + tax - discount;
  };
  
const CreateInvoice = async(req,res) => {
    try{
        const {CustomerDetail,invoiceDate,dueDate,items,taxRate,discount} = req.body

        const totalAmount = calculateTotalAmount(items,taxRate,discount)
        const invoiceCount = await Invoice.countDocuments()+1

        const invoice = await Invoice.create({
            invoiceNumber : `IVCN - ${invoiceCount}`,
            CustomerDetail,        
            invoiceDate : invoiceDate || new Date(),
            dueDate,
            items,
            taxRate,
            discount,
            totalAmount,
            paymentStatus: "pending",
        })

        res.json(invoice)
    }catch(err)
    {
        console.log(err)
    }
}

const GetInvoice = async (req,res) => {
    try{
        const invoices = req.user.isAdmin 
        ? await Invoice.find()
        : await Invoice.find({"CustomerDetail.email" :req.user.email})

        res.json(invoices);

    }catch(err){
        console.log(err)
    }
}

const UpdateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, taxRate, discount, paymentStatus } = req.body;

        const invoice = await Invoice.findById(id);
        if (!invoice) return res.json("Invoice not found");

        invoice.items = items;
        invoice.taxRate = taxRate;
        invoice.discount = discount;
        invoice.paymentStatus = paymentStatus;

        invoice.totalAmount = calculateTotalAmount(items, taxRate, discount);

        if (isNaN(invoice.totalAmount)) {
            console.log('Invalid totalAmount:', invoice.totalAmount);
            return res.json({ msg: "Total amount calculation failed." });
        }
        await invoice.save();
        res.json(invoice);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
};

  
  
  const DeleteInvoice = async (req, res) => {
    try {
      const { id } = req.params;
  
      const invoice = await Invoice.findByIdAndDelete(id);
      if (!invoice) return res.json("Invoice not found" );
  
      res.json({ msg: "Invoice deleted successfully" });
    } catch (err) {
      res.json(err)
    }
  };

  const GenerateInvoicePDF = async (req, res) => {
    try {
        const { id } = req.params;

        const invoice = await Invoice.findById(id);
        if (!invoice) return res.status(404).json({ msg: "Invoice not found" });

        generateInvoicePDF(invoice, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to generate PDF" });
    }
};

module.exports = {CreateInvoice,GetInvoice,UpdateInvoice,DeleteInvoice,GenerateInvoicePDF}