import type { User } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
	}
	namespace API {
		namespace Spotify {
			interface TokenData {
				access: string;
				refresh: string;
			}

			interface ProfileData {
				id: string;
				uri: string;
				href: string;
				type: string;
				display_name: string;
				followers: {
					total: number;
					href: string | null;
				};
				external_urls: {
					spotify: string;
				};
				images: Array<{
					url: string;
					width: number | null;
					height: number | null;
				}>;
			}
		}
	}

	interface ImportMetaEnv {
		VITE_SPOTIFY_CLIENT_ID: string;
		VITE_SPOTIFY_REDIRECT_URI: string;
		VITE_SPOTIFY_CLIENT_SECRET: string;
	}
}

export {};
