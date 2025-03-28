//console.log(trial)
const { User } = require('../models/userModel');
const { createHmac, randomBytes } = require('crypto');
const { createTokenUser, validateToken } = require('../services/authentication');
const bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

// Password validation regex
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

async function handleUserSignup(req, res){
    const {firstName, lastName, email, password} = req.body;
    //console.log(firstName, lastName, email, password);

    try{
        const checkUser = await User.findOne({email});
        //console.log("CheckUser", checkUser);
        if (checkUser) return res.json({status: 'failure', message: 'User already exists'});

        // Check if password meets the requirements
        if (!passwordPattern.test(password)) {
            return res.json({
                status: 'failure',
                message: 'Password must be 9-15 characters long, start with a capital letter, include a special character, and contain at least one number.'
            });
        }

        const salt = 12;
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role: "USER"
        });
        //console.log(result);
        return res.status(201).json({status: 'success', message: `User added successfully`})
    }catch(e){
        console.log(e)
        res.status(500).json({status: 'failure', message: 'Internal Server Error'});
    }   
};

async function handleUserSignin(req, res){   
    const {email, password} = req.body;
    //console.log(email);

    try{
        //Check if user exists
        const chechUser = await User.findOne({email});
        if (!chechUser) return res.json({status: 'failure', message: 'User does not exist'});
        //console.log(chechUser);

        //To check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, chechUser.password); // Assuming `password` in the database is hashed
        if (!isPasswordCorrect) {
            return res.json({ status: 'failure', message: 'Incorrect password' });
        }

        //Generating the token.
        const token = createTokenUser(chechUser)

        //return token
        //console.log("token", token)
        return res.json({status: 'success', message: 'User logged in successfully', token, user: chechUser});
    }catch(e){
        console.log(e);
    }
}

async function handleUserforgotPassword(req, res){
    const { email } = req.body;
    //console.log(email);
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.json({status: "User does not exist"});
        }
        const token = createTokenUser(user)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'dhruvrp1703@gmail.com',
              pass: 'rxcpitqjkyojenmz'
            }
          });
          
          var mailOptions = {
            from: 'dhruvrp1703@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:8080/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              //console.log(error);
            } else {
              //console.log('Email sent: ' + info.response);
              return res.json({message: "email sent", user, token})
            }
          });
    })
}

async function handleUserResetPassword(req, res) {
    const {id, token} = req.params;
    const {password} = req.body;
    const user = validateToken(token);
    //Check if the token is valid of not
    if (!user) return res.json({status: 'failure', message: 'invalid Token'});

    //Hashing password.
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate({_id:id}, { password: hashedPassword});
    return res.json({status:"success", message: "Password Updated Successfully"});
}

module.exports = { handleUserSignup, handleUserSignin, handleUserforgotPassword, handleUserResetPassword };
