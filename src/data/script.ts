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
      image: item?.images.find((img: Image) => img.height === 640) ?? album.images[0],
      release_date: item?.release_date
    }) 

    return {
      id: item?.id,
      name: item?.name,
      artists: item?.artists.map((a: Artist) => a.name),
      image: item?.images.find((img: Image) => img.height === 640) ?? album.images[0],
      release_date: item?.release_date
    };
  }

  return null;
}

/* ---------------------------------------
   INPUT: ALBUM LIST
---------------------------------------- */


const albums = [
  { artist: "Boj", album: "Duplicity" },
  { artist: "Davido", album: "Timeless" },
  { artist: "Davido", album: "A Good Time" },
  { artist: "Davido", album: "A Better Time" },
  { artist: "Davido", album: "5ive" },
  { artist: "Burna Boy", album: "Love, Damini" },
  { artist: "Burna Boy", album: "African Giant" },
  { artist: "Burna Boy", album: "Twice As Tall" },
  { artist: "Burna Boy", album: "Outside" },
  { artist: "Burna Boy", album: "I Told Them..." },
  { artist: "Burna Boy", album: "No Sign Of Weakness" },
  { artist: "Wizkid", album: "Made In Lagos" },
  { artist: "Wizkid", album: "Made In Lagos: Deluxe Edition" },
  { artist: "Wizkid", album: "Ayo" },
  { artist: "Wizkid", album: "Sounds From The Other Side" },
  { artist: "Wizkid", album: "More Love, Less Ego" },
  { artist: "Wizkid", album: "Morayo" },
  { artist: "Asake", album: "Mr. Money With The Vibe" },
  { artist: "Asake", album: "Work Of Art" },
  { artist: "Asake", album: "Lungu Boy" },
  { artist: "Rema", album: "Rave & Roses Ultra" },
  { artist: "Rema", album: "HEIS" },
  { artist: "Rema", album: "RAVAGE" },
  { artist: "Ayra Starr", album: "19 & Dangerous (Deluxe)" },
  { artist: "Ayra Starr", album: "The Year I Turned 21" },
  { artist: "Fireboy DML", album: "Laughter, Tears & Goosebumps" },
  { artist: "Fireboy DML", album: "APOLLO" },
  { artist: "Fireboy DML", album: "Playboy" },
  { artist: "Fireboy DML", album: "adedamola" },
  { artist: "Tems", album: "For Broken Ears" },
  { artist: "Tems", album: "If Orange Was A Place" },
  { artist: "Tems", album: "Born in the Wild" },
  { artist: "Olamide", album: "Carpe Diem" },
  { artist: "Olamide", album: "UY Scuti" },
  { artist: "Olamide", album: "Unruly" },
  { artist: "Olamide", album: "Baddest Guy Ever Liveth" },
  { artist: "Olamide", album: "Olamidé" },
  { artist: "Adekunle Gold", album: "Gold" },
  { artist: "Adekunle Gold", album: "About 30" },
  { artist: "Adekunle Gold", album: "Catch Me If You Can" },
  { artist: "Adekunle Gold", album: "Tequila Ever After" },
  { artist: "Adekunle Gold", album: "Fuji" },
  { artist: "Kizz Daniel", album: "No Bad Songz" },
  { artist: "Kizz Daniel", album: "King Of Love" },
  { artist: "Kizz Daniel", album: "Barnabas" },
  { artist: "Kizz Daniel", album: "Maverick" },
  { artist: "Kizz Daniel", album: "Uncle K: Lemon Chase" },
  { artist: "Joeboy", album: "Somewhere Between Beauty & Magic" },
  { artist: "Joeboy", album: "Body & Soul" },
  { artist: "Joeboy", album: "Viva Lavida" },
  { artist: "BNXN", album: "Sorry I'm Late" },
  { artist: "BNXN", album: "Sincerely, Benson" },
  { artist: "BNXN", album: "CAPTAIN" },
  { artist: "Shallipopi", album: "Auracle" },
  { artist: "Shallipopi", album: "Shakespopi" },
  { artist: "Sarz", album: "Protect Sarz At All Costs" },
  { artist: "Zinoleesky", album: "Grit & Lust" },
  { artist: "Zinoleesky", album: "Gen Z" },
  { artist: "Mohbad", album: "Blessed" },
  { artist: "Lojay", album: "GANGSTER ROMANTIC" },
  { artist: "Black Sherif", album: "The Villain I Never Was" },
  { artist: "Black Sherif", album: "IRON BOY" },
  { artist: "Sarkodie", album: "Highest" },
  { artist: "Sarkodie", album: "Black Love" },
  { artist: "Sarkodie", album: "Jamz" },
  { artist: "Stonebwoy", album: "Anloga Junction" },
  { artist: "Stonebwoy", album: "5th Dimension" },
  { artist: "King Promise", album: "As Promised" },
  { artist: "King Promise", album: "5 Star" },
  { artist: "King Promise", album: "True To Self" },
  { artist: "Amaarae", album: "THE ANGEL YOU DON'T KNOW" },
  { artist: "Amaarae", album: "Fountain Baby" },
  { artist: "Amaarae", album: "BLACK STAR" },
  { artist: "Falz", album: "Moral Instruction" },
  { artist: "Falz", album: "Bahd Baddo Baddest" },
  { artist: "Pheelz", album: "Pheelz Good" },
  { artist: "Mayorkun", album: "The Mayor of Lagos" },
  { artist: "Mayorkun", album: "Back In Office" },
  { artist: "Tekno", album: "Old Romance" },
  { artist: "Yemi Alade", album: "Woman Of Steel" },
  { artist: "Yemi Alade", album: "Empress" },
  { artist: "Tiwa Savage", album: "Once Upon A Time" },
  { artist: "Tiwa Savage", album: "R.E.D" },
  { artist: "Tiwa Savage", album: "Celia" },
  { artist: "Tiwa Savage", album: "This One Is Personal" },
  { artist: "Victony", album: "Outlaw" },
  { artist: "Omah Lay", album: "Boy Alone (Deluxe Edition)" },
  { artist: "Ruger", album: "RU The World" },
  { artist: "Ruger", album: "RnB" },
  { artist: "Ruger", album: "The Second Wave (Deluxe)" },
  { artist: "Ruger", album: "BlownBoy RU" },
  { artist: "AratheJay", album: "The Odyssey" },
  { artist: "Peruzzi", album: "Huncho Vibez" },
  { artist: "Phyno", album: "Deal With It" },
  { artist: "Phyno", album: "Something to Live For" },
  { artist: "Basketmouth", album: "Yabasi" },
  { artist: "Wande Coal", album: "Realms" },
  { artist: "Wande Coal", album: "Legend Or No Legend" },
  { artist: "CKay", album: "Sad Romance" },
  { artist: "Chike", album: "Boo of the Booless" },
  { artist: "Chike", album: "The Brother's Keeper" },
  { artist: "Mr Eazi", album: "Life is Eazi, Vol. 1 - Accra To Lagos" },
  { artist: "Mr Eazi", album: "Life is Eazi, Vol. 2 - Lagos to London" },
  { artist: "Mr Eazi", album: "The Evil Genius" },
  { artist: "Niniola", album: "Colours And Sounds" },
  { artist: "ODUMODUBLVCK", album: "EZIOKWU" },
  { artist: "FAVE", album: "Dutty Love" },
  { artist: "Oxlade", album: "OFA (Oxlade From Africa)" },
  { artist: "Bella Shmurda", album: "Hypertension" },
  { artist: "Bella Shmurda", album: "Sanity" },
  { artist: "FOLA", album: "catharsis" },
  { artist: "Kunmie", album: "Before We Became Strangers" },
  { artist: "Magixx", album: "I Dream In Color" },
  { artist: "T.I BLAZE", album: "Shakur (Deluxe)" },
  { artist: "Seyi Vibez", album: "Children of Africa" },
  { artist: "Seyi Vibez", album: "FUJI MOTO" },
  { artist: "Seyi Vibez", album: "Billion Dollar Baby" },
  { artist: "Seyi Vibez", album: "Vibe Till Thy Kingdom Come" },
  { artist: "SPINALL", album: "ÈKÓ GROOVE" },
  { artist: "SPINALL", album: "Grace" },
  { artist: "Tyla", album: "TYLA +" },
  { artist: "ASAPH AFRIKA", album: "Viki 2 Viki" },
  { artist: "Teni", album: "WONDALAND" },
  { artist: "Sauti Sol", album: "Midnight Train" },
  { artist: "Sauti Sol", album: "Afrikan Sauce" },
  { artist: "Praiz", album: "Rich & Famous [Famous]" },
  { artist: "Zlatan", album: "Zanku" },
  { artist: "Timaya", album: "Gratitude" },
  { artist: "Reekado Banks", album: "Off The Record" },
  { artist: "Patoranking", album: "Wilmer" },
  { artist: "Patoranking", album: "Three" },
  { artist: "Flavour", album: "Afroculture" },
  { artist: "KCee", album: "Attention to Detail" },
  { artist: "Cuppy", album: "Original Copy" },
  { artist: "Seun Kuti", album: "Black Times" },
  { artist: "Femi Kuti", album: "One People One World" },
  { artist: "LADIPOE", album: "Providence" },
  { artist: "Majeeed", album: "Bitter Sweet" },
  { artist: "Qing Madi", album: "Qing Madi" },
  { artist: "Qing Madi", album: "I am the Blueprint" },
  { artist: "Blaqbonez", album: "Sex Over Love" },
  { artist: "Ice Prince", album: "Fire of Zamani" },
  { artist: "Kweku Smoke", album: "Kweku Jesus" },
  { artist: "Kweku Smoke", album: "Scatter Der" },
  { artist: "Kweku Smoke", album: "Born in Hell" },
  { artist: "Gyakie", album: "MY DIARY - EP" },
  { artist: "Gyakie", album: "After Midnight" }
];

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
        image: data?.image,
        release_date: data?.release_date
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
  await Bun.write("src/data/afrobeats.json", JSON.stringify(final, null, 2));
  console.log(`\n✅ JSON generated for ${results.length} items`);
}

run();