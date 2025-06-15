import { Request, Response } from 'express';
import Admin, { IAdmin } from '../modals/admin.model';
import generateToken from '../utils/generateToken';


export const registerAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  try {
    const newAdmin = await Admin.create({ email, password }) as IAdmin;

    res.status(201).json({
      _id: newAdmin._id,
      email: newAdmin.email,
      token: generateToken(newAdmin._id.toString())
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }) as IAdmin;

  try {
    if (admin && await admin.matchPassword(password)) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id.toString())
      });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error });
  }
};