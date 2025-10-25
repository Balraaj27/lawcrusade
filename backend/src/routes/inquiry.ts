import { Router } from 'express';
import { query } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validateRequest, inquirySchema } from '../middleware/validation';

// Convert uuid import to require (matches backend CommonJS style)
const { v4: uuidv4 } = require('uuid');

const router = Router();

// CREATE new inquiry (public)
router.post('/', validateRequest(inquirySchema), async (req, res) => {
  try {
    const { name, email, phone, subject, message, service } = req.body;
    const id = uuidv4();
    
    const result = await query(`
      INSERT INTO inquiries (id, name, email, phone, subject, message, service)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [id, name, email, phone, subject, message, service]);
    
    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry'
    });
  }
});

// GET all inquiries (admin)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereClause = '';
    let queryParams: any[] = [];
    let paramIndex = 1;
    
    if (status) {
      whereClause = `WHERE status = $${paramIndex++}`;
      queryParams.push(status);
    }
    
    const inquiriesQuery = `
      SELECT * FROM inquiries 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    queryParams.push(Number(limit), offset);
    
    const inquiriesResult = await query(inquiriesQuery, queryParams);
    
    const countQuery = `
      SELECT COUNT(*) as total FROM inquiries ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams.slice(0, -2));
    
    return res.json({
      success: true,
      data: {
        inquiries: inquiriesResult.rows,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: parseInt(countResult.rows[0].total),
          totalPages: Math.ceil(parseInt(countResult.rows[0].total) / Number(limit))
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries'
    });
  }
});

// UPDATE inquiry status
router.patch('/:id/status', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const result = await query(`
      UPDATE inquiries 
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `, [status, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status'
    });
  }
});

// DELETE inquiry
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM inquiries WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
});

export default router;