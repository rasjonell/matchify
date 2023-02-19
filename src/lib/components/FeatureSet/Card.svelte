<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';

	import { FeatureSetInfo } from '$lib/data/featureset';

	export let user: App.DB.UserWithRelations;

	const interests = user.interests;
	const keys =
		interests &&
		(Object.keys(interests).filter(
			(key) => !['id', 'user', 'userId'].includes(key)
		) as Array<keyof Omit<typeof interests, 'id' | 'user' | 'userId'>>);

	let currentToastId: number | null = null;

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
		<img src={user.image} alt="Shoes" class="w-full object-contain" />
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
		</div>
	</div>
</div>
