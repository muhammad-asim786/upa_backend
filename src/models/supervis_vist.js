import mongoose from "mongoose";

const supervisorVisitSchema = new mongoose.Schema(
  {
    // Logged-in user (admin/supervisor)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Supervisor details
    supervisor: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Employee being checked
    employee: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Location visited
    location: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // Visit date
    visitDate: {
      type: Date,
      required: true,
    },

    // Timing
    arrivalTime: {
      type: String, // e.g. "09:30"
      required: true,
    },

    departureTime: {
      type: String, // e.g. "17:00"
      required: true,
    },

    // Checks
    properUniform: {
      type: Boolean,
      default: false,
    },

    onTime: {
      type: Boolean,
      default: false,
    },

    // Notes
    supervisorNote: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // Status (optional but very useful)
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const SupervisorVisit = mongoose.model(
  "SupervisorVisit",
  supervisorVisitSchema
);
export default SupervisorVisit;



