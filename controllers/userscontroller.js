const res = require("express/lib/response");
const User =require("../models/userSchema")
const bcrypt = require("bcrypt")
const validate =require("../config/validator")
const userhandler = require("../handlers/user.handler")


//get all users
const getUsers= async(req,res)=>{
    try{
        let allUsers = await User.find({});
        res.status(200).json({success:true, body:allUsers});
    }catch(error){
        res.status(500).json({success:false, data:error});
    }

}

//create a user
const createUser = async(req, res)=>{
    try{
   //hashing password with bcrypt
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(req.body.password,salt);

   //validating a user
   const {username,email,password} =req.body;
   const valid = await validate({username,email,password})

   if(valid){

   const newUser= new User({
       username:req.body.username,
       email:req.body.email,
       password:hashedPassword
   });
   await newUser.save();
   res.status(201).json({
       _id:newUser._id,
       username:newUser.username,
       email:newUser.email
   })
   }else{
       res.status(400).json({
           message:"Invalid data"
       });
   }}catch(error){
       let message = error
   }
   }

// get user by the id
const getUser = async(req,res)=>{
    try{
    const userId = req.params.id;
    const user = await User.findById(userId)

    res.status(200).json({success:true,body: user});

    } catch (error){

        res.status(400).json({success:false,body:error});
    }
    }
    

module.exports = {getUsers, createUser, getUser}