const userModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken");


module.exports.registerUser = async (req,res)=>{
    try{
     let {email, fullname, password} = req.body;
        console.log(email);
     let user = await userModel.findOne({email:email});
     if(user) return res.status(401).send('already have and account');

    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return res.send("err.message");
        let Salt = salt;
        
        bcrypt.hash(password, Salt, async (err, hash)=>{
            if(err) return res.send(err.message);
            else{
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullname,
                });
                let token = generateToken(user);
                res.cookie("token",token);
                res.redirect('/shop');
            }
        });
    });
 
    }
    catch(err){
     console.log(err.message);
    }
 
};


module.exports.loginUser = async (req,res)=>{
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});

    if(! user) return res.send("something went wrong");

    bcrypt.compare(password, user.password, (err, result)=>{
        if(err) return res.send('something went wrong');

        if(result){
            let token = generateToken(user);
            res.cookie('token',token);
            res.redirect('/shop');
        }
        else return res.send('something went wrong');
    });
}



module.exports.logout = (req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
}