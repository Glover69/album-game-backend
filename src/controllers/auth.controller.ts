import type { Context } from "hono";
import { SpotifyAuthService } from "../services/spotify-auth"


export const getAccessToken = async (c: Context) => {
    try {
        const res = await SpotifyAuthService.getAccessToken();
        return c.json({ access_token: res }, 200);
    } catch (err) {
        return c.json({ error: 'Failed to get access token: ', err})
    }
}