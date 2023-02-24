declare global {
	namespace API {
		namespace Spotify {
			type ExternalURL = string;
			type ExternalURLs = {
				spotify: ExternalURL;
				[key: string]: ExternalURL;
			};

			type FollowerData = {
				total: number;
				href: ExternalURL | null;
			};

			type Image = {
				url: string;
				width: number | null;
				height: number | null;
			};

			interface TokenResponse {
				access_token: string;
				refresh_token: string;
			}

			interface TokenData {
				access: string;
				refresh: string;
			}

			interface ProfileData {
				id: string;
				uri: string;
				href: string;
				type: string;
				images: Image[];
				display_name: string;
				followers: FollowerData;
				external_urls: ExternalURLs;
			}

			interface TrackItemData {
				id: string;
			}

			interface ArtistItemData {
				name: string;
				genres: string[];
			}

			interface ArtistsAndGenresData {
				artists: string[];
				genres: string[];
			}

			interface TopItemsData<T extends TrackItemData | ArtistItemData> {
				items: T[];
				total: number;
				limit: number;
				offset: number;
				prev: string | null;
				next: string | null;
			}

			interface AudioFeatureData {
				energy: number;
				valence: number;
				liveness: number;
				loudness: number;
				speechiness: number;
				acousticness: number;
				danceability: number;
				instrumentalness: number;
			}

			interface AudioFeaturesData {
				audio_features: AudioFeatureData[];
			}
		}
	}
}

export {};
