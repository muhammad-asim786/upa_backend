import mongoose from 'mongoose';

/**
 * OTP Model
 * Stores hashed OTP codes with expiration and attempt tracking
 */
const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true, // Index for faster lookups
    },
    otpHash: {
      type: String,
      required: [true, 'OTP hash is required'],
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required'],
      index: { expireAfterSeconds: 0 }, // TTL index to auto-delete expired documents
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt
  }
);

// Compound index for faster queries
otpSchema.index({ userId: 1, expiresAt: 1 });

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;

