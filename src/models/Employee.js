import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,  // this already creates an index
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      default: null,
      unique: true,     // also creates its own unique index
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    designation: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
