<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { page } from '$app/stores';
	import NavBar from '$lib/components/Navigation/NavBar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: title = $page.data.title || 'Matchify';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<SvelteToast options={{ reversed: true, intro: { y: 100 } }} />
<div class="app">
	<div class="w-full md:w-2/3 m-auto mt-4">
		<NavBar user={data.user} />
	</div>
	<main>
		<slot />
	</main>
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 4rem;
		--toastContainerLeft: calc(50vw - 8rem);

		--toastColor: mintcream;
		--toastBarBackground: #2f855a;
		--toastBackground: rgba(72, 187, 120, 0.9);
	}

	.app {
		height: 100vh;

		display: flex;
		flex-direction: column;
	}

	main {
		display: flex;
		flex-direction: column;

		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>
