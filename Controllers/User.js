const User = require('../Models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {

    const { name, email, password,isAdmin } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.json({ msg: "User already Exits" })
        const haspass = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: haspass ,isAdmin})
        res.json({ msg: "Successfully Register" })
    } catch (err) { console.log(err) }

}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return res.json({ msg: "Invalid Email" })
        const validpassword = await bcrypt.compare(password,user.password)
        if (!validpassword) return res.json({ msg: "Inavalid Password" })
        const token = jwt.sign({_id:user._id},"Akshay@#123")

        res.cookie("token",token)
        
        res.json({ msg: "Login successfull" })
    } catch (err) {
        console.log(err)
    }
}


const profile = async (req,res) => {

    try{
        const user = req.user
        if(!user) return res.json({msg:"User Doesn't Exits"})
        res.json(user)
    }catch(err){
        console.log(err)
    }

}

module.exports = {register,login,profile}