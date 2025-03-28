const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  selection: { type: String, required: true, enum: ["have", "need"] },
  personalAnswers: Object,
  businessAnswers: Object,
});

module.exports = mongoose.model("Question", QuestionSchema);
