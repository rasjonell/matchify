<script lang="ts">
	import { page } from '$app/stores';
	import NavBar from '$lib/components/Navigation/NavBar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: title = $page.data.title || 'Matchify';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="app">
	<main class="bg-slate-50">
		<div class="w-full md:w-2/3 m-auto">
			<NavBar user={data.user} />
		</div>
		<slot />
	</main>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		height: 100%;
	}
</style>
