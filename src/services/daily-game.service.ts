import { DailyGame } from "../models/daily-game.models";
import type { GameQuestion, GameData } from "../types/data";
import { GameQuestions } from "./game-questions.service";

export class DailyGameService {
  // Generate date string (YYYY-MM-DD)
  private static getDateString(date: Date = new Date()): string | undefined {
    console.log(date)
    return date.toISOString().split('T')[0];
  }

  // Generate and save today's game to MongoDB
  public static async generateDailyGame(): Promise<GameData> {
    const today = this.getDateString();
    
    // Check if already exists
    const existing = await DailyGame.findOne({ generatedAt: today });
    if (existing) {
      console.log(`Daily game for ${today} already exists`);
      return {
        questions: existing.questions as GameQuestion[],
        totalQuestions: existing.totalQuestions,
        generatedAt: existing.generatedAt,
      };
    }

    // Shuffle and select questions
    const shuffledQuestions = await GameQuestions.generateGameQuestions()

    // Save to database
    const dailyGame = await DailyGame.create({
      questions: shuffledQuestions.questions,
      totalQuestions: shuffledQuestions.totalQuestions,
      generatedAt: shuffledQuestions.generatedAt
    });

    console.log(`✅ Generated and saved daily game for ${today}`);

    return {
      questions: dailyGame.questions as GameQuestion[],
      totalQuestions: dailyGame.totalQuestions,
      generatedAt: dailyGame.generatedAt,
    };
  }

  // Fetch game by date (used by frontend)
  public static async getGameByDate(date: string | undefined): Promise<GameData | null> {
    const game = await DailyGame.findOne({ generatedAt: date });
    
    if (!game) {
      return null;
    }

    return {
      questions: game.questions as GameQuestion[],
      totalQuestions: game.totalQuestions,
      generatedAt: game.generatedAt,
    };
  }

  // Get today's game
  public static async getTodaysGame(): Promise<GameData | null> {
    const today = this.getDateString();
    return this.getGameByDate(today);
  }
}