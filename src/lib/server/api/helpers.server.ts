export async function fetchJSON<T extends { [key: string]: any }>(
	accessToken: string | null,
	url: string,
	rest?: Parameters<typeof fetch>[1]
): Promise<T> {
	const config = {
		...rest,
		headers: {
			'Content-Type': 'application/json',
			Authorization: accessToken ? `Bearer ${accessToken}` : '',
			...rest?.headers,
		},
	};
	const response = await fetch(url, config);

	console.log('[API][fetchJSON]', { info: { config } });

	const responseJSON = (await response.json()) as T;
	return responseJSON;
}

export function withLogging<
	T extends (...args: Parameters<T>) => ReturnType<T>
>(scope: string, fn: T) {
	return function inner(...args: Parameters<T>) {
		console.log(`[${scope}][${fn.name}]`, { info: { args } });
		return fn(...args);
	};
}

export function moduleWithLogger<
	T extends {
		[key: string]: (
			...args: Parameters<T[typeof key]>
		) => ReturnType<T[typeof key]>;
	}
>(scope: string, Module: T): T {
	const tempObj: { [key: string]: () => unknown } = {};

	for (const key in Module) {
		tempObj[key] = withLogging(scope, Module[key]);
	}

	return tempObj as T;
}
