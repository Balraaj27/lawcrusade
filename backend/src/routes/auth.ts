import { Router } from 'express';
import { query } from '../config/database';
import { validateRequest, loginSchema, registerSchema } from '../middleware/validation';
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

// Ensure environment variable is treated as string
const JWT_SECRET = process.env.JWT_SECRET as string;

// REGISTER admin
router.post('/register', validateRequest(registerSchema), async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await query(`
      INSERT INTO admins (id, email, password, name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, created_at
    `, [id, email, hashedPassword, name]);

    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    return res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        user: result.rows[0],
        token
      }
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to register admin'
    });
  }
});

// LOGIN admin
router.post('/login', validateRequest(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await query(
      'SELECT * FROM admins WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const admin = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    const { password: _, ...userWithoutPassword } = admin;
    
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to login'
    });
  }
});

// VERIFY token
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    const result = await query(
      'SELECT id, email, name, created_at FROM admins WHERE id = $1',
      [decoded.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

export default router;