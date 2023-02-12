import { PrismaClient, type User } from '@prisma/client';

const db = new PrismaClient();

export const UserModel = {
	create,
	getById,
	getByIdAndUpdate,
};

function getById(id: string): Promise<User | null> {
	return db.user.findFirst({
		where: {
			id,
		},
	});
}

async function getByIdAndUpdate(
	id: string,
	tokenData: API.Spotify.TokenData
): Promise<User | null> {
	const user = await getById(id);

	if (!user) {
		return null;
	}

	if (
		user.accessToken !== tokenData.access ||
		user.refreshToken !== tokenData.refresh
	) {
		const updatedUser = await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				accessToken: tokenData.access,
				refreshToken: tokenData.refresh,
			},
		});

		return updatedUser;
	}

	return user;
}

async function create(
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
