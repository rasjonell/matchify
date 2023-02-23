import { DB } from './db.server';

export const UserModel = {
	create,
	getById,
	getByIdAndUpdate,
};

function getById(id: string): Promise<App.DB.UserWithRelations | null> {
	return DB.user.findFirst({
		where: {
			id,
		},
		include: {
			interests: true,
			interactions: true,
		},
	});
}

async function getByIdAndUpdate(
	id: string,
	tokenData: API.Spotify.TokenData
): Promise<App.DB.UserWithRelations | null> {
	const user = await getById(id);

	if (!user) {
		return null;
	}

	if (
		user.accessToken !== tokenData.access ||
		user.refreshToken !== tokenData.refresh
	) {
		const updatedUser = await DB.user.update({
			where: {
				id: user.id,
			},
			data: {
				accessToken: tokenData.access,
				refreshToken: tokenData.refresh,
			},
			include: {
				interests: true,
				interactions: true,
			},
		});

		return updatedUser;
	}

	return user;
}

async function create(
	data: App.Spotify.Profile,
	tokens: API.Spotify.TokenData,
	interests: API.Spotify.AudioFeatureData
): Promise<App.DB.UserWithRelations> {
	const user = await DB.user.create({
		data: {
			...data,
			interests: {
				create: interests,
			},
			accessToken: tokens.access,
			refreshToken: tokens.refresh,
		},
		include: {
			interests: true,
			interactions: true,
		},
	});

	return user;
}
