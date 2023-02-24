# `API` Endpoints

The routes under this namespace are API Endpoints

- Root: `/api`

## Available Routes:

- `POST` `/api/auth/login`

  - Logs the user in(signs up on the first login)
  - Body:
    ```json
    {
    	"code": "<auth-callback-code-from-spotify>"
    }
    ```
  - Handled at `src/routes/api/auth/login/+server.ts`

- `Get` `/api/auth/logout`

  - Logs the currently signed in user out
  - Handled at `src/routes/api/auth/logout/+server.ts`

- `GET` `/api/matching`

  - Returns the similarity score between two users
  - Query Params:
    | Param | Description |
    | -------------- | --------------------- |
    | `firstUserId` | Id of the first user |
    | `secondUserId` | Id of the second user |

  - Response:
    ```jsonc
    {
    	// 0 <= similarityScore <= 1
    	"similarityScore": 0.42
    }
    ```
