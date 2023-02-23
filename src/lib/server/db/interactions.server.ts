import type { Interactions, User } from '@prisma/client';
import { DB } from './db.server';

export const InteractionsModel = {
	create,
	update,
};

async function create(
	user: User,
	interactions: API.Spotify.ArtistsAndGenresData
): Promise<Interactions> {
	return DB.interactions.create({
		data: {
			...interactions,
			userId: user.id,
		},
	});
}

async function update(
	previousInteractions: Interactions,
	currentInteractions: API.Spotify.ArtistsAndGenresData
): Promise<Interactions> {
	return DB.interactions.update({
		where: {
			id: previousInteractions.id,
		},
		data: currentInteractions,
	});
}
