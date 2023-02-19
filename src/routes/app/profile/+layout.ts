import { error } from '@sveltejs/kit';

import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const parentData = await parent();
	if (!parentData.user) {
		throw error(420, 'Please Login To View This Page');
	}

	return {
		user: parentData.user,
	};
}) satisfies LayoutLoad;
