import { Hono } from "hono";
import { getNewReleases } from "../controllers/spotify-albums.controller";
import { getQuestions } from "../controllers/game-questions.controller";


const app = new Hono()

app.get('/get-questions', getQuestions);

export default app;