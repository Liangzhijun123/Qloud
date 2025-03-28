const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
//const { createTokenUser } = require('../services/authentication');

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['USER', 'BUSINESSPERSON', 'ADMIN'],
        default: "USER"
    },
    // selection: { type: String, enum: ["have", "need"],default: "" },
});

// userSchema.pre("save", function(next){
//     const user = this;
//     if(!user.isModified("password")) return;
//     const salt = randomBytes(16).toString();
//     const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
//     this.salt = salt;
//     this.password = hashedPassword;
//     next();
// });


// userSchema.static('matchPasswordAndGenerateToken', async function(email, password){
//     const user = await this.findOne({email});
//     const salt  = user.salt;
//     const hashedPassword = user.password;
//     const userProvidedPassword = createHmac('sha256', salt).update(password).digest('hex');

//     if(userProvidedPassword !== hashedPassword) {
//         throw new Error("Incorrect password")
//     }
//     const token = createTokenUser(user)
//     return token
// });


const User = model('users', userSchema);

module.exports = { User }
