import { error, json } from '@sveltejs/kit';

import { UserModel } from '$lib/server/db/user.server';
import { SpotifyAPI } from '$lib/server/api/spotify.server';
import { InterestsModel } from '$lib/server/db/interests.server';
import { InteractionsModel } from '$lib/server/db/interactions.server';

import type { RequestHandler } from '../$types';

/**
 * handles `POST /api/auth/login`
 */
export const POST = (async ({ request, cookies }) => {
	try {
		const { code } = await request.json();
		const tokenData = await SpotifyAPI.getTokens(code);
		const profile = await SpotifyAPI.getProfileData(tokenData.access);
		const featureSet = await SpotifyAPI.getTrackFeatures(tokenData.access);
		const interactions = await SpotifyAPI.getTopArtistsAndGenres(
			tokenData.access
		);

		const interests = InterestsModel.mergeByAverage(featureSet);

		let user = await UserModel.getByIdAndUpdate(profile.id, tokenData);
		if (user) {
			await Promise.all([
				!user.interests
					? InterestsModel.create(user, interests)
					: InterestsModel.update(user.interests, interests),
				!user.interactions
					? InteractionsModel.create(user, interactions)
					: InteractionsModel.update(user.interactions, interactions),
			]);
		} else {
			user = await UserModel.create(profile, tokenData, interests);
		}

		cookies.set('session-id', user.id, { path: '/' });

		return json(user);
	} catch (err) {
		const asError = err as Error;
		console.error(asError);
		throw error(400, asError);
	}
}) satisfies RequestHandler;
