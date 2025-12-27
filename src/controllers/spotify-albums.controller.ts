import type { Context } from "hono";
import { SpotifyAlbums } from "../services/spotify-albums.service";
import { AlbumList } from "../template/albums";
import type { FinalAlbumList, Image } from "../types/data";


export const getNewReleases = async (c: Context) => {
    try {
        const res = await SpotifyAlbums.fetchFromAlbumList();

        return c.html(AlbumList({ albums: res }));
    } catch (err) {
        console.error('Error in getNewReleases:', err);
        return c.json({ error: 'Failed to fetch albums' }, 500);
    }
}