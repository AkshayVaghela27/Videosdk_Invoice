const User = require('../Models/User.js')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try{
        const cookie = req.cookies
        const {token} = cookie
        if(!token) return res.json({msg:"Invalid token"})

        const decodemsg = jwt.verify(token,"Akshay@#123")

        const {_id} = decodemsg

        const user = await User.findById({_id})
        if(!user) return res.json({msg:"user doesn't exits"})
        req.user = user
        next()
    }catch(err){
        console.log(err)
    }

}

module.exports = auth