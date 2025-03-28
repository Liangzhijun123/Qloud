const Question = require("../models/Question");
const { Business } = require("../models/businessModel");

exports.getPersonalQuestions = async (req, res) => {
  const userId = req.user._id; // Extract user ID from the authenticated user

  // Fetch the logged-in user's selection
  const user = await Business.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const selection = user.selection; // Get selection from the database

  if (!selection || !["have", "need"].includes(selection)) {
    return res
      .status(400)
      .json({ error: "Invalid selection parameter in user data" });
  }

  const questions =
    selection === "have"
      ? [
          { field: "age", question: "What's your age?", type: "number" },
          {
            field: "nationality",
            question: "Select Nationality",
            options: ["USA", "India", "UK", "Other"],
          },
          {
            field: "country",
            question: "Select Country",
            options: ["USA", "India", "UK", "Other"],
          },
          {
            field: "gender",
            question: "Select Gender",
            options: ["Male", "Female", "Other"],
          },
          {
            field: "skills",
            question: "Skills",
            options: ["Coding", "Marketing", "Design", "Finance"],
          },
          {
            field: "hobbies",
            question: "Hobbies",
            options: ["Reading", "Music", "Traveling"],
          },
          { field: "budget", question: "Budget", type: "number" },
          {
            field: "lifeStyle",
            question: " Which Lifestyle Preference would you prefer the most?",
            options: ["Solo", "Team", "Hybrid", "Remote"],
          },
        ]
      : [
          { field: "age", question: "What's your age?", type: "number" },
          {
            field: "nationality",
            question: "Select Nationality",
            options: ["USA", "India", "UK", "Other"],
          },
          {
            field: "country",
            question: "Select Country",
            options: ["USA", "India", "UK", "Other"],
          },
          {
            field: "gender",
            question: "Select Gender",
            options: ["Male", "Female", "Other"],
          },
          {
            field: "skills",
            question: "Skills",
            options: ["Coding", "Marketing", "Design", "Finance"],
          },
          {
            field: "hobbies",
            question: "Hobbies",
            options: ["Reading", "Music", "Traveling"],
          },
          { field: "budget", question: "Budget", type: "number" },
        ];

  res.json({ questions });
};

exports.getBusinessQuestions = async (req, res) => {
  const userId = req.user._id; // Extract user ID from the authenticated user

  // Fetch the logged-in user's selection
  const user = await Business.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const selection = user.selection; // Get selection from the database

  if (!selection || !["have", "need"].includes(selection)) {
    return res.status(400).json({ error: "Invalid selection parameter" });
  }

  const questions =
    selection === "have"
      ? [
          {
            field: "domain",
            question: "Select Your Domain",
            options: ["Technology", "Health", "Finance", "Education", "Other"],
          },
          {
            field: "stage",
            question: "Which stage would you consider your business in?",
            options: ["Foundation", "Development", "Launch"],
          },
          {
            field: "businessLocation",
            question: "Where is your business location?",
            options: ["USA", "India", "UK", "Other"],
          },
          {
            field: "targetCustomer",
            question: "Have you found your target customer base?",
            options: ["Yes", "No", "Partially"],
          },
        ]
      : [
          {
            field: "startedBusinessBefore",
            question: "Have you ever started a business before?",
            options: ["Yes", "No"],
          },
          {
            field: "productPreference",
            question:
              "Do you prefer selling physical products over digital products or services?",
            options: ["Yes", "No"],
          },
          {
            field: "moneyPreference",
            question:
              "Do you want your business to generate passive income over time?",
            options: ["Yes", "No"],
          },
          {
            field: "travelPreference",
            question:
              "Are you open to running a business that involves frequent travel?",
            options: ["Yes", "No"],
          },
          {
            field: "newBusiness",
            question:
              "Do you want to create something completely new (like an invention, app, or software)?",
            options: ["Yes", "No"],
          },
          {
            field: "customerInteraction",
            question:
              "Are you interested in a business that involves direct interaction with customers (e.g., coaching, consulting, retail)?",
            options: ["Yes", "No"],
          },
          {
            field: "recurringRevenue",
            question:
              "Would you prefer a business model that focuses on recurring revenue (subscriptions, memberships, SaaS)?",
            options: ["Yes", "No"],
          },
          {
            field: "automation",
            question:
              "Would you prefer a business that can run mostly on automation (like AI, SaaS, or dropshipping)?",
            options: ["Yes", "No"],
          },
          {
            field: "personalBranding",
            question: "Are you comfortable with being the face of your brand?",
            options: ["Yes", "No"],
          },
        ];

  res.json({ questions });
};

exports.saveAnswers = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the authenticated user

    const { personalAnswers, businessAnswers } = req.body;

    if (!userId || !selection || !["have", "need"].includes(selection)) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    // Ensure the user exists and is a BUSINESSPERSON
    const user = await Business.findById(userId);
    const selection = user.selection; // Get selection from the database

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "BUSINESSPERSON") {
      return res.status(403).json({
        error: "Access denied. Only business users can submit answers.",
      });
    }

    const questionData = new Question({
      userId,
      selection,
      personalAnswers,
      businessAnswers,
    });
    await questionData.save();

    res.status(201).json({ message: "Answers saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error saving answers" });
  }
};
