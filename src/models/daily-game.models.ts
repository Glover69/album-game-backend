import mongoose from "mongoose";

const gameQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  albumCover: { type: String, required: true },
  albumName: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  options: { type: [String], required: true },
  genre: { type: String },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: false },
  releaseDate: { type: String }
});

const dailyGameSchema = new mongoose.Schema({
  questions: { type: [gameQuestionSchema], required: true },
  totalQuestions: { type: Number, required: true },
  generatedAt: { type: String, required: true, unique: true  }
});

export const DailyGame = mongoose.model("daily-games", dailyGameSchema);