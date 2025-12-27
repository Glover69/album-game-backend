import { fetch } from "bun";


export type AccessTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const apiBaseURL = process.env.API_BASE_URL;

export class SpotifyAuthService {
    private static cachedToken: string;
    private static tokenExpiry: number = 0;

    static async getAccessToken(): Promise<string>{

        // Return the stored token if it's still valid
        if (this.cachedToken && Date.now() < this.tokenExpiry) {
            return this.cachedToken;
        }

        const combineClientVars = clientID + ":" + clientSecret;
        const base64encode = btoa(combineClientVars);

        // Hits Spotify API endpoint to refresh token when time is less than 5 minutes, or we're doing so
        // for the first time 
    
        if (this.tokenExpiry < (this.tokenExpiry - 300 * 1000) || !this.cachedToken){
            try{
            const res = await fetch(`${apiBaseURL}/token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64encode}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            })

            if(!res.ok){
                throw new Error("Spotify API error: " + res.status);
            }

            const data = await res.json() as AccessTokenResponse;

            if(data){
                this.cachedToken = data.access_token;
                this.tokenExpiry = Date.now() + (data.expires_in * 1000);
            }


           } catch (err) {
               console.error('Failed to get access token:', err);
               throw err;
           }
        }

        return this.cachedToken;

    }
}
