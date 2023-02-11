<script lang="ts">
	import { AUTH_URL, SCOPES } from '$lib/constants/spotify';

	const spotifyURL = new URL(AUTH_URL);
	const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

	spotifyURL.searchParams.append('client_id', clientId);
	spotifyURL.searchParams.append('response_type', 'code');
	spotifyURL.searchParams.append('scope', SCOPES.join(','));
	spotifyURL.searchParams.append('redirect_uri', redirectUri);

	function openSpotifyLogin() {
		window.location.href = spotifyURL.toString();
	}
</script>

<button
	class="btn btn-primary text-white font-normal rounded-xl"
	on:click={openSpotifyLogin}
>
	<i class="icon fa fa-spotify mr-2 text-lg" /> Login
</button>
