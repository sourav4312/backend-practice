# Blog API

A RESTful Blog API built using **Node.js, Express.js, MongoDB, and Mongoose**.

This project provides APIs for user authentication, creating and managing posts, and adding/deleting comments.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Cookie Parser
* CORS
* dotenv

## Project Features

### Authentication

* User registration
* User login
* User logout
* JWT-based authentication
* Protected routes
* Password hashing using bcrypt

### Posts

* Create a post
* Get all posts
* Get a single post
* Update a post
* Delete a post
* Only the post owner can update/delete their post

### Comments

* Add a comment to a post
* Get all comments of a post
* Delete a comment
* Only the comment author can delete their comment

## Database Relationships

The project contains three main collections:

```text
User
 │
 ├── 1 : N ──> Posts
 │
 └── 1 : N ──> Comments

Post
 │
 └── 1 : N ──> Comments
```

### User

```text
_id
username
email
password
createdAt
updatedAt
```

### Post

```text
_id
title
content
author → User
createdAt
updatedAt
```

### Comment

```text
_id
content
author → User
post → Post
createdAt
updatedAt
```

## API Base URL

```text
http://localhost:7000/api/v1
```

## API Endpoints

### Authentication

| Method | Endpoint          | Description      | Auth |
| ------ | ----------------- | ---------------- | ---- |
| POST   | `/users/register` | Register user    | No   |
| POST   | `/auth/login`     | Login user       | No   |
| POST   | `/auth/logout`    | Logout user      | Yes  |
| GET    | `/users/me`       | Get current user | Yes  |

### Posts

| Method | Endpoint        | Description     | Auth |
| ------ | --------------- | --------------- | ---- |
| POST   | `/post`         | Create post     | Yes  |
| GET    | `/post`         | Get all posts   | No   |
| GET    | `/post/:postId` | Get single post | No   |
| PATCH  | `/post/:postId` | Update post     | Yes  |
| DELETE | `/post/:postId` | Delete post     | Yes  |

### Comments

| Method | Endpoint                 | Description       | Auth |
| ------ | ------------------------ | ----------------- | ---- |
| POST   | `/post/:postId/comments` | Create comment    | Yes  |
| GET    | `/post/:postId/comments` | Get post comments | No   |
| DELETE | `/comments/:commentId`   | Delete comment    | Yes  |


## HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Request successful    |
| 201    | Resource created      |
| 400    | Bad request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Resource not found    |
| 409    | Conflict              |
| 500    | Internal server error |



## Environment Variables

Create a `.env` file:

```env
PORT=7000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry
```

Never commit your `.env` file to GitHub.

Add it to `.gitignore`:

```text
.env
node_modules/
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd BlogAPI
```

Install dependencies:

```bash
npm install
```

Create your `.env` file and add the required environment variables.

Start the development server:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:7000
```

## Testing

You can test the API using **Postman**.

Recommended testing flow:

```text
1. Register User
       ↓
2. Login
       ↓
3. Get Access Token
       ↓
4. Create Post
       ↓
5. Get Post
       ↓
6. Add Comment
       ↓
7. Get Comments
       ↓
8. Delete Comment
       ↓
9. Update/Delete Post
```

## Future Improvements

* Pagination
* Search posts
* Filtering and sorting
* Image upload using Multer
* Cloudinary integration
* Like/unlike posts
* Like/unlike comments
* Refresh token rotation
* Rate limiting
* Input validation
* Centralized error handling
* API documentation using Swagger
* Unit and integration testing

## Author

**Sourav Mandal**

This project is built as a backend practice project to strengthen REST API development, authentication, authorization, MongoDB relationships, and Express.js backend architecture.
