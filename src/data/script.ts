import { fetch } from "bun";


import { createObjectCsvWriter } from "csv-writer";
import { SpotifyAuthService, type AccessTokenResponse } from "../services/spotify-auth";
import type { AlbumsResponse, Artist, FinalAlbumList, Image } from "../types/data";

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let final: FinalAlbumList[] = [];

// Add validation
if (!clientID || !clientSecret) {
  throw new Error("CLIENT_ID and CLIENT_SECRET must be set in .env file");
}


/* ---------------------------------------
   SEARCH ALBUM
---------------------------------------- */
async function searchAlbum(artist: any, album: any) {
  const query = encodeURIComponent(`album:${album} artist:${artist}`);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=album&limit=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${await SpotifyAuthService.getAccessToken()}`,
    },
  });
  
  const data = await res.json() as AlbumsResponse;


  if (data.albums?.items?.length > 0) {
    const item = data.albums.items[0];

    final.push({
      id: item?.id,
      name: item?.name,
      artists: item?.artists.map((a: Artist) => a.name),
      image: item?.images.find((img: Image) => img.height === 640) ?? album.images[0]
    }) 

    return {
      id: item?.id,
      name: item?.name,
      artists: item?.artists.map((a: Artist) => a.name),
      image: item?.images.find((img: Image) => img.height === 640) ?? album.images[0]
    };
  }

  return null;
}

/* ---------------------------------------
   INPUT: ALBUM LIST
---------------------------------------- */


const albums = [
  { artist: "Frank Ocean", album: "Blonde" },
  { artist: "Frank Ocean", album: "Channel Orange" },
  { artist: "The Weeknd", album: "House of Balloons" },
  { artist: "The Weeknd", album: "After Hours" },
  { artist: "The Weeknd", album: "Starboy" },
  { artist: "The Weeknd", album: "Beauty Behind the Madness" },
  { artist: "The Weeknd", album: "Dawn FM" },
  { artist: "SZA", album: "SOS" },
  { artist: "SZA", album: "Ctrl" },
  { artist: "Bryson Tiller", album: "T R A P S O U L" },
  { artist: "Bryson Tiller", album: "Bryson Tiller" },
  { artist: "Bryson Tiller", album: "A N N I V E R S A R Y" },
  { artist: "Khalid", album: "American Teen" },
  { artist: "Khalid", album: "Free Spirit" },
  { artist: "Daniel Caesar", album: "Freudian" },
  { artist: "Daniel Caesar", album: "Case Study 01" },
  { artist: "Daniel Caesar", album: "Never Enough" },
  { artist: "H.E.R.", album: "Back of My Mind" },
  { artist: "H.E.R.", album: "H.E.R." },
  { artist: "H.E.R.", album: "I Used to Know Her" },
  { artist: "Jhené Aiko", album: "Souled Out" },
  { artist: "Jhené Aiko", album: "Trip" },
  { artist: "Jhené Aiko", album: "Chilombo" },
  { artist: "Jhené Aiko", album: "Sail Out" },
  { artist: "Summer Walker", album: "Over It" },
  { artist: "Summer Walker", album: "Still Over It" },
  { artist: "Summer Walker", album: "Finally Over It" },
  { artist: "Summer Walker", album: "Last Day of Summer" },
  { artist: "Brent Faiyaz", album: "Sonder Son" },
  { artist: "Brent Faiyaz", album: "Wasteland" },
  { artist: "Brent Faiyaz", album: "Larger Than Life" },
  { artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR" },
  { artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR TWO" },
  { artist: "PARTYNEXTDOOR", album: "P3" },
  { artist: "PARTYNEXTDOOR", album: "PARTYNEXTDOOR 4" },
  { artist: "Anderson .Paak", album: "Malibu" },
  { artist: "Anderson .Paak", album: "Ventura" },
  { artist: "Anderson .Paak", album: "Oxnard" },
  { artist: "Anderson .Paak", album: "Yes Lawd!" },
  { artist: "Masego", album: "Lady Lady" },
  { artist: "Masego", album: "Studying Abroad: Extended Stay" },
  { artist: "SiR", album: "Chasing Summer" },
  { artist: "SiR", album: "November" },
  { artist: "SiR", album: "HEAVY" },
  { artist: "Cleo Sol", album: "Rose in the Dark" },
  { artist: "Cleo Sol", album: "Mother" },
  { artist: "Cleo Sol", album: "Heaven" },
  { artist: "Cleo Sol", album: "Gold" },
  { artist: "SAULT", album: "5" },
  { artist: "SAULT", album: "7" },
  { artist: "SAULT", album: "Untitled (Black Is)" },
  { artist: "SAULT", album: "Untitled (Rise)" },
  { artist: "SAULT", album: "Nine" },
  { artist: "SAULT", album: "11" },
  { artist: "Kali Uchis", album: "Isolation" },
  { artist: "Kali Uchis", album: "Sin Miedo (del Amor y Otros Demonios)" },
  { artist: "Kali Uchis", album: "Red Moon in Venus" },
  { artist: "Kali Uchis", album: "Orquídeas" },
  { artist: "Lucky Daye", album: "Painted" },
  { artist: "Lucky Daye", album: "Candydrip" },
  { artist: "Lucky Daye", album: "Algorithm" },
  { artist: "Snoh Aalegra", album: "Ugh, those feels again" },
  { artist: "Snoh Aalegra", album: "TEMPORARY HIGHS IN THE VIOLET SKIES" },
  { artist: "Snoh Aalegra", album: "Feels" },
  { artist: "Mariah the Scientist", album: "Master" },
  { artist: "Mariah the Scientist", album: "Ry Ry World" },
  { artist: "Mariah the Scientist", album: "To Be Eaten Alive" },
  { artist: "Khamari", album: "A Brief Nirvana" },
  { artist: "Isaiah Falls", album: "Drugs 'n Lullabies" },
  { artist: "Joyce Wrice", album: "Overgrown" },
  { artist: "Joyce Wrice", album: "Motive" },
  { artist: "Usher", album: "Confessions" },
  { artist: "Usher", album: "8701" },
  { artist: "Usher", album: "Raymond v Raymond" },
  { artist: "Usher", album: "Coming Home" },
  { artist: "Chris Brown", album: "F.A.M.E." },
  { artist: "Chris Brown", album: "X" },
  { artist: "Chris Brown", album: "Indigo" },
  { artist: "Chris Brown", album: "11:11" },
  { artist: "Alicia Keys", album: "The Diary of Alicia Keys" },
  { artist: "Alicia Keys", album: "Songs in A Minor" },
  { artist: "Alicia Keys", album: "As I Am" },
  { artist: "Alicia Keys", album: "ALICIA" },
  { artist: "John Legend", album: "Get Lifted" },
  { artist: "John Legend", album: "Once Again" },
  { artist: "John Legend", album: "Evolver" },
  { artist: "John Legend", album: "Legend" },
  { artist: "Miguel", album: "Kaleidoscope Dream" },
  { artist: "Miguel", album: "Wildheart" },
  { artist: "Miguel", album: "War & Leisure" },
  { artist: "Kehlani", album: "SweetSexySavage" },
  { artist: "Kehlani", album: "It Was Good Until It Wasn't" },
  { artist: "Kehlani", album: "Blue Water Road" },
  { artist: "Jorja Smith", album: "Lost & Found" },
  { artist: "Jorja Smith", album: "Falling or Flying" },
  { artist: "6LACK", album: "FREE 6LACK" },
  { artist: "6LACK", album: "East Atlanta Love Letter" },
  { artist: "6LACK", album: "Since I Have a Lover" },
  { artist: "Giveon", album: "Give or Take" },
  { artist: "Giveon", album: "When It's All Said and Done" },
  { artist: "Musiq Soulchild", album: "Aijuswanaseing" },
  { artist: "Musiq Soulchild", album: "Juslisen" },
  { artist: "Lucky Daye", album: "Painted" },
  { artist: "Lucky Daye", album: "Candydrip" },
  { artist: "Lucky Daye", album: "Algorithm" },
  { artist: "Snoh Aalegra", album: "Ugh, those feels again" },
  { artist: "Snoh Aalegra", album: "TEMPORARY HIGHS IN THE VIOLET SKIES" },
  { artist: "Musiq Soulchild", album: "Aijuswanaseing" },
  { artist: "Musiq Soulchild", album: "Juslisen" },
  { artist: "Maxwell", album: "Urban Hang Suite" },
  { artist: "D'Angelo", album: "Voodoo" },
  { artist: "D'Angelo", album: "Brown Sugar" },
  { artist: "D'Angelo", album: "Black Messiah" },
  { artist: "Erykah Badu", album: "Baduizm" },
  { artist: "Erykah Badu", album: "Mama's Gun" },
  { artist: "Erykah Badu", album: "Baduizm (Special Edition)" },
  { artist: "Erykah Badu", album: "New Amerykah Part One" },
  { artist: "Jill Scott", album: "Who Is Jill Scott?" },
  { artist: "Jill Scott", album: "Beautifully Human" },
  { artist: "Lauryn Hill", album: "The Miseducation of Lauryn Hill" },
  { artist: "Mary J. Blige", album: "My Life" },
  { artist: "Mary J. Blige", album: "The Breakthrough" },
  { artist: "Jazmine Sullivan", album: "Heaux Tales" },
  { artist: "Jazmine Sullivan", album: "Reality Show" },
  { artist: "Jazmine Sullivan", album: "Fearless" },
  { artist: "Ari Lennox", album: "Shea Butter Baby" },
  { artist: "Ari Lennox", album: "age/sex/location" },
  { artist: "Victoria Monét", album: "JAGUAR II" },
  { artist: "Teyana Taylor", album: "K.T.S.E." },
  { artist: "Tinashe", album: "Aquarius" },
  { artist: "Tinashe", album: "Nightride" },
  { artist: "Tinashe", album: "Songs For You" },
  { artist: "Tinashe", album: "333" },
  { artist: "Kiana Ledé", album: "KIKI" },
  { artist: "Kiana Ledé", album: "Grudges" },
  { artist: "Chlöe", album: "In Pieces" },
  { artist: "Coco Jones", album: "What I Didn't Tell You" },
  { artist: "Sabrina Claudio", album: "About Time" },
  { artist: "Sabrina Claudio", album: "Truth Is" },
  { artist: "dvsn", album: "SEPT. 5TH" },
  { artist: "dvsn", album: "Morning After" },
  { artist: "dvsn", album: "A Muse In Her Feelings" },
  { artist: "Tank", album: "Savage" },
  { artist: "Tank", album: "Sex Love & Pain II" },
  { artist: "Ty Dolla $ign", album: "Free TC" },
  { artist: "Ty Dolla $ign", album: "Beach House 3" },
  { artist: "Gallant", album: "Ology" },
  { artist: "Gallant", album: "Sweet Insomnia" },
  { artist: "BJ the Chicago Kid", album: "In My Mind" },
  { artist: "BJ the Chicago Kid", album: "1123" },
  { artist: "Alex Isley", album: "Marigold" },
  { artist: "Alex Isley", album: "The Love/Art Memoirs" },
  { artist: "Charlotte Day Wilson", album: "ALPHA" },
  { artist: "Amber Mark", album: "Three Dimensions Deep" },
  { artist: "Lianne La Havas", album: "Lianne La Havas" },
  { artist: "Lianne La Havas", album: "Blood" },
  { artist: "Pip Millett", album: "When Everything Is Better, I'll Let You Know" },
  { artist: "Pip Millett", album: "Lost in June" },
  { artist: "Mahalia", album: "Love and Compromise" },
  { artist: "Mahalia", album: "IRL" },
  { artist: "Joy Crookes", album: "Skin" },
  { artist: "Raveena", album: "Lucid" },
  { artist: "Raveena", album: "Asha's Awakening" },
  { artist: "Elmiene", album: "Wait" },
  { artist: "Fana Hues", album: "Moth" },
  { artist: "Fana Hues", album: "Hues" },
  { artist: "Tendai", album: "The Rain" },
  { artist: "Qendresa", album: "Londra" },
  { artist: "Destin Conrad", album: "SUBMISSIVE" },
  { artist: "Destin Conrad", album: "COLORWAY" },
  { artist: "Jordan Ward", album: "FORWARD" },
  { artist: "Amaria", album: "All For You" },
  { artist: "Tommy Richman", album: "Coyote" },
  { artist: "Chase Shakur", album: "it's not you, it's me" },
  { artist: "Olivia Dean", album: "Messy" },
  { artist: "4batz", album: "u made me a st4r" },
  { artist: "BLK ODYSSY", album: "BLK Vintage" },
  { artist: "BLK ODYSSY", album: "Diamonds & Freaks" },
  { artist: "RIMON", album: "I Shine, U Shine" },
  { artist: "Gaidaa", album: "Overture" },
  { artist: "Tamera", album: "AFRODITE" },
  { artist: "Muni Long", album: "Public Displays of Affection" },
  { artist: "Lizzie Berchie", album: "feels" },
  { artist: "BINA.", album: "TBA" },
  { artist: "Leon Bridges", album: "Coming Home" },
  { artist: "Leon Bridges", album: "Good Thing" },
  { artist: "Leon Bridges", album: "Gold-Diggers Sound" },
  { artist: "Obongjayar", album: "Some Nights I Dream Of Doors" },
  { artist: "Obongjayar", album: "Which Way is Forward?" }
]

/* ---------------------------------------
   MAIN
---------------------------------------- */
async function run() {
  const results = [];

  for (const { artist, album } of albums) {
    try {
      const data = await searchAlbum(artist, album);


      results.push({
        id: data?.id || "",
        name: data?.name || "",
        artists: data?.artists || "",
        image: data?.image
      });

      if(data?.id){
        console.log(`✔ ${artist} — ${album}`);
      }else{
        console.log(`❌ ${artist} — ${album}`);
      }

      await new Promise((r) => setTimeout(r, 200)); // rate-limit safe
    } catch (err: any) {
      console.error(`✖ ${artist} — ${album}`, err.message);
    }
  }

  // Create final object and store in JSON file
  await Bun.write("src/data/r&b--soul.json", JSON.stringify(final, null, 2));
  console.log("\n✅ JSON generated");
}

run();