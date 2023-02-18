# `App` Routes

The routes under this namespace are available only to authenticated users.

- Root: `/app`

## Available Routes:

- `/app/profile`

  - _Currently signed in user's profile page_
  - Handled at `src/routes/app/profile/+page.svelte`

- `/app/profile/:id`
  - _Profile Page of the user with the given ID_
  - Handled at `src/routes/app/profile/[id]/+page.svelte`
