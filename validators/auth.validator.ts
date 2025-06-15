import { body } from 'express-validator';

export const registerAdminValidator = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

export const loginAdminValidator = [
  body('email').isEmail().withMessage('Email is required and must be valid'),
  body('password').notEmpty().withMessage('Password is required'),
]