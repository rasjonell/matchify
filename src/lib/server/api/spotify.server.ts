import { TOKEN_URL } from '$lib/constants/spotify';

import * as APIHelpers from './helpers.server';

export const SpotifyAPI = {
	getTokens,
	getProfileData,
};

async function getTokens(code: string): Promise<API.Spotify.TokenData> {
	const data = await APIHelpers.fetchJSON<API.Spotify.TokenResponse>(
		TOKEN_URL,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				code,
				grant_type: 'authorization_code',
				client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
				redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
				client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
			}),
		}
	);

	return {
		access: data.access_token,
		refresh: data.refresh_token,
	};
}

async function getProfileData(
	accessToken: string
): Promise<App.Spotify.Profile> {
	const profileData = await APIHelpers.fetchJSON<API.Spotify.ProfileData>(
		'https://api.spotify.com/v1/me',
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	return {
		id: profileData.id,
		uri: profileData.uri,
		name: profileData.display_name,
		image: profileData.images?.[0]?.url || null,
	};
}
