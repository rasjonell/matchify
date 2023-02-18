import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET = (() => {
	throw redirect(307, '/app/profile');
}) satisfies RequestHandler;
