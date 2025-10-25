import Joi from 'joi';

export const blogPostSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  slug: Joi.string().min(1).max(200).required(),
  excerpt: Joi.string().max(500).optional(),
  content: Joi.string().min(1).required(),
  category: Joi.string().min(1).max(100).required(),
  tags: Joi.string().max(200).optional(),
  published: Joi.boolean().optional(),
  featured: Joi.boolean().optional(),
  imageUrl: Joi.string().uri().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(1).max(100).required()
});

export const inquirySchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).optional(),
  subject: Joi.string().min(1).max(200).required(),
  message: Joi.string().min(1).max(2000).required(),
  service: Joi.string().max(100).optional()
});

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};