import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  result: { type: mongoose.Schema.Types.ObjectId, ref: "Result", required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  selected_option: { type: Number, required: true },
  is_correct: { type: Boolean, required: true }
});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
