<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const interests = data.user.interests;
	const keys =
		interests && (Object.keys(interests) as Array<keyof typeof interests>);
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<div class="mockup-code">
		<pre data-prefix="$" class="bg-warning text-warning-content"><code
				>name -> {data.user.name}</code
			></pre>
		{#if keys}
			{#each keys as key}
				<pre data-prefix=">"><code>{key} -> {interests[key]}</code></pre>
			{/each}
		{/if}
	</div>
</div>
