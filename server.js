const express = require("express")
require('dotenv').config()
const connectdb = require("./Confing/db")
const UserRouter = require("./Routes/User")
const InvoiceRouter = require("./Routes/Invoice")
const cookieParser = require("cookie-parser")
const app = express()
app.use(cookieParser());
app.use(express.json())
connectdb()

app.use('/api/user',UserRouter)

app.use('/api/invoice',InvoiceRouter)

const PORT = process.env.PORT || 5499


app.listen(PORT , () => {
    console.log(`connect to ${PORT} `)
})