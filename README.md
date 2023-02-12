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

## Available Routes

You can take a look at `Routes.md` files under each route namespace for route descriptions:

- [`(unauthorized)` Routes](<src/routes/(unauthorized)/Routes.md>)
- [`App` Routes](src/routes/app/Routes.md)
- [`API` Endpoints](src/routes/api/Routes.md)

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
