import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

/**
 * handles `GET /api/auth/logout`
 */
export const GET = (async ({ cookies }) => {
	cookies.delete('session-id', { path: '/' });

	throw redirect(307, '/');
}) satisfies RequestHandler;
