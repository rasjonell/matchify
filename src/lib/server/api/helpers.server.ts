export async function fetchJSON<T extends { [key: string]: any }>(
	accessToken: string | null,
	url: string,
	rest?: Parameters<typeof fetch>[1]
): Promise<T> {
	const response = await fetch(url, {
		...rest,
		headers: {
			...rest?.headers,
			Authorization: accessToken ? `Bearer ${accessToken}` : '',
		},
	});
	const responseJSON = (await response.json()) as T;
	return responseJSON;
}
