import express, { Request, Response, NextFunction } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/auth.controller';
import {
    registerAdminValidator,
    loginAdminValidator,
} from '../validators/auth.validator';
import { validateRequest } from '../middleware/validate.middleware';

const router = express.Router();

router.post('/register', registerAdminValidator, validateRequest, (req: Request, res: Response, next: NextFunction) => {
    registerAdmin(req, res).catch(next);
});

router.post('/login', loginAdminValidator, validateRequest, (req: Request, res: Response, next: NextFunction) => {
    loginAdmin(req, res).catch(next);
});


export default router;
