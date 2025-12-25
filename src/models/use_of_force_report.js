import mongoose from "mongoose";

/* ===============================
   Sub Schemas
================================ */

// Officer Information
const officerInfoSchema = new mongoose.Schema({
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
  caseNumber: {
    type: String,
    trim: true,
  },
  irNumber: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
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
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zip: {
    type: String,
    trim: true,
  },
}, { _id: false });

// Suspect Information
const suspectInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  sex: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  idNumber: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  height: {
    type: String,
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  hair: {
    type: String,
    trim: true,
  },
  race: {
    type: String,
    trim: true,
  },
}, { _id: false });

// Disposition Information
const dispositionInfoSchema = new mongoose.Schema({
  arrested: {
    type: String,
    trim: true,
  },
  detox: {
    type: String,
    trim: true,
  },
  hospital: {
    type: String,
    trim: true,
  },
  released: {
    type: String,
    trim: true,
  },
}, { _id: false });

/* ===============================
   Main Use of Force Report Schema
================================ */

const useOfForceReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Officer Information
  officerInfo: {
    type: officerInfoSchema,
    required: true,
  },

  // Suspect Information
  suspectInfo: {
    type: suspectInfoSchema,
    required: true,
  },

  // Disposition Information
  dispositionInfo: {
    type: dispositionInfoSchema,
  },

  // Level of Resistance (array of selected options)
  levelOfResistance: {
    selected: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
  },

  // Weapons Used (array of selected options)
  weaponsUsed: {
    selected: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
    },
  },

  // Injuries (array of selected options)
  injuries: {
    type: [String],
    default: [],
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

const UseOfForceReport = mongoose.model("UseOfForceReport", useOfForceReportSchema);
export default UseOfForceReport;

