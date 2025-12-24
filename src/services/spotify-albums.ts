import type { Album, AlbumsResponse, FinalAlbumList } from "../types/data";
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

    // Step 1. Get new releases list

    static async fetchNewReleases(): Promise<AlbumsResponse>{

        try {
            const res = await fetch(`${apiBaseURL}/browse/new-releases?offset=1&limit=50`, {
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


    static async fetchFromAlbumList(): Promise<any>{
        // Read file to get all albums

        const arr: FinalAlbumList[] = await Bun.file("src/data/afrobeats.json").json();
        const arr2: FinalAlbumList[] = await Bun.file("src/data/r&b--soul.json").json();
        
        const jointData: FinalAlbumList[] = [...arr, ...arr2];

        let count = 0;
        const maxAlbumsForSet = 25;
        const totalAlbums = arr.length + arr2.length;
        let selectedIndices: number[] = [];
        const finalList: FinalAlbumList[] = [];

        if(arr.length > 1){
            while (count < maxAlbumsForSet){
              let randomNo = getRandomIntInclusive(0, totalAlbums);
  
              if(selectedIndices.find(n => n == randomNo)){
                  randomNo = getRandomIntInclusive(0, totalAlbums)
              } else{
                  selectedIndices.push(randomNo);
              }
  
              const album: FinalAlbumList | undefined = jointData[randomNo];
              if (album) {
                  // console.log(album)
                  finalList.push(album);
                  count++;
              }
            }
        }

        return finalList;       
    }

    
}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


SpotifyAlbums.fetchFromAlbumList();