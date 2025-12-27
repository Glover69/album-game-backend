import type { Album, AlbumsResponse, FinalAlbumList } from "../types/data";
import { SpotifyAuthService } from "./spotify-auth.service";


const apiBaseURL = process.env.API_URL;



export class SpotifyAlbums {
    // private static arrNewReleases: AlbumsResponse;

    //static async fetchNewReleases(): Promise<AlbumsResponse>{
    //
    //    try {
    //        const res = await fetch(`${apiBaseURL}/browse/new-releases?offset=1&limit=50`, {
    //            method: 'GET',
    //            headers: {
    //                'Authorization': `Bearer ${await SpotifyAuthService.getAccessToken()}`
    //            }
    //        })
    //
    //        if(!res.ok){
    //            throw new Error("Spotify fetching new releases error: " + res.status);
    //        }
    //
    //        const data = await res.json() as AlbumsResponse;
    //        this.arrNewReleases = data;
    //        return data
    //
    //    } catch (err){
    //        console.error('Failed to get new releases:', err);
    //        throw err;
    //    }
    //}


    static async fetchFromAlbumList(): Promise<FinalAlbumList[]>{
        // Read file to get all albums
        
        const jointData = await addAlbumListsTogether();

        let count = 0;
        const maxAlbumsForSet = 50;
        const totalAlbums = jointData.length;
        let selectedIndices: number[] = [];
        const finalList: FinalAlbumList[] = [];

        if(jointData.length > 1){
            while (count < maxAlbumsForSet){
              let randomNo = getRandomIntInclusive(0, totalAlbums);
  
              while(selectedIndices.find(n => n == randomNo)){
                  randomNo = getRandomIntInclusive(0, totalAlbums)
              }

              selectedIndices.push(randomNo);
              
  
              const album: FinalAlbumList | undefined = jointData[randomNo];
              if (album) {
                  finalList.push(album);
                  count++;
              }
            }
        }

        return finalList;       
    }

    static async getListOfAllArtists(): Promise<string[]>{
        const jointData: FinalAlbumList[] = await addAlbumListsTogether();
        let names: string[] = [];

        for(const item of jointData){
            if(item && item.artists && item.artists[0]){
              names.push(item.artists[0]);
            }
        }
        
        // Removing duplicates
        const final = names.filter((i, index) => {
            return names.indexOf(i) == index;
        })

        // console.log(final);
        return final;
    }

    
}


// Helper function to generate random integers b/n set intervals

export function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Helper function to add all genres together into one

async function addAlbumListsTogether(): Promise<FinalAlbumList[]>{
    const arr: FinalAlbumList[] = await Bun.file("src/data/afrobeats.json").json();
    const arr2: FinalAlbumList[] = await Bun.file("src/data/r&b--soul.json").json();
        
    return [...arr, ...arr2];
}


SpotifyAlbums.getListOfAllArtists();