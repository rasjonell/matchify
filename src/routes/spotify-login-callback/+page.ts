import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import type { User } from '@prisma/client';

export const load = (async ({ url, fetch }) => {
	const code = url.searchParams.get('code');
	if (!code) {
		throw error(401, 'Unauthorized');
	}

	const response = await fetch('/api/auth', {
		method: 'POST',
		body: JSON.stringify({ code }),
	});

	if (response.status !== 200) {
		throw error(response.status, 'Bad Request');
	}

	const data = await response.json();
	return data as User;
}) satisfies PageLoad;
