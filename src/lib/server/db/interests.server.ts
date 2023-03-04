import { DB } from './db.server';

import type { Interest, User } from '@prisma/client';

export const InterestsModel = {
	create,
	update,
	mergeByAverage,
};

function mergeByAverage(
	interests: API.Spotify.AudioFeatureData[],
): API.Spotify.AudioFeatureData {
	const avgObj: Partial<API.Spotify.AudioFeatureData> = {};
	const keys = Object.keys(interests[0]) as Array<
		keyof API.Spotify.AudioFeatureData
	>;

	for (const key of keys) {
		const sum = interests.reduce((prev, curr) => prev + curr[key], 0);
		avgObj[key] = sum / interests.length;
	}

	return avgObj as API.Spotify.AudioFeatureData;
}

async function create(
	user: User,
	interests: API.Spotify.AudioFeatureData,
): Promise<void> {
	DB.interest.create({
		data: {
			...interests,
			userId: user.id,
		},
	});
}

async function update(
	previousInterests: Interest,
	currentInterests: API.Spotify.AudioFeatureData,
): Promise<void> {
	const keys = Object.keys(currentInterests) as Array<
		keyof API.Spotify.AudioFeatureData
	>;

	const newInterests = keys.reduce(
		(prev, key) => ({
			...prev,
			[key]: (previousInterests[key] + currentInterests[key]) / 2,
		}),
		{} as Partial<Interest>,
	);

	DB.interest.update({
		where: {
			id: previousInterests.id,
		},
		data: newInterests,
	});
}
