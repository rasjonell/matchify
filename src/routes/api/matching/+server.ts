import { error, json } from '@sveltejs/kit';

import { UserModel } from '$lib/server/db/user.server';
import { MatchingService } from '$lib/server/services/matching.server';

import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	const firstUserId = url.searchParams.get('firstUserId');
	const secondUserId = url.searchParams.get('secondUserId');

	if (!(firstUserId && secondUserId)) {
		throw error(
			400,
			`incorrect parameters:
			[firstUserId: ${firstUserId}]
			[secondUserId: ${secondUserId}]
		`,
		);
	}

	const [firstUser, secondUser] = await Promise.all([
		UserModel.getById(firstUserId),
		UserModel.getById(secondUserId),
	]);

	if (!(firstUser && secondUser)) {
		throw error(404, 'User not found');
	}

	const similarityScore = MatchingService.findSimilarity(firstUser, secondUser);

	return json({
		similarityScore,
	});
}) satisfies RequestHandler;
