declare global {
	namespace App {
		interface Locals {
			user: App.DB.UserWithRelations | null;
		}
	}
	interface ImportMetaEnv {
		VITE_PROFILE_URL: string;
		VITE_SPOTIFY_CLIENT_ID: string;
		VITE_SPOTIFY_REDIRECT_URI: string;
		VITE_SPOTIFY_CLIENT_SECRET: string;
	}
}

export {};
