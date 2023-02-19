<script lang="ts">
	import { page } from '$app/stores';
	import LoginButton from '$lib/components/Login/LoginButton.svelte';

	const emojis: { [key: typeof $page.status]: string } = {
		404: '🤷',
		420: '🫠',
		500: '💥',
	};
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<span style="font-size: 10em">
		{emojis[$page.status] ?? emojis[500]}
	</span>
	<h1 class="text-xl mb-4">{$page.error?.message}</h1>
	{#if $page.status === 420}
		<LoginButton />
	{:else}
		<a href="/" class="btn">Go Home</a>
	{/if}
</div>
