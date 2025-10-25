import { Router } from 'express';
import { query } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validateRequest, blogPostSchema } from '../middleware/validation';
import { v4 as uuidv4 } from 'uuid';

// Use require() for bcrypt (consistency with your setup)
const bcrypt = require('bcryptjs');

const router = Router();

// GET all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereClause = 'WHERE published = true';
    let queryParams: any[] = [];
    let paramIndex = 1;
    
    if (category) {
      whereClause += ` AND category = $${paramIndex++}`;
      queryParams.push(category);
    }
    
    if (search) {
      whereClause += ` AND (title ILIKE $${paramIndex++} OR content ILIKE $${paramIndex++})`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }
    
    const postsQuery = `
      SELECT * FROM blog_posts 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    queryParams.push(Number(limit), offset);
    
    const postsResult = await query(postsQuery, queryParams);
    
    const countQuery = `
      SELECT COUNT(*) as total FROM blog_posts ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams.slice(0, -2));
    
    return res.json({
      success: true,
      data: {
        posts: postsResult.rows,
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
      message: 'Failed to fetch blog posts'
    });
  }
});

// GET single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND published = true',
      [slug]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// GET all blog posts (admin)
router.get('/admin/all', authenticate, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let whereClause = '';
    let queryParams: any[] = [];
    let paramIndex = 1;
    
    if (category) {
      whereClause += ` WHERE category = $${paramIndex++}`;
      queryParams.push(category);
    }
    
    if (search) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ` (title ILIKE $${paramIndex++} OR content ILIKE $${paramIndex++})`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }
    
    const postsQuery = `
      SELECT * FROM blog_posts 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    queryParams.push(Number(limit), offset);
    
    const postsResult = await query(postsQuery, queryParams);
    
    const countQuery = `
      SELECT COUNT(*) as total FROM blog_posts ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams.slice(0, -2));
    
    return res.json({
      success: true,
      data: {
        posts: postsResult.rows,
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
      message: 'Failed to fetch blog posts'
    });
  }
});

// CREATE blog post
// authenticate
router.post('/', validateRequest(blogPostSchema), async (req: AuthRequest, res) => {
  try {
    const { title, slug, excerpt, content, category, tags, published, featured, imageUrl } = req.body;
    const id = uuidv4();
    
    const result = await query(`
      INSERT INTO blog_posts (id, title, slug, excerpt, content, category, tags, published, featured, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [id, title, slug, excerpt, content, category, tags, published || false, featured || false, imageUrl]);
    
    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: result.rows[0]
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

// UPDATE blog post
router.put('/:id', authenticate, validateRequest(blogPostSchema), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, category, tags, published, featured, imageUrl } = req.body;
    
    const result = await query(`
      UPDATE blog_posts 
      SET title = $1, slug = $2, excerpt = $3, content = $4, category = $5, 
          tags = $6, published = $7, featured = $8, image_url = $9, updated_at = CURRENT_TIMESTAMP
      WHERE id = $10
      RETURNING *
    `, [title, slug, excerpt, content, category, tags, published, featured, imageUrl, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: result.rows[0]
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
});

// DELETE blog post
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    
    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
});

// GET categories
router.get('/categories/list', async (req, res) => {
  try {
    const result = await query(`
      SELECT category, COUNT(*) as count 
      FROM blog_posts 
      WHERE published = true 
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

export default router;