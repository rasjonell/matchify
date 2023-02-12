import type { User } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
	}
	interface ImportMetaEnv {
		VITE_SPOTIFY_CLIENT_ID: string;
		VITE_SPOTIFY_REDIRECT_URI: string;
		VITE_SPOTIFY_CLIENT_SECRET: string;
	}
}

export {};
