import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  question_text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct_option: { type: Number, required: true } // index (0,1,2,3)
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
