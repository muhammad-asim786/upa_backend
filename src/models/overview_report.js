import mongoose from "mongoose";

const overviewReportSchema = new mongoose.Schema({
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

  date: {
    type: Date,
    required: true,
  },

  shiftStartTime: {
    type: String,
    required: true,
  },

  shiftEndTime: {
    type: String,
    required: true,
  },

  overviewDetails: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

}, {
  timestamps: true,
});

const OverviewReport = mongoose.model("OverviewReport", overviewReportSchema);
export default OverviewReport;

