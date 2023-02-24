<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';

	import { FeatureSetInfo } from '$lib/data/featureset';

	export let user: App.DB.UserWithRelations;
	export let currentUser: App.DB.UserWithRelations;

	const interests = user.interests;
	const keys =
		interests &&
		(Object.keys(interests).filter(
			(key) => !['id', 'user', 'userId'].includes(key)
		) as Array<keyof Omit<typeof interests, 'id' | 'user' | 'userId'>>);

	let currentToastId: number | null = null;

	const isGuest = user.id !== currentUser.id;

	async function findSimilarity(): Promise<Number> {
		const url = new URL(`${import.meta.env.VITE_HOST_URL}/api/matching`);
		url.searchParams.append('firstUserId', user.id);
		url.searchParams.append('secondUserId', currentUser.id);

		const response = await fetch(url);
		const result = await response.json();

		if (result.similarityScore) {
			return result.similarityScore * 100;
		} else {
			throw new Error(`Couldn't find your similarity score.`);
		}
	}

	let similarity: ReturnType<typeof findSimilarity> | null;

	function handleClick() {
		similarity = findSimilarity();
	}

	function onShareClick() {
		navigator.clipboard.writeText(
			`${import.meta.env.VITE_PROFILE_URL}/${user.id}`
		);

		if (currentToastId) {
			return;
		}

		currentToastId = toast.push('Link Copied to Your Clipboard!', {
			onpop: () => {
				currentToastId = null;
			},
		});
	}
</script>

<div class="card min-w-fit bg-base-100 shadow-xl image-full">
	<figure>
		<img src={user.image} alt={user.name} class="w-full object-contain" />
	</figure>
	<div class="card-body">
		<h2 class="card-title pb-4">{user.name}'s Listening Report!</h2>
		{#if keys}
			{#each keys as key}
				<div
					class={`tooltip tooltip-bottom ${FeatureSetInfo[key].class(
						'tooltip'
					)}`}
					data-tip={FeatureSetInfo[key].info}
				>
					<div class="flex items-center justify-between">
						<span class="text-sm mr-4">{key.toUpperCase()}:</span>
						<progress
							class={`progress ${FeatureSetInfo[key].class(
								'progress'
							)} w-full h-3`}
							max={Number(FeatureSetInfo[key].min) === 0
								? FeatureSetInfo[key].max
								: Math.abs(
										Number(FeatureSetInfo[key].max) +
											Number(FeatureSetInfo[key].min)
								  )}
							value={Number(FeatureSetInfo[key].min) === 0
								? interests[key]
								: interests[key] + Math.abs(Number(FeatureSetInfo[key].min))}
						/>
					</div>
				</div>
			{/each}
		{/if}
		<div class="card-actions justify-end">
			<button class="btn btn-primary btn-sm mt-4" on:click={onShareClick}
				>Share</button
			>
			{#if isGuest}
				<div class="m-4 text-center">
					<button class="btn btn-primary btn-sm" on:click={handleClick}
						>Find Your Matching Score!
					</button>
					{#if similarity}
						{#await similarity}
							<p>...loading</p>
						{:then score}
							<p>{score}% match!</p>
						{:catch error}
							<p class="text-error">{error.message}</p>
						{/await}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
