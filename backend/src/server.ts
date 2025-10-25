import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import uploadRoutes from './routes/upload';
import inquiryRoutes from './routes/inquiry';
import { initDB } from './config/initDB';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Initialize database (auto-create tables)
(async () => {
  console.log(process.env.DATABASE_URL,"url")
  await initDB();
})();

// ✅ Security middlewares
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15min
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ✅ General Middleware
app.use(compression());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Static File Serving For Uploads (Render + Local)
app.use('/uploads', express.static(process.env.UPLOAD_DIR || path.join(__dirname, '../uploads')));

// ✅ Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiry', inquiryRoutes);

// ✅ 404 Handler
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ✅ Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Allowed Frontend: ${process.env.FRONTEND_URL}`);
  console.log(`📁 Uploads Directory: ${process.env.UPLOAD_DIR || path.join(__dirname, '../uploads')}`);
});

export default app;