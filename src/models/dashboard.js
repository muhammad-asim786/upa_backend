import mongoose from "mongoose";

/**
 * Dashboard Model
 * Stores dashboard data for each user
 */

const employeeAnniversarySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    date: { type: String, default: "" },
    days: { type: Number, default: 0 },
    months: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 }
  },
  { _id: false }
);

const dashboardSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true
    },

    activityReport: {
      type: Number,
      default: 0
    },

    incidentsReport: {
      type: Number,
      default: 0
    },

    trespass: {
      type: Number,
      default: 0
    },

    patrolReport: {
      type: Number,
      default: 0
    },

    employeeAnniversary: {
      type: employeeAnniversarySchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

// Index for faster queries by userID
dashboardSchema.index({ userID: 1 });

const DashboardModel = mongoose.model("Dashboard", dashboardSchema);

export default DashboardModel;
