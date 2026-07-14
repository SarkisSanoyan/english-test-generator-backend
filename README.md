# English Test Generator Backend 🚀

Backend API for an English learning platform that generates vocabulary quizzes from user-provided text.

The application processes English text, extracts important vocabulary words, generates different types of questions, and stores quizzes for learning and practice.

Built with **Node.js, Express.js, MongoDB, Redis, and JWT Authentication**.

---

## ✨ Features

## 🔐 Authentication & Authorization

- User registration and login
- JWT authentication
- Access and refresh token system
- Refresh token rotation
- Secure HTTP-only cookies
- Password hashing with bcrypt
- Protected routes
- Authentication middleware

---

## 📚 Quiz Generation

Users can submit English text and automatically generate vocabulary quizzes.

Supported question types:

- Fill-in-the-blank questions
- Word definition matching
- English → Armenian translation questions

Generated quizzes contain:

- Extracted vocabulary words
- Questions
- Answer options
- Correct answers
- Word references
- Quiz metadata

---

## 🗂 Database Management

MongoDB is used as the primary database.

Main collections:

- Users
- Quizzes
- Questions
- Words
- Text submissions

Technologies:

- MongoDB Atlas
- Mongoose ODM

---

## ⚡ Redis Integration

Redis is used for performance optimization and security.

Implemented features:

- API rate limiting
- Data caching
- Request optimization

Technologies:

- Redis
- Upstash Redis
- ioredis

---

## 🛡 Security Features

The backend includes:

- CORS configuration
- Rate limiting
- JWT verification middleware
- Secure cookies
- Centralized error handling
- Environment variable protection

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JSON Web Token (JWT)
- bcrypt
- Cookies

## Cache & Performance

- Redis
- Upstash Redis
- ioredis

## Development Tools

- ESLint
- Prettier
- Nodemon

## Deployment

- Vercel
- Render


---

# 📁 Project Structure

```
# 📁 Project Structure

```
english-test-generator-backend
│
├── api
│   ├── fetchDefinition.js
│   └── translateToArmenian.js
│
├── config
│   ├── db.js
│   ├── env.js
│   ├── queue.js
│   └── redis.js
│
├── controllers
│   ├── admin.controller.js
│   ├── admin.submission.controller.js
│   ├── admin.word.controller.js
│   ├── analyze.controller.js
│   ├── auth.controllers.js
│   ├── quiz.controller.js
│   ├── user.controller.js
│   └── word.controller.js
│
├── data
│
├── middleware
│   ├── auth.middleware.js
│   ├── logger.middleware.js
│   └── ratelimiter.middleware.js
│
├── models
│   ├── log.model.js
│   ├── question.model.js
│   ├── quiz.model.js
│   ├── result.model.js
│   ├── test.model.js
│   ├── textSubmission.model.js
│   ├── user.model.js
│   └── word.model.js
│
├── queues
│
├── routes
│   ├── admin.logs.js
│   ├── admin.quizzes.routes.js
│   ├── admin.routes.js
│   ├── admin.submissions.routes.js
│   ├── admin.users.routes.js
│   ├── admin.words.routes.js
│   ├── analyze.routes.js
│   ├── auth.routes.js
│   ├── quiz.routes.js
│   ├── results.routes.js
│   ├── tests.routes.js
│   ├── users.routes.js
│   └── word.routes.js
│
├── scripts
│
├── services
│   ├── analyze.service.js
│   ├── auth.service.js
│   ├── dictionary.service.js
│   ├── quiz.service.js
│   └── word.service.js
│
├── utils
│
├── .env
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── server.js
```
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/SarkisSanoyan/english-test-generator-backend.git

cd english-test-generator-backend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_url

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password
```

---

## 4. Run Development Server

```bash
npm run dev
```

The server will start:

```
http://localhost:5000
```

---

# 📌 API Documentation

## Authentication Routes

### Register User

```
POST /api/v1/auth/register
```

Example request:

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login User

```
POST /api/v1/auth/login
```

---

### Logout User

```
POST /api/v1/auth/logout
```

---

# Quiz Routes

## Generate Quiz

```
POST /api/v1/quiz
```

Example request:

```json
{
  "text": "Artificial intelligence is transforming modern education."
}
```

Example response:

```json
{
  "quizId": "12345",
  "questions": [
    {
      "type": "translation",
      "word": "education",
      "options": [
        "կրթություն",
        "տեխնոլոգիա"
      ]
    }
  ]
}
```

---

## Get Quiz

```
GET /api/v1/quizzes/:id
```

---

# 🔄 Authentication Flow

```
User Login
     |
     |
Generate Access Token
     |
     |
Generate Refresh Token
     |
     |
Store Refresh Token Securely
     |
     |
Access Protected Routes
```

---

# ⚡ Application Architecture

```
                 Frontend
                    |
                    |
                    ↓
             Express API
                    |
        -----------------------
        |                     |
        ↓                     ↓
    MongoDB               Redis
     Atlas              Upstash
```


---

# 🌍 Deployment

Production environment:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Cache: Redis Cloud

Deployment architecture:

```
Vercel Frontend
        |
        |
        ↓
Render Backend
        |
 ----------------
 |              |
MongoDB       Redis
Atlas         Upstash
```

---

# 🧪 Future Improvements

Planned features:

- AI-powered question generation
- User learning progress tracking
- Vocabulary statistics
- Difficulty levels
- Email verification
- Password reset functionality
- Automated testing
- CI/CD improvements




