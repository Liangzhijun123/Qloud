const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
//const { createTokenUser } = require('../services/authentication');

const businessSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "BUSINESSPERSON", "ADMIN"],
    default: "BUSINESSPERSON",
  },
  selection: { type: String, enum: ["have", "need"], default: "need" },

  // Profile Details from Figma Design
  profileImage: { type: String, default: "" }, // Profile picture URL
  bio: { type: String, default: "" }, // Short description
  location: { type: String, default: "" },
  designation: { type: String, default: "" }, // CEO, Founder, etc.

  // Social Media Links
  socialLinks: {
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      discord: { type: String, default: "" },
      telegram: { type: String, default: "" },
  },

  // Business Metrics
  followers: [{ type: Schema.Types.ObjectId, ref: "businessperson" }], // List of users following this person
  connections: [{ type: Schema.Types.ObjectId, ref: "businessperson" }], // Mutually connected users
  fundsRaised: { type: String, default: "0" }, // Example: "3.5M", "1.2B"

  // Team Members
  team: [{ 
      name: String, 
      role: String, 
      status: { type: String, enum: ["Pending", "Accepted"], default: "Pending" }
  }]
}, { timestamps: true });


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



const Business = model("businessperson", businessSchema);

module.exports = { Business };
