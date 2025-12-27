import { Hono } from "hono";
import { getNewReleases } from "../controllers/spotify-albums.controller";
import { generateDailyGame, getDailyQuestions } from "../controllers/game-questions.controller";


const app = new Hono()

app.get('/get-questions', getDailyQuestions);
app.get('/cron/generate-daily-game', generateDailyGame)

export default app;