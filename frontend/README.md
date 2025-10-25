# Law Firm Website - Clean Architecture

## 🏗️ **Project Structure**

```
law-firm-website/
├── frontend/                 # Next.js Frontend (Port 3000)
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # UI components
│   │   ├── lib/            # API clients & utilities
│   │   └── hooks/          # React hooks
│   ├── package.json        # Frontend dependencies
│   └── .env.local         # Frontend env vars
│
├── backend/                 # Express.js Backend (Port 5000)
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   ├── config/         # Database config
│   │   └── utils/          # Database utilities
│   ├── uploads/           # File uploads
│   └── package.json       # Backend dependencies
│
└── README.md
```

## 🚀 **Quick Start**

### **1. Backend Setup**
```bash
cd backend
npm install
# Add your PostgreSQL URL to .env
npm run db:init    # Create database tables
npm run dev        # Start API server (Port 5000)
```

### **2. Frontend Setup**
```bash
npm install
npm run dev        # Start Next.js (Port 3000)
```

### **3. Access Admin Panel**
- URL: `http://localhost:3000/admin/login`
- Default: `admin@lawfirm.com / admin123`

## 📡 **API Architecture**

### **Frontend → Backend Communication**
- Frontend calls external APIs (no internal API routes)
- JWT authentication with Bearer tokens
- RESTful API design
- File upload via Multer

### **Key API Endpoints**
- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Blog**: `/api/blog`, `/api/blog/:slug`
- **Admin**: `/api/blog/admin/all`, `/api/inquiry`
- **Upload**: `/api/upload/image`

## 🗄️ **Database**

- **PostgreSQL** with raw SQL queries
- **No ORM** - Pure SQL for performance
- **Tables**: admins, blog_posts, inquiries, page_content
- **Indexes** for optimized queries

## 🧹 **What Was Cleaned**

### **Removed from Frontend:**
- ❌ All Prisma dependencies and files
- ❌ Database connections and models
- ❌ Internal API routes (`/src/app/api`)
- ❌ Unused UI components (20+ components)
- ❌ Unused dependencies (Prisma, Socket.io, etc.)
- ❌ Custom server setup

### **Kept Essential:**
- ✅ Core UI components (Button, Card, Input, etc.)
- ✅ API client libraries (axios)
- ✅ Authentication handling
- ✅ Blog and admin functionality
- ✅ Responsive design

## 📦 **Final Dependencies**

### **Frontend (Clean)**
```json
{
  "dependencies": {
    "axios": "^1.10.0",
    "next": "15.3.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1",
    // + Essential UI components
  }
}
```

### **Backend (Pure PostgreSQL)**
```json
{
  "dependencies": {
    "express": "^4.21.2",
    "pg": "^8.13.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "multer": "^1.4.5-lts.1",
    // + Security & validation
  }
}
```

## 🎯 **Benefits of Clean Architecture**

- ✅ **Separation of Concerns** - Frontend & backend independent
- ✅ **Better Performance** - No heavy ORM overhead
- ✅ **Scalability** - Easy to add mobile apps, admin panels
- ✅ **Security** - API layer separation
- ✅ **Maintainability** - Clean, focused codebase
- ✅ **Team Development** - Frontend/backend teams can work independently

## 🔧 **Environment Variables**

### **Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### **Backend (.env)**
```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-secret-key"
PORT=5000
```

---

**🎉 Clean, professional, and production-ready law firm website with separate frontend/backend architecture!**