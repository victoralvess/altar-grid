# Random Grid

Application that generates a grid of characters and calculates a secret code.

# Technologies

### Client

- Language: TypeScript
- Framework: Vue.js
- CSS: Tailwind CSS
- Requests: Axios

### Server

- Runtime: Node.js 20.x
- Language: TypeScript
- Framework: Express
- Validation: Joi
- Tests: Vitest

# Features

- Generate 10x10 grid
- Generate 10x10 grid with a character bias
- Compute two-digit code

# How to run

## Docker

If you have Docker installed, go to the root folder and run `docker compose up`. The `server` will be available at `http://localhost:3000` and the client will be available at `http://localhost:3001`.

## Without Docker

To run without Docker, open each project in a terminal.  For both projects run `npm install`. Then, for the `server`, run `npm run build && npm start` and the app wil be available at `http://localhost:3000`. For the `client`, run `npm run dev` and the app will be available locally (the command will tell you in which port).

__NOTE__: the `client` expects the `server` to be available at `http://localhost:3000` because it's hardcoded 🙂.
