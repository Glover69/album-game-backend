import type { Context } from "hono";
import { SpotifyAlbums } from "../services/spotify-albums";
import { AlbumList } from "../template/albums";
import type { FinalAlbumList, Image } from "../types/data";


export const getNewReleases = async (c: Context) => {
    try {
        const res = await SpotifyAlbums.fetchFromAlbumList();

        // const payload: FinalAlbumList[] = res.albums.items.map( album => ({
        //     id: album.id,
        //     name: album.name,
        //     artists: album.artists.map(a => a.name),
        //     image: album.images.find((img: Image) => img.height === 640) ?? album.images[2]
        // }))

        return c.html(AlbumList({ albums: res }));
    } catch (err) {
        console.error('Error in getNewReleases:', err);
        return c.json({ error: 'Failed to fetch albums' }, 500);
    }
}