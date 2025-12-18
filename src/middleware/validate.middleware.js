import Joi from 'joi';

/**
 * Validation Middleware
 * Validates request data using Joi schemas
 */

/**
 * Middleware factory to validate request data
 * @param {Object} schema - Joi validation schema
 * @param {string} property - Request property to validate ('body', 'query', 'params')
 * @returns {Function} - Express middleware function
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all validation errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    // Replace request property with validated and sanitized value
    req[property] = value;
    next();
  };
};

/**
 * Common validation schemas
 */
export const schemas = {
  // Send OTP email schema
  sendOtpEmail: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
  }),
  // Register user schema
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    firstName: Joi.string().trim().min(1).optional().messages({
      'string.min': 'First name cannot be empty if provided',
    }),
    lastName: Joi.string().trim().min(1).optional().messages({
      'string.min': 'Last name cannot be empty if provided',
    }),
    phoneNumber: Joi.string().trim().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/).optional().allow('').messages({
      'string.pattern.base': 'Please provide a valid phone number',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
  }),

  // Verify OTP schema
  verifyOtp: Joi.object({
    otp: Joi.string()
      .length(6)
      .pattern(/^\d+$/)
      .required()
      .messages({
        'string.length': 'OTP must be exactly 6 digits',
        'string.pattern.base': 'OTP must contain only digits',
        'any.required': 'OTP is required',
      }),
    verificationToken: Joi.string().required().messages({
      'any.required': 'Verification token is required',
    }),
  }),

  // Set password schema
  setPassword: Joi.object({
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
    verificationToken: Joi.string().required().messages({
      'any.required': 'Verification token is required',
    }),
  }),

  // Login schema
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),

  // Update profile schema
  updateProfile: Joi.object({
    name: Joi.string().trim().allow('').optional(),
    image: Joi.string().uri().trim().allow('').optional().messages({
      'string.uri': 'Image must be a valid URL',
    }),
  }),

  // Refresh token schema
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required',
    }),
  }),
};

export default {
  validate,
  schemas,
};

