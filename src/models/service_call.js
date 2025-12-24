import mongoose from "mongoose";

/* ===============================
   Sub Schemas
================================ */

// Time & Activity Entry
const timeActivitySchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
}, { _id: false });

/* ===============================
   Main Service Call Schema
================================ */

const serviceCallSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  employee: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    }, 
    name: {
      type: String,
      required: true,
    },
  },

  location: {
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

  date: {
    type: Date,
    required: true,
  },

  phoneNumber: {
    type: String,
  },

  images: {
    type: [String], // image URLs (Cloudinary / S3)
    default: [],
  },

  details: {
    type: String,
  },

  timeline: {
    type: [timeActivitySchema],
    default: [],
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

}, {
  timestamps: true,
});

const ServiceCall = mongoose.model("ServiceCall", serviceCallSchema);
export default ServiceCall;

