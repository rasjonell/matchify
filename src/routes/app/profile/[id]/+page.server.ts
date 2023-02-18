import { UserModel } from '$lib/server/db/user.server';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const id = params.id;

	const user = await UserModel.getById(id);

	if (!user) {
		throw error(404, 'User Not found');
	}

	return {
		user,
	};
}) satisfies PageServerLoad;
