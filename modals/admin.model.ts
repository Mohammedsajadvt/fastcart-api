import mongoose, { Document, Model, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  _id: ObjectId,
  email: string;
  password: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

adminSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);
export default Admin;
