```markdown
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

```bash
git clone https://github.com/your-username/marriage-portal.git
cd marriage-portal
```

### 2. Install Dependencies

Install all the necessary dependencies for both the server and client:

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` folder with the following content:

```env
DATABASE_URL="file:./prisma/dev.db"
PORT=5000
```

## Running the Application

### Development Mode

To run both the backend and frontend in development mode, use:

```bash
npm run dev
```

This will start:

- Backend on [http://localhost:5000](http://localhost:5000)
- Frontend on [http://localhost:3000](http://localhost:3000)

### Production Mode

To build and run the application in production mode, use:

```bash
npm run build
npm run host
```

## Scripts

Here are some commonly used scripts:

```markdown
- **install-all**: Install dependencies for both the server and the client, and set up the database
- **setup-db**: Set up the database
- **build**: Build the frontend and backend
- **host**: Run both the server and client in development mode concurrently
- **dev**: Same as host, runs both frontend and backend together
- **dev:server**: Run only the backend in development mode
- **dev:client**: Run only the frontend in development mode
- **reset-db**: Reset the database and apply migrations
- **setup**: Reset the database and start both frontend and backend
```
## Technologies

- **Backend**: Express, Prisma (SQLite), Node.js
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: SQLite (via Prisma)
```