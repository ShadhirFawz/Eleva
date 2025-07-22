import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
