A simple REST API for managing books built with Node.js, Express and MongoDB (Mongoose).

## Features

- Create, read, update, delete books
- Input validation with `express-validator`
- Clear structure (models, controllers, routes)

---

## Architecture

This project follows an MVC-like, layered RESTful pattern:

- `src/models` — Mongoose schemas (data layer)
- `src/controllers` — request handlers and business logic
- `src/routes` — HTTP routes that map to controller functions
- `src/validators` — request validation with `express-validator`

This structure keeps controllers focused and makes the codebase straightforward to navigate.

---

## Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB installed and running locally (required)

> Note: This project assumes a local MongoDB instance. It is not configured to run with Docker or cloud MongoDB services by default.

---

## Quick start

1. Clone the repo

```bash
git clone <repo-url>
cd book-store-api
```

2. Install dependencies

```bash
npm install
```

3. Create an `.env` file (or set env vars)

Example `.env` contents:

```
MONGO_URI=mongodb://localhost:27017/bookdb
PORT=3000
NODE_ENV=development
```

4. Start MongoDB (examples)

- Linux (systemd):

```bash
sudo systemctl start mongod
```

- macOS (Homebrew):

```bash
brew services start mongodb-community
```

- Windows (PowerShell as Admin):

```powershell
net start MongoDB
# or run mongod.exe directly
```

Check connection (optional):

```bash
mongo --eval "db.runCommand({ connectionStatus: 1 })"
```

5. Run the app

```bash
npm run dev
```

The server will listen on `http://localhost:3000` (or the port in your `.env`).

---

## API Endpoints

Base: `http://localhost:3000/api/books`

- POST `/api/books` — Create a book (body: `title`, `author`, `genre`, `price`)
- GET `/api/books` — List all books
- GET `/api/books/:id` — Get a book by id (validates Mongo id)
- PUT `/api/books/:id` — Update a book by id (validates id and body)
- DELETE `/api/books/:id` — Delete a book by id

All endpoints use JSON and standard HTTP status codes.

---

## Seed data

A seed script inserts 50 sample books for testing. Run the script after starting MongoDB and configuring `.env`:

```bash
npm run seed
```

To add a single book manually, use curl:

```bash
curl -s -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","genre":"Sci-Fi","price":9.99}'
```

---

## Validation and error handling

- Request validation is implemented using `express-validator` for the create route and ID checks for routes that accept `:id`.
