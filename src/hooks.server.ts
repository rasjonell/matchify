import { getById } from '$lib/server/user.server';

import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session-id');
	event.locals.user = sessionId ? await getById(sessionId) : null;

	const response = await resolve(event);

	return response;
}) satisfies Handle;
