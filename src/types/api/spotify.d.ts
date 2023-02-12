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
		}
	}
}

export {};
