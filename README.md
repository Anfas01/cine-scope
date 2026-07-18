# CineScope

CineScope is an authenticated movie-discovery web application. Signed-in users can browse weekly trending movies from TMDB, search TMDB's movie catalog, inspect a movie's details, and maintain a personal watchlist stored in MongoDB.

## Overview

The primary use case is a lightweight, personal movie watchlist experience built around TMDB data. The application requires an account before its movie and watchlist pages can be used.

Key implemented features:

- Email/password registration and login.
- JWT-backed, HTTP-only session cookie authentication.
- Weekly trending movie listing from TMDB.
- Movie search through the TMDB search endpoint.
- Movie detail pages with artwork, rating, release year, runtime, genres, overview, and other metadata returned by TMDB.
- Per-user MongoDB watchlists with add/remove controls.
- Search-aware navigation, responsive movie grids, loading UI, and transient watchlist toast messages.

## Tech Stack

| Area | Technology |
| --- | --- |
| Language | TypeScript |
| Framework | Next.js 16.2.10 with the App Router and React 19.2.4 |
| UI | React, Tailwind CSS 4, Lucide React icons, Next Image, Geist fonts |
| Server-side behavior | Next.js Server Actions and server components |
| Database / ODM | MongoDB via Mongoose 9.7.4 |
| Authentication | `bcrypt` password hashing and `jsonwebtoken` JWTs stored in cookies |
| External service | The Movie Database (TMDB) API and TMDB image CDN |
| Tooling | TypeScript, ESLint 9 with Next.js configs, PostCSS, React Compiler |

`sonner` is declared as a dependency, but the current implementation uses the project's own toast provider rather than importing Sonner.

## Project Structure

```text
.
├── public/
│   └── logo.png                 # Application logo
├── src/
│   ├── actions/                 # Server actions for authentication and watchlists
│   ├── app/
│   │   ├── (auth)/              # /login and /register routes
│   │   ├── (main)/              # Protected home, watchlist, and movie-detail routes
│   │   ├── layout.tsx           # Root layout, fonts, and toast provider
│   │   ├── loading.tsx          # Route loading UI
│   │   └── globals.css          # Tailwind CSS import
│   ├── components/              # Navigation, movie, watchlist, loader, and toast UI
│   ├── hooks/                   # Client-side watchlist state helper
│   ├── lib/                     # MongoDB, JWT-user lookup, and TMDB helpers
│   ├── models/                  # Mongoose User and Watchlist schemas
│   └── services/                # TMDB movie-query functions
├── .env                         # Local environment configuration (ignored by Git)
├── next.config.ts               # React Compiler and TMDB image-host configuration
├── package.json                 # Scripts and dependencies
├── postcss.config.mjs           # Tailwind PostCSS plugin
└── tsconfig.json                # TypeScript configuration and @/* path alias
```

## Architecture

CineScope is a single Next.js application; there is no separate backend service or public API layer in this repository.

1. Next.js App Router pages render the UI. The `(main)` route group wraps protected pages in a layout that resolves the current user and redirects unauthenticated requests to `/login`.
2. Server components call `services/movies.service.ts`, which delegates to `lib/tmdb.ts` for authenticated TMDB requests. Next Image is configured to load images from `image.tmdb.org`.
3. Authentication form submissions invoke Next.js Server Actions. Registration writes a bcrypt-hashed password to MongoDB; login signs a seven-day JWT and writes it to the `token` HTTP-only cookie.
4. `getCurrentUser()` verifies that cookie's JWT and fetches the MongoDB user record without its password field.
5. Client watchlist controls call the `toggleWatchlist` Server Action. It uses the authenticated user and the Mongoose `Watchlist` model to add or remove a saved movie, then refreshes the route and displays a local toast.

## Installation

### Prerequisites

- Node.js and npm. The repository does not declare a Node.js or npm version.
- A MongoDB deployment reachable through a connection URI.
- A TMDB API read access token.
- A cryptographically strong JWT signing secret.

### Steps

1. Clone the repository and enter it:

   ```bash
   git clone <repository-url>
   cd cine-scope
   ```

2. Install the locked dependencies:

   ```bash
   npm ci
   ```

   `npm install` is also supported when you intend to update the lockfile.

