import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      select: false,
    },
    phone: { type: String, trim: true, match: [/^[6-9]\d{9}$/] },
    profileImage: { type: String, default: "" },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "rider"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpCode: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
      select: false,
    },
    otpResendCount: {
      type: Number,
      default: 0,
    },
    lastOtpSentAt: { type: Date },

    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastLoginAt: { type: Date },

    refreshToken: [
      {
        token: { type: String, default: "", select: false },
        expires: { type: Date, required: true, index: { expires: 0 } },
        createdAt: { type: Date, default: Date.now },
        device: { type: String, default: "" },
      },
    ],
    tokenVersion: { type: Number, default: 0 },

    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true, versionKey: false }
);

export const User = mongoose.model("User", userSchema);
