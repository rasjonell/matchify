<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
	import LoginButton from '$lib/components/Login/LoginButton.svelte';

	import type { User } from '@prisma/client';

	export let user: User | null;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="navbar bg-secondary text-secondary-content shadow-lg shadow-secondary-content rounded-xl"
>
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-52"
			>
				<li><a href="/">Homepage</a></li>
				<li><a href="/#">Portfolio</a></li>
				<li><a href="/#">About</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center">
		<a href="/app" class="btn btn-ghost normal-case text-xl">Matchify</a>
	</div>
	<div class="navbar-end">
		{#if user}
			<div class="dropdown dropdown-end">
				<label tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src={user.image} alt={user.name} />
					</div>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-secondary rounded-box w-52"
				>
					<li>
						<a class="justify-between" href="/app/profile">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a href="/app">Settings</a></li>
					<li><a href="/api/auth/logout">Logout</a></li>
				</ul>
			</div>
		{:else}
			<LoginButton />
		{/if}
	</div>
</div>
