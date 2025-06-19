"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_validator_1 = require("../validators/auth.validator");
const validate_middleware_1 = require("../middleware/validate.middleware");
const router = express_1.default.Router();
router.post('/register', auth_validator_1.registerAdminValidator, validate_middleware_1.validateRequest, (req, res, next) => {
    (0, auth_controller_1.registerAdmin)(req, res).catch(next);
});
router.post('/login', auth_validator_1.loginAdminValidator, validate_middleware_1.validateRequest, (req, res, next) => {
    (0, auth_controller_1.loginAdmin)(req, res).catch(next);
});
exports.default = router;
