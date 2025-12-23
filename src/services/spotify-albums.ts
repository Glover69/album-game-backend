import type { Album, AlbumsResponse } from "../types/data";
import { SpotifyAuthService } from "./spotify-auth";


const apiBaseURL = process.env.API_URL;


export class SpotifyAlbums {
    private static arrNewReleases: AlbumsResponse;


    /**
     * We're doing this curation in 3 phases: 
     *      1. Fetching new releases: Recently released alums from Spotify's curated list
     *      2. Fetch featured playlists: Gets Spotify's curated playlists (We just get the playlist ID's from 
     *      here for the next step)
     *      3.  For each playlist, we'll fetch its tracks so we can get the albums
     */

    static async fetchNewReleases(): Promise<AlbumsResponse>{

        // Step 1. Get new releases list
        try {
            const res = await fetch(`${apiBaseURL}/browse/new-releases?offset=1&limit=2`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await SpotifyAuthService.getAccessToken()}`
                }
            })

            if(!res.ok){
                throw new Error("Spotify fetching new releases error: " + res.status);
            }

            const data = await res.json() as AlbumsResponse;
            this.arrNewReleases = data;
            return data

        } catch (err){
            console.error('Failed to get new releases:', err);
            throw err;
        }
    }
}