# Matchify

## Developing

Once you've cloned the project and installed dependencies with `npm install`, configure your environment using `.env.example` or the table bellow:

```bash
cd matchify
cp .env.example .env
```

| Variable                   |            Description            |
| -------------------------- | :-------------------------------: |
| DATABASE_URL               | Path to your SQLITE database file |
| VITE_SPOTIFY_CLIENT_ID     |      Your Spotify Client ID       |
| VITE_SPOTIFY_REDIRECT_URI  |  Your Spotify Auth Redirect URI   |
| VITE_SPOTIFY_CLIENT_SECRET |    Your Spotify Client Secret     |

Then, start the dev server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
