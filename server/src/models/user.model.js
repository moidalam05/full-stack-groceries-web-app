import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import crypto from "crypto";
import ms from "ms";

// Address Schema
const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: "India",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [100, "Password must not exceed 100 characters"],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    addresses: [addressSchema],
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
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otpResendCount: { type: Number, default: 0 },
    lastOtpSentAt: { type: Date },

    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String, trim: true },
    refreshToken: [
      {
        token: { type: String, default: "", select: false },
        expires: { type: Date, required: true, index: { expires: 0 } },
        createdAt: { type: Date, default: Date.now },
        device: { type: String, default: "" },
        ip: { type: String, default: "" },
      },
    ],
    tokenVersion: { type: Number, default: 0 },

    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ email: 1 });
userSchema.index({ "addresses.isDefault": 1 });
userSchema.index({ email: 1 }, { unique: true, sparse: true });

// 🔐 Password Hash Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  // 🔍 Password Compare Method
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // 🔑 Generate JWT Tokens
  generateRefreshToken: function (ip, device) {
    const token = jwt.sign(
      { _id: this._id, tokenVersion: this.tokenVersion },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshExpiresIn }
    );

    this.refreshToken.push({
      token,
      expires: new Date(Date.now() + ms(config.jwtRefreshExpiresIn)),
      ip: ip || "",
      device: device || "",
    });

    return token;
  },

  generateAccessToken: function () {
    return jwt.sign(
      { _id: this._id, role: this.role, email: this.email },
      config.jwtAccessSecret,
      {
        expiresIn: config.jwtAccessExpiresIn,
      }
    );
  },

  // Refresh Token Management
  incrementTokenVersion: function () {
    this.tokenVersion += 1;
    return this.save();
  },

  // password Reset Token Generation
  generateResetPasswordToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  },

  // generate OTP Code
  generateOtpCode: function () {
    const now = Date.now();
    const coolDown = 60 * 1000;
    const maxResendCount = 5;

    if (this.lastOtpSentAt && now - this.lastOtpSentAt.getTime() < coolDown) {
      throw new Error("Please wait before requesting a new OTP");
    }

    const resendResetTime = 10 * 60 * 1000;
    if (
      this.lastOtpSentAt &&
      now - this.lastOtpSentAt.getTime() > resendResetTime
    ) {
      this.otpResendCount = 0;
    }

    if (this.otpResendCount >= maxResendCount) {
      throw new Error(
        "You have reached the maximum number of OTP resend attempts"
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpCode = otpCode;
    this.otpExpires = new Date(now + 5 * 60 * 1000);
    this.isOtpVerified = false;
    this.otpResendCount += 1;
    this.lastOtpSentAt = new Date(now);
    return otpCode;
  },
  // Verify OTP Code
  verifyOtpCode: async function (Otp) {
    if (this.otpCode !== Otp) return false;
    if (Date.now() > this.otpExpires) return false;
    this.isOtpVerified = true;
    this.otpCode = null;
    this.otpExpires = null;
    await this.save();
    return true;
  },
};

export const User = mongoose.model("User", userSchema);
