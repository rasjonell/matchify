import { TOKEN_URL } from '$lib/constants/spotify';

export const SpotifyAPI = {
	getTokens,
	getProfileData,
};

async function getTokens(code: string): Promise<API.Spotify.TokenData> {
	const response = await fetch(TOKEN_URL, {
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
	});

	const data = await response.json();
	return {
		access: data.access_token,
		refresh: data.refresh_token,
	};
}

async function getProfileData(
	accessToken: string
): Promise<App.Spotify.Profile> {
	const profileResponse = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const profileData = (await profileResponse.json()) as API.Spotify.ProfileData;
	return {
		id: profileData.id,
		uri: profileData.uri,
		name: profileData.display_name,
		image: profileData.images?.[0]?.url || null,
	} as App.Spotify.Profile;
}
