import { Hono } from "hono";
import { getNewReleases } from "../controllers/spotify-albums.controller";


const app = new Hono()

app.get('/get-new-releases', getNewReleases);

export default app;