3. Create a `.env` file in the repository root and configure the variables below.

4. Start development mode:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Next.js (normally `http://localhost:3000`). Register an account before using the protected application routes.

## Configuration

The checked-in source reads three custom environment variables. `.env*` files are ignored by Git, and no example environment file is included.

| Variable | Required | Description | Default |
| --- | --- | --- | --- |
| `TMDB_ACCESS_TOKEN` | Yes | TMDB API bearer token sent in the `Authorization` header for trending, search, and movie-detail requests. | None |
| `MONGODB_URI` | Yes | MongoDB connection URI consumed by Mongoose. The application throws during database module initialization when it is absent. | None |
| `JWT_SECRET` | Yes | Secret used to sign login JWTs and verify the `token` cookie. | None |
| `NODE_ENV` | No | Standard Node/Next environment indicator. The login cookie is marked `secure` only when its value is `production`. | Framework-managed |

Example (replace every value with your own):

```dotenv
TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_long_random_secret
```

## Running the Project

### Development

```bash
npm run dev
```

### Production

Build the application and serve the resulting Next.js production build:

```bash
npm run build
npm run start
```

The production process still needs all configuration variables and access to MongoDB and TMDB.

### Docker

Dockerfiles and Docker Compose files are not present, so this repository has no Docker workflow.

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `next dev` | Starts the Next.js development server. |
| `build` | `next build` | Creates an optimized production build. |
| `start` | `next start` | Starts the built application in production mode. |
| `lint` | `eslint` | Runs ESLint using the configured Next.js Core Web Vitals and TypeScript rules. |

## API

No REST, GraphQL, or Route Handler endpoints are implemented. The browser-facing functionality is provided by pages and Next.js Server Actions rather than a documented HTTP API.

| Internal action | Invocation | Input | Result |
| --- | --- | --- | --- |
| `register` | Registration form | `name`, `email`, `password` | Creates a user or returns a validation/duplicate-email error; redirects to `/login` on success. |
| `login` | Login form | `email`, `password` | Verifies credentials, sets the `token` cookie, and redirects to `/`. Invalid credentials return an error state. |
| `logout` | Account-menu button | None | Deletes the `token` cookie and redirects to `/login`. |
| `toggleWatchlist` | Movie cards and movie-detail page | Movie ID, title, poster path, vote average, release date | Adds or removes the movie for the current user and returns `{ success, action, message }`. |
| `isMovieInWatchlist` | Movie-detail server component | Movie ID | Returns whether the current user's watchlist contains that movie. |

TMDB calls are internal server-side fetches to `/trending/movie/week`, `/search/movie`, and `/movie/:id`; clients do not supply a TMDB token directly.

## Database

MongoDB is the only database integration, accessed through Mongoose. `src/lib/mongodb.ts` caches the Mongoose connection on `global` to reuse it across module reloads and requests.

Schemas are defined in `src/models/`:

- `User`: `name`, unique `email`, `password`, plus Mongoose `createdAt` and `updatedAt` timestamps.
- `Watchlist`: `user` reference to `User`, TMDB `movieId`, `title`, `posterPath`, `voteAverage`, `releaseDate`, plus timestamps.

No migration framework, seed script, or schema-migration directory is implemented. Mongoose schema creation is the only schema definition present.

## Authentication

Passwords are hashed with bcrypt using 10 salt rounds during registration. On successful login, a JWT containing `userId` and `email` is signed with `JWT_SECRET`, expires after seven days, and is stored as an HTTP-only, `sameSite=lax` cookie named `token`. Its `secure` attribute is enabled in production.

Protected route layouts and data operations call `getCurrentUser()`. It verifies the token and retrieves the user from MongoDB; invalid, expired, missing, or unverifiable tokens resolve to no user. Protected page layouts then redirect to `/login`. Watchlist actions also refuse unauthenticated requests.

There are no roles, permissions, password-reset flow, email verification flow, or OAuth providers implemented.

## Features

