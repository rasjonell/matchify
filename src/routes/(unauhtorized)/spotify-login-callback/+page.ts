import { error, redirect } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const code = url.searchParams.get('code');
	if (!code) {
		throw error(401, 'Unauthorized');
	}

	const response = await fetch('/api/auth/login', {
		method: 'POST',
		body: JSON.stringify({ code }),
	});

	if (response.status !== 200) {
		throw error(response.status, 'Bad Request');
	}

	throw redirect(307, '/app');
}) satisfies PageLoad;
