import {
	TOKEN_URL,
	PROFILE_URL,
	TOP_TRACKS_URL,
	AUDIO_FEATURES_URL,
} from '$lib/constants/spotify';

import * as APIHelpers from './helpers.server';

export const SpotifyAPI = {
	getTokens,
	getProfileData,
	getTrackFeatures,
};

async function getTokens(code: string): Promise<API.Spotify.TokenData> {
	const data = await APIHelpers.fetchJSON<API.Spotify.TokenResponse>(
		null,
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
		accessToken,
		PROFILE_URL
	);

	return {
		id: profileData.id,
		uri: profileData.uri,
		name: profileData.display_name,
		image: profileData.images?.[0]?.url || null,
	};
}

async function getTrackFeatures(
	accessToken: string
): Promise<API.Spotify.AudioFeatureData[]> {
	const trackIds = await getTopTracks(accessToken);
	const searchParams = new URLSearchParams({
		ids: trackIds.join(','),
	});

	const audioFeatures =
		await APIHelpers.fetchJSON<API.Spotify.AudioFeaturesData>(
			accessToken,
			`${AUDIO_FEATURES_URL}?${searchParams}`
		);

	// Filtering out unused API Response fields
	return audioFeatures.audio_features.map(
		({ acousticness, danceability, energy, liveness, loudness, valence }) => ({
			energy,
			valence,
			liveness,
			loudness,
			acousticness,
			danceability,
		})
	);
}

// Private Functions

async function getTopTracks(
	accessToken: string
): Promise<Array<API.Spotify.TrackItemData['id']>> {
	const searchParams = new URLSearchParams({
		limit: '50',
		offset: '0',
		time_range: 'long_term',
	});

	const topTracksData = await APIHelpers.fetchJSON<API.Spotify.TopTracksData>(
		accessToken,
		`${TOP_TRACKS_URL}?${searchParams}`
	);

	return topTracksData.items.map((item) => item.id);
}
