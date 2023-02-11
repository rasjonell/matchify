import { PrismaClient, type User } from '@prisma/client';

const db = new PrismaClient();

export async function getUserBySpotifyId(id: string): Promise<User | null> {
	const user = await db.user.findFirst({
		where: {
			id,
		},
	});

	return user;
}

export async function create(
	data: App.Spotify.Profile,
	tokens: API.Spotify.TokenData
): Promise<User> {
	const user = await db.user.create({
		data: {
			...data,
			accessToken: tokens.access,
			refreshToken: tokens.refresh,
		},
	});

	return user;
}
