import mongoose from "mongoose";

/* ===============================
   Sub Schemas
================================ */

// Suspect / Victim
const suspectVictimSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Suspect", "Victim"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: String,
  dateOfBirth: Date,
  height: String,
  weight: String,
  hair: String,
  race: String,
  eyes: String,
  clothing: String,
  phoneNumber: String,
  address: String,
  images: {
    type: [String], // image URLs
    default: [],
  },
}, { _id: false });

// Vehicle
const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: String,
  plateNo: {
    type: String,
    required: true,
  },
  state: String,
  damage: String,
}, { _id: false });

// Responding Agency
const respondingAgencySchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  caseNo: {
    type: String,
    required: true,
  },
  arrivedAt: String,
  clearedAt: String,
  respondingOfficers: String,
  badgeNumbers: String,
}, { _id: false });

/* ===============================
   Main Incident Report Schema
================================ */

const incidentReportSchema = new mongoose.Schema({
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

  incidentDate: {
    type: Date,
    required: true,
  },

  incidentTime: {
    type: String,
    required: true,
  },

  suspectsVictims: {
    type: [suspectVictimSchema],
    default: [],
  },

  vehicles: {
    type: [vehicleSchema],
    default: [],
  },

  respondingAgencies: {
    type: [respondingAgencySchema],
    default: [],
  },

  narrative: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },

}, {
  timestamps: true,
});

const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);
export default IncidentReport;
