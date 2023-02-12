import { UserModel } from '$lib/server/db/user.server';

import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session-id');
	event.locals.user = sessionId ? await UserModel.getById(sessionId) : null;

	const response = await resolve(event);
	return response;
}) satisfies Handle;
