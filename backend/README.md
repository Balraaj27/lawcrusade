# Law Firm Backend API

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database
```bash
# Add your PostgreSQL connection string to .env
DATABASE_URL="postgresql://username:password@host:port/database"

# Initialize database tables
npm run db:init
```

### 3. Start Development Server
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/register` - Register admin  
- `GET /api/auth/verify` - Verify token

### Blog Posts
- `GET /api/blog` - Get published posts (public)
- `GET /api/blog/:slug` - Get single post (public)
- `GET /api/blog/admin/all` - Get all posts (admin)
- `POST /api/blog` - Create post (admin)
- `PUT /api/blog/:id` - Update post (admin)
- `DELETE /api/blog/:id` - Delete post (admin)
- `GET /api/blog/categories/list` - Get categories (public)

### File Upload
- `POST /api/upload/image` - Upload image
- `DELETE /api/upload/image/:filename` - Delete image

### Inquiries
- `POST /api/inquiry` - Submit inquiry (public)
- `GET /api/inquiry` - Get all inquiries (admin)
- `PATCH /api/inquiry/:id/status` - Update status (admin)
- `DELETE /api/inquiry/:id` - Delete inquiry (admin)

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=5242880
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🏗️ Architecture

- **Pure PostgreSQL** with raw SQL queries
- **Express.js** REST API
- **JWT Authentication**
- **File Upload** with Multer
- **Rate Limiting** & Security Headers
- **TypeScript** for type safety

## 🗄️ Database Schema

### admins
- id (VARCHAR, Primary Key)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- name (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### blog_posts
- id (VARCHAR, Primary Key)
- title (VARCHAR)
- slug (VARCHAR, Unique)
- excerpt (TEXT)
- content (TEXT)
- category (VARCHAR)
- tags (TEXT)
- published (BOOLEAN)
- featured (BOOLEAN)
- image_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### inquiries
- id (VARCHAR, Primary Key)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- subject (VARCHAR)
- message (TEXT)
- service (VARCHAR)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### page_content
- id (VARCHAR, Primary Key)
- page (VARCHAR, Unique)
- title (VARCHAR)
- content (TEXT)
- updated_at (TIMESTAMP)