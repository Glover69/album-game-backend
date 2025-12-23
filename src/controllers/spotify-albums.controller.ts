import type { Context } from "hono";
import { SpotifyAlbums } from "../services/spotify-albums";


export const getNewReleases = async (c: Context) => {
    try {
        const res = await SpotifyAlbums.fetchNewReleases();
        return c.json({ albums: res.albums }, 200);
    } catch (err) {
        return c.json({ error: 'Failed to get new releases: ', err})
    }
}