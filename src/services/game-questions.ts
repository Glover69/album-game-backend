import { randomUUIDv5 } from "bun";
import { getRandomIntInclusive, SpotifyAlbums } from "./spotify-albums";
import type { GameData, GameQuestion } from "../types/data";

export class GameQuestions {
  // Convert albums into game format questions

  static async generateGameQuestions(): Promise<GameData> {
    const albums = await SpotifyAlbums.fetchFromAlbumList();
    const artists = await SpotifyAlbums.getListOfAllArtists();

    let count = 0;

    let questions: GameQuestion[] = [];
    let gameData!: GameData;

    if (albums && artists) {
      while (count < albums.length) {
        let randomOne = getRandomIntInclusive(0, artists.length);
        let randomTwo = getRandomIntInclusive(0, artists.length);
        let randomThree = getRandomIntInclusive(0, artists.length);

        const options = new Set(
            [
              artists[randomOne],
              artists[randomTwo],
              artists[randomThree],
              albums[count]?.artists?.[0],
            ].filter((option): option is string => Boolean(option))
        );

        const shuffledOptions = shuffleArray(Array.from(options));


        const object = {
          id: `question-${randomUUIDv5("www.example.com", "url")}`,
          albumCover: albums[count]?.image?.url || "",
          albumName: albums[count]?.name || "",
          correctAnswer: albums[count]?.artists?.[0] || "",
          options: shuffledOptions,
          releaseDate: albums[count]?.release_date
        }

        // Push structured object + update count
        questions.push(object);
        count++
      }

      gameData = {
          questions: questions,
          totalQuestions: questions.length,
          generatedAt: new Date(),
      };
    } else {
      console.error("An error occured: Artists or Albums array(s) are empty!");
    }

    // console.log(gameData);
    return gameData;
  }
}


// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  return shuffled;
}

// GameQuestions.generateGameQuestions();
