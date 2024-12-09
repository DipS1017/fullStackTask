import { Document, model, Schema, Types } from "mongoose";

const roleEnum = ["USER", "ADMIN"] as const;

interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: (typeof roleEnum)[number];
  isVerified: boolean;
  isActive: boolean;
  _id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: roleEnum, default: "USER" },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

const User = model<IUser>("User", userSchema);

export default User;
