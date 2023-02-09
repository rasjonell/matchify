declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface ImportMetaEnv {
		VITE_SPOTIFY_CLIENT_ID: string;
		VITE_SPOTIFY_CLIENT_SECRET: string;
	}
}

export {};
