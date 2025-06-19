"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.registerAdmin = void 0;
const admin_model_1 = __importDefault(require("../modals/admin.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingAdmin = yield admin_model_1.default.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    try {
        const newAdmin = yield admin_model_1.default.create({ email, password });
        res.status(201).json({
            _id: newAdmin._id,
            email: newAdmin.email,
            token: (0, generateToken_1.default)(newAdmin._id.toString())
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const admin = yield admin_model_1.default.findOne({ email });
    try {
        if (admin && (yield admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: (0, generateToken_1.default)(admin._id.toString())
            });
        }
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid credentials', error });
    }
});
exports.loginAdmin = loginAdmin;