- Account creation with required fields, normalized lowercase name/email, duplicate-email handling, and a six-character minimum password.
- Login and logout.
- Protected home, watchlist, and movie-detail pages.
- Weekly TMDB trending movies by default.
- Query-string movie search (`/?query=<term>`).
- TMDB movie detail display, including backdrop/poster imagery and metadata returned by the API.
- Persistent per-user watchlists.
- Immediate client-side removal from the watchlist grid.
- Responsive desktop navigation and account menu.
- Custom animated toast notifications for successful watchlist changes.
- A route-level loading spinner.

## Testing

No automated test files or test script are present. The available verification command is:

```bash
npm run lint
```

At the time this README was written, `npm.cmd run lint` reports two errors (a synchronous `setState` call inside a `Navbar` effect and an explicit `any` in `useWatchlist`) and five unused-import warnings. Address those findings before treating lint as a passing quality gate.

## Build

Run:

```bash
npm run build
```

This invokes `next build`. Build output is written to `.next/`, which is ignored by Git. No static-export configuration is present.

## Deployment

No deployment, CI/CD, infrastructure-as-code, Docker, or hosting configuration files are present. The implemented production path is to provide the required environment variables, run `npm run build`, and run `npm run start` in an environment that can reach MongoDB and TMDB.

The target platform, reverse proxy, domain, TLS setup, database provisioning, and secret-management mechanism are not specified by this repository.

## Troubleshooting

