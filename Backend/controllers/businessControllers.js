//console.log(trial)
const { Business } = require("../models/businessModel");
const { createHmac, randomBytes } = require("crypto");
const {
  createTokenUser,
  validateToken,
} = require("../services/authentication");
const bcrypt = require("bcrypt");

var nodemailer = require("nodemailer");

// Password validation regex
const passwordPattern =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

async function handleBusinessPersonSignup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  //console.log(firstName, lastName, email, password);

  try {
    const checkBusinessPerson = await Business.findOne({ email });
    //console.log("CheckUser", checkUser);
    if (checkBusinessPerson)
      return res.json({
        status: "failure",
        message: "Business Person already exists",
      });

    // Check if password meets the requirements
    if (!passwordPattern.test(password)) {
      return res.json({
        status: "failure",
        message:
          "Password must be 9-15 characters long, start with a capital letter, include a special character, and contain at least one number.",
      });
    }

    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await Business.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "BUSINESSPERSON",
    });
    //console.log(result);
    return res
      .status(201)
      .json({ status: "success", message: `Business added successfully` });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function handleBusinessPersonSignin(req, res) {
  const { email, password } = req.body;
  //console.log(email);

  try {
    //Check if user exists
    const chechBusinessPerson = await Business.findOne({ email });
    if (!chechBusinessPerson)
      return res.json({
        status: "failure",
        message: "Business Person does not exist",
      });
    //console.log(chechUser);

    //To check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      chechBusinessPerson.password
    ); // Assuming `password` in the database is hashed
    if (!isPasswordCorrect) {
      return res.json({ status: "failure", message: "Incorrect password" });
    }

    //Generating the token.
    const token = createTokenUser(chechBusinessPerson);

    //return token
    //console.log("token", token)
    return res.json({
      status: "success",
      message: "Business Person logged in successfully",
      token,
      businessPerson: chechBusinessPerson,
    });
  } catch (e) {
    console.log(e);
  }
}

async function handleBusinessPersonforgotPassword(req, res) {
  const { email } = req.body;
  //console.log(email);
  Business.findOne({ email: email }).then((businessPerson) => {
    if (!businessPerson) {
      return res.json({ status: "Business Person does not exist" });
    }
    const token = createTokenUser(user);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dhruvrp1703@gmail.com",
        pass: "rxcpitqjkyojenmz",
      },
    });

    var mailOptions = {
      from: "dhruvrp1703@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:8080/reset-password/${Business._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        //console.log(error);
      } else {
        //console.log('Email sent: ' + info.response);
        return res.json({ message: "email sent", businessPerson, token });
      }
    });
  });
}

async function handlebusinessPersonResetPassword(req, res) {
  const { id, token } = req.params;
  const { password } = req.body;
  const businessPerson = validateToken(token);
  //Check if the token is valid of not
  if (!businessPerson)
    return res.json({ status: "failure", message: "invalid Token" });

  //Hashing password.
  const salt = 12;
  const hashedPassword = await bcrypt.hash(password, salt);
  await Business.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
  return res.json({
    status: "success",
    message: "Password Updated Successfully",
  });
}

