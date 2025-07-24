import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Exam from "../models/Exam.js";
import Question from "../models/Question.js";

dotenv.config();
await connectDB();

const seedExams = async () => {
  try {
    // Clear existing data
    await Exam.deleteMany();
    await Question.deleteMany();

    // 1. JavaScript Basics
    const jsExam = await Exam.create({
      title: "JavaScript Basics",
      description: "Test your fundamental JavaScript knowledge",
      imageUrl: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg",
    });

    const jsQuestions = [
      {
        exam: jsExam._id,
        question_text: "What is the output of `typeof null`?",
        options: ["'object'", "'null'", "'undefined'", "'number'"],
        correct_option: 0,
      },
      {
        exam: jsExam._id,
        question_text: "Which method removes the last array element?",
        options: ["pop()", "shift()", "slice()", "splice()"],
        correct_option: 0,
      },
      {
        exam: jsExam._id,
        question_text: "What does the '===' operator check?",
        options: ["Value only", "Type only", "Value and type", "Neither"],
        correct_option: 2,
      },
      {
        exam: jsExam._id,
        question_text: "Where is a variable with 'let' scoped?",
        options: ["Function", "Block", "Global", "Module"],
        correct_option: 1,
      },
      {
        exam: jsExam._id,
        question_text: "Which is NOT a JavaScript framework?",
        options: ["React", "Angular", "Laravel", "Vue"],
        correct_option: 2,
      },
    ];

    // 2. React.js
    const reactExam = await Exam.create({
      title: "React.js Fundamentals",
      description: "Assess your React component knowledge",
      imageUrl: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg",
    });

    const reactQuestions = [
      {
        exam: reactExam._id,
        question_text: "What hooks manage side effects?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correct_option: 1,
      },
      {
        exam: reactExam._id,
        question_text: "How do you pass data to child components?",
        options: ["State", "Context", "Props", "Redux"],
        correct_option: 2,
      },
      {
        exam: reactExam._id,
        question_text: "Which updates state correctly?",
        options: [
          "state.count = 5",
          "setState({count: 5})",
          "setCount(5)",
          "this.state.count = 5",
        ],
        correct_option: 2,
      },
      {
        exam: reactExam._id,
        question_text: "What does JSX compile to?",
        options: ["HTML", "Strings", "React.createElement", "DOM nodes"],
        correct_option: 2,
      },
      {
        exam: reactExam._id,
        question_text: "When does useEffect run?",
        options: [
          "Before render",
          "After render",
          "Only on mount",
          "When props change",
        ],
        correct_option: 1,
      },
    ];

    // 3. Node.js & Express
    const nodeExam = await Exam.create({
      title: "Node.js & Express",
      description: "Backend JavaScript concepts",
      imageUrl: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg",
    });

    const nodeQuestions = [
      {
        exam: nodeExam._id,
        question_text: "What is Node.js?",
        options: [
          "A frontend framework",
          "A JavaScript runtime",
          "A database",
          "A package manager",
        ],
        correct_option: 1,
      },
      {
        exam: nodeExam._id,
        question_text: "How do you handle POST data in Express?",
        options: ["req.query", "req.params", "req.body", "req.headers"],
        correct_option: 2,
      },
      {
        exam: nodeExam._id,
        question_text: "What does middleware do?",
        options: [
          "Handles errors",
          "Modifies request/response",
          "Connects to databases",
          "Renders views",
        ],
        correct_option: 1,
      },
      {
        exam: nodeExam._id,
        question_text: "Which is NOT a core module?",
        options: ["fs", "http", "express", "path"],
        correct_option: 2,
      },
      {
        exam: nodeExam._id,
        question_text: "What does npm stand for?",
        options: [
          "Node Package Manager",
          "Node Project Manager",
          "New Package Module",
          "Node Program Manager",
        ],
        correct_option: 0,
      },
    ];

    // 4. MongoDB
    const mongoExam = await Exam.create({
      title: "MongoDB Basics",
      description: "NoSQL database concepts",
      imageUrl: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg",
    });

    const mongoQuestions = [
      {
        exam: mongoExam._id,
        question_text: "MongoDB stores data as:",
        options: ["Tables", "Documents", "Graphs", "Key-values"],
        correct_option: 1,
      },
      {
        exam: mongoExam._id,
        question_text: "Which query finds all users?",
        options: [
          "db.users.find({})",
          "db.users.getAll()",
          "db.users.query('*')",
          "SELECT * FROM users",
        ],
        correct_option: 0,
      },
      {
        exam: mongoExam._id,
        question_text: "What is _id in MongoDB?",
        options: [
          "A required primary key",
          "An optional field",
          "A relational ID",
          "A temporary identifier",
        ],
        correct_option: 0,
      },
      {
        exam: mongoExam._id,
        question_text: "Which operator increments a value?",
        options: ["$add", "$inc", "$plus", "$increase"],
        correct_option: 1,
      },
      {
        exam: mongoExam._id,
        question_text: "What is sharding?",
        options: [
          "Data partitioning",
          "Data encryption",
          "Data validation",
          "Data compression",
        ],
        correct_option: 0,
      },
    ];

    // 5. Python
    const pythonExam = await Exam.create({
      title: "Python Programming",
      description: "Core Python concepts",
      imageUrl: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
    });

    const pythonQuestions = [
      {
        exam: pythonExam._id,
        question_text: "How do you create a list?",
        options: ["list = []", "list = ()", "list = {}", "list = <>"],
        correct_option: 0,
      },
      {
        exam: pythonExam._id,
        question_text: "What does 'self' refer to?",
        options: [
          "The class instance",
          "The parent class",
          "The module",
          "The return value",
        ],
        correct_option: 0,
      },
      {
        exam: pythonExam._id,
        question_text: "Which is NOT a Python framework?",
        options: ["Django", "Flask", "Spring", "FastAPI"],
        correct_option: 2,
      },
      {
        exam: pythonExam._id,
        question_text: "How do you start a virtual environment?",
        options: [
          "python -m venv env",
          "python create env",
          "python new venv",
          "python start virtualenv",
        ],
        correct_option: 0,
      },
      {
        exam: pythonExam._id,
        question_text: "What is PEP 8?",
        options: [
          "A package manager",
          "A style guide",
          "A compiler",
          "A framework",
        ],
        correct_option: 1,
      },
    ];

    // Insert all questions
    await Question.insertMany([
      ...jsQuestions,
      ...reactQuestions,
      ...nodeQuestions,
      ...mongoQuestions,
      ...pythonQuestions,
    ]);

    console.log("✅ 5 exam sets with 25 questions seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedExams();