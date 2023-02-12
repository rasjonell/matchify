import { json } from '@sveltejs/kit';
import { UserModel } from '$lib/server/db/user.server';
import { SpotifyAPI } from '$lib/server/api/spotify.server';

import type { RequestHandler } from '../$types';

/**
 * handles `POST /api/auth/login`
 */
export const POST = (async ({ request, cookies }) => {
	const { code } = await request.json();
	const tokenData = await SpotifyAPI.getTokens(code);
	const profile = await SpotifyAPI.getProfileData(tokenData.access);
	const user = await UserModel.getByIdAndUpdate(profile.id, tokenData);
	const finalUser = user || (await UserModel.create(profile, tokenData));

	cookies.set('session-id', finalUser.id, { path: '/' });

	return json(finalUser);
}) satisfies RequestHandler;
