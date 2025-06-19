"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminValidator = exports.registerAdminValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerAdminValidator = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];
exports.loginAdminValidator = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is required and must be valid'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
