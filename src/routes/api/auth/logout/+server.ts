import { json, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	cookies.delete('session-id', { path: '/' });

	throw redirect(307, '/');
}) satisfies RequestHandler;
