export async function fetchJSON<T extends { [key: string]: any }>(
	...params: Parameters<typeof fetch>
): Promise<T> {
	const response = await fetch(...params);
	const responseJSON = (await response.json()) as T;
	return responseJSON;
}
