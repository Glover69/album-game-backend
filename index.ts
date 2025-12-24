import { Hono } from "hono";
import authRoutes from "./src/routes/auth.routes";
import spotifyAlbumRoutes from "./src/routes/spotify-albums.routes"
import { logger } from "hono/logger";
import gameQuestionsRoutes from "./src/routes/game-questions.routes";

console.log("Hello via Bun!");

const app = new Hono()

app.use('*', logger());

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3030,
})

app.route('/api/auth', authRoutes);
app.route('/api/albums', spotifyAlbumRoutes)
app.route('/api/game', gameQuestionsRoutes)




export default app;