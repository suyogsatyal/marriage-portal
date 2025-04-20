# Marriage Portal

The Marriage Portal is an online system for marriage registration and certificate issuance. It includes a backend built with Express and Prisma, and a frontend developed with React and Vite.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Technologies](#technologies)

## Installation

To set up the project locally, follow the steps below:

### 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/your-username/marriage-portal.git
cd marriage-portal
```

### 2. Install Dependencies

Install all the necessary dependencies for both the server and client:

```
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder with the following content:

```
DATABASE_URL="file:./prisma/dev.db"
PORT=5000
```

> You can also copy from `.env.example` and remove the '.example' for default needed.

### 4. Set Up the Database
### 4. Set Up the Database

To initialize the database and apply all necessary migrations, run:

```bash
npm run setup-db
```

This will create the database file and apply the schema, but won’t seed any data yet.

To populate the database with default users and sample data, run:

```bash
npm run seed
```

By default, this creates:

- **Admin Account**
    Email: `admin@admin.com`
    Password: `password`

- **User Account**
    Email: `user@user.com`
    Password: `userpass`

You can modify these default values or extend the seed script to include additional data. Update the `prisma/seed.js` file to customize the seeding process as needed.

## Running the Application

### Development Mode

To run both the backend and frontend in development mode, use:

```
npm run dev
```

This will start:
- Backend on [http://localhost:5000](http://localhost:5000)
- Frontend on [http://localhost:3000](http://localhost:5173)

### Production Mode

To build and run the application in production mode:

```
npm run build
npm run host
```

## Scripts

- `install-all`: Install dependencies for both the server and client
- `setup-db`: Set up the database (requires `.env` in `server/`)
- `build`: Build the frontend and backend
- `host`: Run both the server and client in development mode concurrently
- `dev`: Alias of `host`, starts both dev servers
- `dev:server`: Run only the backend in dev mode
- `dev:client`: Run only the frontend in dev mode
- `reset-db`: Reset the database and apply migrations
- `setup`: Reset DB and start both dev servers (requires `.env` file)
- `seed` Seed the database with data from `server/prisma/seed.js`

## Folder Structure

```
marriage-portal/
├── client/           # React + Vite frontend
├── server/           # Express backend with Prisma
├── package.json      # Root package.json with combined scripts
```

## Technologies

- **Backend**: Express, Prisma (SQLite), Node.js
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: SQLite (via Prisma)
