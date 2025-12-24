import mongoose from "mongoose";

const trespasserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Party being trespassed
  partyName: {
    type: String,
    required: true,
    trim: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  // Location/Address
  address: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  // Date issued
  dateIssued: {
    type: Date,
    required: true,
  },

  // Person issuing the notice
  issuingPersonName: {
    type: String,
    required: true,
    trim: true,
  },

  // Signature of party receiving the notice
  signature: {
    type: String,
    required: true,
    trim: true,
  },

  // Images
  images: {
    type: [String], // image URLs (Cloudinary / S3)
    default: [],
  },

  // Reason for trespass
  reason: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },

  // Status
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

}, {
  timestamps: true,
});

const Trespasser = mongoose.model("Trespasser", trespasserSchema);
export default Trespasser;

