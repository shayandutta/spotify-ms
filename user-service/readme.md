# User Service

Authentication and user management microservice for Spotify-MS.

## Tech Stack

- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/user/register` | Register new user | No |
| POST | `/api/v1/user/login` | Login user | No |
| GET | `/api/v1/user/me` | Get current user profile | Yes |

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

## Environment Variables

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/spotify-users
JWT_SECRET=your-secret-key
JWT_EXPIRY=86400
```

## Project Structure

```
src/
├── config/         # Environment & logger config
├── controllers/    # Request handlers
├── middlewares/    # Auth & validation middleware
├── models/         # Mongoose schemas
├── repositories/   # Database operations
├── routes/         # API route definitions
├── services/       # Business logic
├── types/          # TypeScript declarations
└── utils/          # Helpers & error classes
```

## User Model

| Field | Type | Description |
|-------|------|-------------|
| name | String | User's name |
| email | String | Unique email |
| password | String | Hashed password |
| role | Enum | `user` or `admin` |
| playlist | String[] | User's playlist IDs |

## Response Format

**Success:**
```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message",
  "error": {}
}
```
