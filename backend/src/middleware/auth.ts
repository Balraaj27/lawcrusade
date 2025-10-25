import { Request, Response, NextFunction } from 'express';
import { query } from '../config/database';

// Use require (CommonJS style)
const jwt = require('jsonwebtoken');

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const result = await query(
      'SELECT id, email, name FROM admins WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }

    req.user = result.rows[0];

    // ✅ MUST RETURN next() to satisfy TS all code paths return
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};