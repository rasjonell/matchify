<script lang="ts">
	import './styles.css';

	/**
	 * @todo extract constants and environment related data into their scopes
	 */
	const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const SCOPES = ['user-top-read', 'user-read-currently-playing'];
	const spotifyURL = new URL('https://accounts.spotify.com/authorize');
	const REDIRECT_URI = 'http://localhost:5173/spotify-login-callback';

	spotifyURL.searchParams.append('client_id', clientId);
	spotifyURL.searchParams.append('response_type', 'code');
	spotifyURL.searchParams.append('scope', SCOPES.join(','));
	spotifyURL.searchParams.append('redirect_uri', REDIRECT_URI);

	function openSpotifyLogin() {
		window.location.href = spotifyURL.toString();
	}
</script>

<button class="button" on:click={openSpotifyLogin}>
	<i class="icon fa fa-spotify" /> Login With Spotify
</button>
