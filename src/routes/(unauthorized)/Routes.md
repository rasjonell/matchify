# `(unauthorized)` Group Routes

The routes under this group are available to unauthenticated users.

- Root: `/`

## Available Routes:

- `/`

  - _Home Page_
  - Handled at `src/routes/(unauthorized)/+page.svelte`

- `/spotify-login-callback`
  - _Spotify Authenticator Callback Handler_
  - Handled on the server-side at `src/routes/(unauthorized)/spotify-login-callback/+server.ts`
