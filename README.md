<<<<<<< HEAD
 morsal-app-backend-nest-
A nest api
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# 🛠️ Morsl Admin Dashboard – Backend

This is the backend API for the **Morsl App Admin Dashboard**, supporting content and feedback management for a minimalist, offline-first mobile app designed to help users identify food cravings via intuitive swipe interactions.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Multer** – for image uploads
- **JWT** – for admin authentication

---

## 📁 Project Structure
<pre> ```
/src
┣ /controllers → Route handlers (auth, feedback, image, etc.)
┣ /middlewares → JWT auth checks, error handling
┣ /routes → All express routes
┣ /utils → Helper functions
┣ /uploads → Image storage
┣ app.ts → App setup
┗ server.ts → Server entry point
prisma/schema.prisma → Prisma DB schema
 ``` </pre>
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Barshono96/morsal-app-backend.git
cd morsl-admin-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/morsldb
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the Server

```bash
npm run dev
```

Server will run at `http://localhost:5000`.

---

## 🧪 Seeding (Optional)

To import feedback from a JSON file:

```bash
npx ts-node prisma/seed.ts
```

Or use the `POST /api/feedbacks/import` endpoint with a JSON file.

---

## 🛠️ API Routes Summary

> All routes are protected by JWT middleware except login.

### 🔐 Auth

- `POST /api/auth/login` – Admin login (returns JWT)
- `POST /api/auth/logout` – Invalidate the token

### 📥 Feedback

- `GET /api/feedbacks` – View all feedback
- `POST /api/feedbacks/import` – Import JSON (no duplicates)

### 🖼️ Images

- `GET /api/images` – Get all images
- `POST /api/images` – Upload new image with metadata
- `PUT /api/images/:id` – Update image details
- `DELETE /api/images/:id` – Delete image

---

## ⚠️ Notes

- Token blacklist is in-memory. For production, use Redis.
- Protect all admin routes with middleware.
- Ensure `/uploads` folder exists or configure cloud storage in production.

---

## 📝 License

This backend is built for the Morsl App project and is for internal use only.

---

## 🙋 Contact

**Developer:** Barshon  
GitHub: [github.com/barshono96](https://github.com/barshono96)