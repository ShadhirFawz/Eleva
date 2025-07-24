import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
