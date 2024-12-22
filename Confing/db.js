const mongoose = require("mongoose")

const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MongoUrl,{
            dbName:"Invoice_Mern"
        })
    console.log("Mongodb connect")
}
catch(err)  {
    console.log(err)
}
}

module.exports = connectdb