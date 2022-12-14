const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const registerUser =  asyncHandler( async (req, res) => {
   const {name, email, password} = req.body

   //Validation 
   if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill in all require fields")
   }
   if (password.length < 6) {
    res.status(400)
    throw new Error("Password must be greater than 6 characters")
   }

   // chcek if user email already exists
   const userExists = await User.findOne({email})

   if (userExists) {
    res.status(400)
    throw new Error("Email already exists")
   }


   // create new user
   const user = await User.create({
    name,
    email,
    password,
   })

   if (user) {
    const {_id, name, email, photo, phone, bio} = user
    res.status(201).json({
        _id, name, email, photo, phone, bio
        
    })
   } else {
    res.status(400) 
    throw new Error("Invalid User Data") 
   }
});

module.exports = {
    registerUser
}