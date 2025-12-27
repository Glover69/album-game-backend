import type { Context } from "hono";
import { GameQuestions } from "../services/game-questions.service";
import { Questions } from "../template/questions";
import { DailyGameService } from "../services/daily-game.service";
import { SpotifyAlbums } from "../services/spotify-albums.service";

// export const getQuestions = async (c: Context) => {
//     try {
//         const res = await GameQuestions.generateGameQuestions();
//         return c.json({questions: res.questions});
//         // return c.html(Questions({ questions: res.questions }));
//     } catch (err) {
//         console.error('Error in get questions:', err);
//         return c.json({ error: 'Failed to get questions' }, 500);
//     }
// }

export const generateDailyGame = async (c: Context) => {
  try {
    // // Verify this is called by Vercel Cron (security)
    // const authHeader = c.req.header("authorization");
    // const cronSecret = process.env.CRON_SECRET;

    // if (authHeader !== `Bearer ${cronSecret}`) {
    //   return c.json({ error: "Unauthorized" }, 401);
    // }

    console.log("🎮 Cron job triggered - generating daily game...");

    const gameData = await DailyGameService.generateDailyGame();

    return c.json({
      success: true,
      message: "Daily game generated",
      gameDate: gameData.generatedAt,
    });
  } catch (err) {
    console.error("Error in generateDailyGame:", err);
    return c.json({ error: "Failed to generate daily game" }, 500);
  }
};

// Frontend endpoint
export const getDailyQuestions = async (c: Context) => {
  try {
    const date = c.req.query("date");

    let gameData;
    if (date) {
      gameData = await DailyGameService.getGameByDate(date);
    } else {
      gameData = await DailyGameService.getTodaysGame();
    }

    if (!gameData) {
            return c.json({ 
                error: 'No game available for this date',
                message: 'The daily game has not been generated yet'
            }, 404); // or 503 if it's a temporary issue
        }

    return c.json(gameData);
  } catch (err) {
    console.error("Error in getDailyQuestions:", err);
    return c.json({ error: "Failed to fetch daily questions" }, 500);
  }
};
