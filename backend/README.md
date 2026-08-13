# Takewind Backend

This is the backend foundation for the Takewind service booking application.

## Requirements

- Node.js 18+
- MongoDB running locally or via MongoDB Atlas
- npm

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example` and update the values for your local setup.

```bash
cp .env.example .env
```

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/takewind
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:5173
ADMIN_PHONE=
```

## Run Development Server

```bash
npm run dev
```

## Run Production Server

```bash
npm start
```

## API Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Backend API is running"
}
```

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── node_modules/
```
