import { Hono } from "hono";
import { getAccessToken } from "../controllers/auth.controller";


const app = new Hono()

app.get('/token', getAccessToken);

export default app;