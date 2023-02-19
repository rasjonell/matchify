import { json } from '@sveltejs/kit';

import { UserModel } from '$lib/server/db/user.server';
import { SpotifyAPI } from '$lib/server/api/spotify.server';
import { InterestsModel } from '$lib/server/db/interests.server';

import type { RequestHandler } from '../$types';

/**
 * handles `POST /api/auth/login`
 */
export const POST = (async ({ request, cookies }) => {
	const { code } = await request.json();
	const tokenData = await SpotifyAPI.getTokens(code);
	console.log('tokenData', tokenData);
	const profile = await SpotifyAPI.getProfileData(tokenData.access);
	console.log('profile', profile);
	const featureSet = await SpotifyAPI.getTrackFeatures(tokenData.access);
	console.log('featureset', featureSet.length);
	const interests = InterestsModel.mergeByAverage(featureSet);
	console.log('interests', interests);

	let user = await UserModel.getByIdAndUpdate(profile.id, tokenData);
	if (user) {
		if (user.interests) {
			await InterestsModel.update(user.interests, interests);
		} else {
			await InterestsModel.create(user, interests);
		}
	} else {
		user = await UserModel.create(profile, tokenData, interests);
	}

	cookies.set('session-id', user.id, { path: '/' });

	return json(user);
}) satisfies RequestHandler;
