import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }, // URL for the exam's logo
});

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
