import { Hono } from "hono";
import authRoutes from "./src/routes/auth.routes";
import spotifyAlbumRoutes from "./src/routes/spotify-albums.routes"
import { logger } from "hono/logger";
import gameQuestionsRoutes from "./src/routes/game-questions.routes";
import { cors } from "hono/cors";
import { connectDB } from "./src/config/db";

console.log("Hello via Bun!");

const app = new Hono()

connectDB()

app.use('*', cors({
  origin: ['http://localhost:4200', 'https://uncoverrr.vercel.app'], // Your frontend URLs
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

app.use('*', logger());

app.route('/api/auth', authRoutes);
app.route('/api/albums', spotifyAlbumRoutes)
app.route('/api/game', gameQuestionsRoutes)

app.get('/health', (c) => {
  return c.json({ status: 'ok', message: 'Server is up and running!' })
})

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3030,
})





// export default app;