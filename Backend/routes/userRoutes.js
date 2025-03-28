const express = require("express");
const { selectBusiness } = require("../controllers/businessControllers");
const { authenticateUser, authorizeBusiness } = require("../middlewares/authentication");

const router = express.Router();

// Restrict this route to authenticated Business Users only
router.post("/select-business", authenticateUser, authorizeBusiness, selectBusiness);

module.exports = router;