async function selectBusiness(req, res) {
  try {
    const { _id } = req.user;
    console.log(_id);
    const { selection } = req.body;

    if (!_id || !selection) {
      return res
        .status(400)
        .json({ error: "User ID and selection are required" });
    }

    const user = await Business.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.selection = selection;
    await user.save();

    res.json({ message: "Selection updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBusinessProfile(req, res) {
  try {
    console.log("Authenticated User:", req.user);

    const { _id } = req.user; // Extract _id from authenticated user
    const { bio, location, designation } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id ,
      { bio, location, designation },
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Profile updated successfully",
        businessPerson: updatedBusiness,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function updateBusinessSocialLinks(req, res) {
  try {
    const { _id  } = req.user;
    const { instagram, linkedin, discord, telegram } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id ,
      {
        socialLinks: { instagram, linkedin, discord, telegram },
      },
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Social links updated successfully",
        businessPerson: updatedBusiness,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function updateProfilePicture(req, res) {
  try {
    const { _id } = req.user;
    const { profileImage } = req.body; // Expecting image URL

    if (!profileImage) {
      return res
        .status(400)
        .json({ status: "failure", message: "Profile image URL is required" });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      { profileImage },
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Profile picture updated successfully",
        businessPerson: updatedBusiness,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function updateBusinessStats(req, res) {
  try {
    const { _id } = req.user;
    const {
      newConnections,
      removeConnections,
      newFollowers,
      removeFollowers,
      fundsRaised,
    } = req.body;

    const updateFields = {};

    // Update connections (Add new & Remove old)
    if (newConnections?.length) {
      updateFields.$addToSet = { connections: { $each: newConnections } };
    }
    if (removeConnections?.length) {
      updateFields.$pull = { connections: { $in: removeConnections } };
    }

    // Update followers (Add new & Remove old)
    if (newFollowers?.length) {
      updateFields.$addToSet = {
        ...updateFields.$addToSet,
        followers: { $each: newFollowers },
      };
    }
    if (removeFollowers?.length) {
      updateFields.$pull = {
        ...updateFields.$pull,
        followers: { $in: removeFollowers },
      };
    }

    // Update fundsRaised
    if (fundsRaised) {
      updateFields.fundsRaised = fundsRaised;
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Business statistics updated successfully",
      businessPerson: updatedBusiness,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function addTeamMember(req, res) {
  try {
    const { _id } = req.user;
    const { teamMemberId } = req.body;

    if (!teamMemberId) {
      return res
        .status(400)
        .json({ status: "failure", message: "Team member ID is required" });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      { $addToSet: { team: teamMemberId } }, // Ensures no duplicates
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Team member added successfully",
        businessPerson: updatedBusiness,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function removeTeamMember(req, res) {
  try {
    const { _id } = req.user;
    const { teamMemberId } = req.body;

    if (!teamMemberId) {
      return res
        .status(400)
        .json({ status: "failure", message: "Team member ID is required" });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      _id,
      { $pull: { team: teamMemberId } }, // Removes from the array
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Team member removed successfully",
        businessPerson: updatedBusiness,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function followBusinessPerson(req, res) {
  try {
    const { _id } = req.user; // Authenticated user
    const { followId } = req.body; // ID of the person to follow

    if (_id === followId) {
      return res
        .status(400)
        .json({ status: "failure", message: "You cannot follow yourself" });
    }

    // Add followId to the followers list of the target user
    const followedPerson = await Business.findByIdAndUpdate(
      followId,
      { $addToSet: { followers: _id } }, // Prevent duplicates
      { new: true }
    );

    if (!followedPerson) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Followed successfully",
        followedPerson,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function unfollowBusinessPerson(req, res) {
  try {
    const { _id } = req.user;
    const { followId } = req.body;

    // Remove _id from the followers list of the target user
    const updatedPerson = await Business.findByIdAndUpdate(
      followId,
      { $pull: { followers: _id } },
      { new: true }
    );

    if (!updatedPerson) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({
        status: "success",
        message: "Unfollowed successfully",
        updatedPerson,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function sendConnectionRequest(req, res) {
  try {
    const { _id } = req.user;
    const { connectionId } = req.body;

    if (_id === connectionId) {
      return res
        .status(400)
        .json({
          status: "failure",
          message: "You cannot connect with yourself",
        });
    }

    // Check if already connected
    const existingConnection = await Business.findOne({
      _id: _id,
      connections: connectionId,
    });

    if (existingConnection) {
      return res
        .status(400)
        .json({ status: "failure", message: "Already connected" });
    }

    // Add both users to each other's connections
    await Business.findByIdAndUpdate(_id, {
      $addToSet: { connections: connectionId },
    });
    await Business.findByIdAndUpdate(connectionId, {
      $addToSet: { connections: _id },
    });

    return res
      .status(200)
      .json({
        status: "success",
        message: "Connection request sent successfully",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function removeConnection(req, res) {
  try {
    const { _id } = req.user;
    const { connectionId } = req.body;

    // Remove each user from the other's connections list
    await Business.findByIdAndUpdate(_id, {
      $pull: { connections: connectionId },
    });
    await Business.findByIdAndUpdate(connectionId, {
      $pull: { connections: _id },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Connection removed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function getFollowers(req, res) {
  try {
    const { _id } = req.params;

    const businessPerson = await Business.findById(_id).populate(
      "followers",
      "firstName lastName email"
    );

    if (!businessPerson) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({ status: "success", followers: businessPerson.followers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

async function getConnections(req, res) {
  try {
    const { _id } = req.params;

    const businessPerson = await Business.findById(_id).populate(
      "connections",
      "firstName lastName email"
    );

    if (!businessPerson) {
      return res
        .status(404)
        .json({ status: "failure", message: "Business person not found" });
    }

    return res
      .status(200)
      .json({ status: "success", connections: businessPerson.connections });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
}

module.exports = {
  handleBusinessPersonSignup,
  handleBusinessPersonSignin,
  handleBusinessPersonforgotPassword,
  handlebusinessPersonResetPassword,
  selectBusiness,
  updateBusinessProfile,
  updateBusinessSocialLinks,
  updateProfilePicture,
  updateBusinessStats,
  addTeamMember,
  removeTeamMember,
  followBusinessPerson,
  unfollowBusinessPerson,
  sendConnectionRequest,
  removeConnection,
  getFollowers,
  getConnections,
};
