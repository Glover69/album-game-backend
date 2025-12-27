import { connectDB } from "../config/db";
import { DailyGameService } from "../services/daily-game.service";

async function generateDaily() {
  try {
    console.log("🎮 Running daily game generation...");
    
    await connectDB();
    await DailyGameService.generateDailyGame();
    
    console.log("✅ Daily game generated successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to generate daily game:", error);
    process.exit(1);
  }
}

generateDaily();