| Problem | Likely cause | Resolution |
| --- | --- | --- |
| Application fails with `Please define the MONGODB_URI environment variable` | `MONGODB_URI` is absent. | Add a valid MongoDB URI to `.env`, then restart the server. |
| Movie loading fails with `Failed to fetch TMDB` | Missing/invalid TMDB token, unavailable TMDB service, or an unsuccessful TMDB response. | Set a valid `TMDB_ACCESS_TOKEN` and check the TMDB request/service status. |
| Login cannot create or verify sessions | `JWT_SECRET` is missing or changed between requests/deployments. | Configure one stable secret for the running environment and log in again. |
| Protected pages redirect to `/login` | The `token` cookie is missing, expired, invalid, or its user no longer exists. | Log in again; verify `JWT_SECRET`, cookie handling, and MongoDB connectivity. |
| Watchlist changes are rejected | No authenticated current user was found. | Log in before adding or removing a movie. |
| Remote TMDB images do not render | The poster/backdrop path is missing or the TMDB image request cannot be loaded. | Verify TMDB data and network access; `image.tmdb.org` is the only configured remote image host. |
| `npm run ...` is blocked in Windows PowerShell | Local PowerShell execution policy can block `npm.ps1`. | Use `npm.cmd run <script>` or change the execution policy according to your environment's policy. |
| Lint exits non-zero | Current source has the lint findings described in [Testing](#testing). | Resolve the two ESLint errors and unused imports, then rerun the command. |

## Dependencies

Major runtime dependencies:

- `next`, `react`, `react-dom`: application framework and rendering runtime.
- `mongoose`: MongoDB connection management and the User/Watchlist models.
- `bcrypt`: password hashing and comparison.
- `jsonwebtoken`: JWT creation and verification for cookie sessions.
- `lucide-react`: interface icons.

Major development dependencies:

- `typescript` and the `@types/*` packages: static type checking.
- `tailwindcss` and `@tailwindcss/postcss`: utility CSS processing.
- `eslint` and `eslint-config-next`: code linting with Next.js and TypeScript rules.
- `babel-plugin-react-compiler`: enabled through `reactCompiler: true` in `next.config.ts`.

## Contributing

1. Create a branch for the change.
2. Install dependencies with `npm ci` and configure local environment variables without committing `.env` files.
3. Make the change and keep TypeScript imports and lint rules clean.
4. Run `npm run lint` and, once tests are added, the relevant test suite.
5. Build with `npm run build` when practical.
6. Submit a pull request describing the change and any configuration or schema impact.

## License

No license file or license field in `package.json` is present. The repository's licensing terms are therefore not specified here.

## Codebase Analysis

### Project type

A private, full-stack Next.js movie application. It combines server-rendered/interactive React UI, Server Actions, MongoDB persistence, cookie authentication, and TMDB data access in one repository.

### Architecture pattern

The code follows a lightweight layered structure: App Router pages and layouts compose the UI; components and hooks manage browser interaction; Server Actions perform mutations; service/lib modules handle TMDB, authentication, and MongoDB concerns; Mongoose models define persistence. Route-group layout protection provides the main authentication boundary.

### Important modules

- `src/lib/mongodb.ts`: cached Mongoose connection.
- `src/lib/auth.ts`: token-cookie verification and current-user lookup.
- `src/lib/tmdb.ts`: TMDB bearer-authenticated fetch wrapper and image base URL.
- `src/services/movies.service.ts`: trending, search, and detail movie queries.
- `src/actions/`: registration, login/logout, and watchlist mutations/lookup.
- `src/models/`: MongoDB document schemas.
- `src/app/(main)/`: protected user-facing pages.

### External integrations

- TMDB API for movie data and `image.tmdb.org` for poster/backdrop images.
- MongoDB through Mongoose for users and watchlists.

### Strengths

- Clear separation between movie retrieval, database/auth helpers, data models, UI components, and mutations.
- Server-side storage of TMDB credentials and JWT secret rather than exposing them in client code.
- Password hashing, HTTP-only session cookies, protected page layout, and per-user watchlist ownership.
- Reusable client watchlist hook keeps card and detail-button behavior consistent.
- Configured image allowlist restricts Next Image remote loading to TMDB's image host.

### Potential improvements

- Add automated tests for Server Actions, authentication behavior, TMDB failure states, and watchlist ownership/mutations.
- Resolve the current ESLint errors and unused imports.
- Add robust input/type validation for TMDB responses and replace `any` in `useWatchlist` with a movie type.
- Handle absent TMDB fields (for example, image paths, dates, numeric ratings, or genres) before calling string/number methods in UI components.
- Add user-friendly error boundaries or error states for TMDB/database failures.
- Add unique compound indexing for watchlist entries (`user`, `movieId`) if duplicate prevention must be enforced at the database layer.
- Replace the placeholder metadata description and remove unused dependencies/components if they remain unnecessary.

### Technical debt noticed

- ESLint currently fails with two errors and reports five warnings.
- `Nav.tsx` is present but is not imported by the rendered layouts; its mobile navigation is therefore not active in the current app flow.
- The navbar contains a Settings button without an implemented action, and retains a `/favorites` placeholder branch although no favorites route is present.
- `sonner` is installed but unused; the root layout also contains CSS targeting Sonner's toaster attribute while the application renders a custom toast implementation.
- The Mongoose schemas do not define a compound uniqueness constraint for a user's movie entries.
- No migrations, tests, CI/CD, Docker setup, or deployment configuration are included.

### Missing documentation

- No environment example file.
- No declared supported Node.js/npm versions.
- No testing strategy or test suite.
- No deployment/hosting, CI/CD, backup, or database-provisioning guidance.
- No license statement.

## README Confidence

| Section | Confidence | Basis |
| --- | --- | --- |
| Project Name and Overview | High | Application name, routes, UI copy, and implemented behavior are explicit. |
| Tech Stack | High | `package.json` and configuration files identify the stack and versions. |
| Project Structure | High | Based on the current tracked source/configuration layout. |
| Architecture | High | Derived directly from imports, route layouts, Server Actions, and library modules. |
| Installation | Medium | Required services and variables are explicit; supported Node/npm versions and repository URL are not specified. |
| Configuration | High | Every custom variable is present in `.env` and/or source usage. |
| Running, Scripts, and Build | High | Defined directly in `package.json`. |
| Docker and Deployment | High | The repository contains no Docker or deployment configuration. |
| API | High | No public API routes exist; internal Server Actions and TMDB calls are explicit. |
| Database | High | Mongoose connection and schemas are explicit; no migrations exist. |
| Authentication | High | Registration, login, cookie, JWT, and protection logic are explicit. |
| Features | High | Limited to rendered pages, components, and Server Actions in the source. |
| Testing | High | No tests/scripts exist; the documented lint status was verified locally. |
| Troubleshooting | Medium | Causes/resolutions are derived from explicit runtime errors and configuration paths; production environment behavior is not otherwise documented. |
| Dependencies | High | Based on `package.json` and current imports/configuration. |
| Contributing and License | Medium | Contribution workflow is conventional guidance; no project-specific policy or license is provided. |
| Codebase Analysis | High | Based on the complete current source and configuration files; improvement items are clearly identified as recommendations. |
