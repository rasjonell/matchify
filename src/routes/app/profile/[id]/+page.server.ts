import { UserModel } from '$lib/server/db/user.server';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const id = params.id;

	const parentData = await parent();
	if (!parentData.user) {
		throw error(401, 'Please Login To View This Page');
	}

	const user = await UserModel.getById(id);
	if (!user) {
		throw error(404, 'User Not found');
	}

	return {
		user,
		currentUser: parentData.user,
	};
}) satisfies PageServerLoad;
