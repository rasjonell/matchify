import { redirect } from '@sveltejs/kit';

import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const parentData = await parent();
	if (!parentData.user) {
		throw redirect(307, '/');
	}

	return {
		user: parentData.user,
	};
}) satisfies LayoutLoad;
