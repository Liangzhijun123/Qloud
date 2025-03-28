const express = require("express");
const { getPersonalQuestions, getBusinessQuestions, saveAnswers } = require("../controllers/questionController");
const { authenticateUser, authorizeBusiness } = require("../middlewares/authentication");

const router = express.Router();

// Business users get different questions based on selection
router.get("/personal-questions", authenticateUser, authorizeBusiness, getPersonalQuestions);
router.get("/business-questions", authenticateUser, authorizeBusiness, getBusinessQuestions);

// Save answers for selected questions
router.post("/save-answers", authenticateUser, authorizeBusiness, saveAnswers);

module.exports = router;