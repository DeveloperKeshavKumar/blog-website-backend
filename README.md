# Blog Website Backend Documentation

This backend replicates the core functionality of a popular blog website, built using **Hono.js** on **Cloudflare Workers**. It utilizes **Prisma** as the ORM and **PostgreSQL** as the database, with connection pooling enabled for optimal performance. JWT-based authorization is managed through middleware.

## Project Structure

- **Framework**: Hono.js
- **Platform**: Cloudflare Workers
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Language**: TypeScript

## Base URL

[https://backend.keshav0kumar.workers.dev](`https://backend.keshav0kumar.workers.dev`)

## Routes

### User Routes

#### SignUp User

- **URL**: `/api/v1/user/signup`
- **Method**: `POST`
- **Description**: Registers a new user account.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### SignIn User

- **URL**: `/api/v1/user/signin`
- **Method**: `POST`
- **Description**: Logins a user account.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Blog Routes

#### Create Blog

- **URL**: `api/v1/blog/create`
- **Method**: `POST`
- **Description**: Creates a new blog post.
- **Middleware**: `auth()` - Requires `Authorization` header with JWT token.
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "authorId": "string"
  }
  ```

#### Edit Blog

- **URL**: `api/v1/blog/:id`
- **Method**: `PUT`
- **Description**: Edits a blog post.
- **Middleware**: `auth()` - Requires `Authorization` header with JWT token.
- **Request Body**:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "authorId": "string"
  }
  ```

#### Get Blog By Id

- **URL**: `api/v1/blog/:id`
- **Method**: `GET`
- **Description**: Lists a blog post with the given id.
- **Middleware**: `auth()` - Requires `Authorization` header with JWT token.

#### Get All Blogs 

- **URL**: `api/v1/blog/all`
- **Method**: `GET`
- **Description**: Lists all blog posts.
- **Middleware**: `auth()` - Requires `Authorization` header with JWT token.
