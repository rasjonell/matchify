declare global {
	namespace App {
		namespace Spotify {
			interface Profile {
				id: string;
				uri: string;
				name: string;
				image: string | null;
			}
		}
	}
}

export {};
