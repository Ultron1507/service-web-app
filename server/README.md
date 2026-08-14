# Takewind Server

Backend foundation for the Takewind booking application.

## Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- CORS
- dotenv

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Required variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Run in Development Mode

```bash
npm run dev
```

## Run in Production Mode

```bash
npm start
```

## Health Check

```bash
GET http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```
