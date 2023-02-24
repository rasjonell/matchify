<script lang="ts">
	import FeatureSetCard from '$lib/components/FeatureSet/Card.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div
	class="w-full h-full flex flex-col lg:flex-row justify-center items-center"
>
	<FeatureSetCard user={data.user} currentUser={data.currentUser} />

	<div class="flex flex-col lg:flex-row">
		<div
			class="m-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
		>
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">
				Your Favorite Artists
			</div>
			<div class="collapse-content overflow-y-scroll">
				{#if data.user.interactions}
					<ul>
						{#each data.user.interactions.artists as artist}
							<li>{artist}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
		<div
			class="m-4 collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
		>
			<input type="checkbox" />
			<div class="collapse-title text-xl font-medium">Your Favorite Genres</div>
			<div class="collapse-content overflow-y-scroll">
				{#if data.user.interactions}
					<ul>
						{#each data.user.interactions.genres as genre}
							<li>{genre}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
