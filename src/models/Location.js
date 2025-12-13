import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    locationId: {
      type: String,
      required: true,
      unique: true,   // automatically creates an index
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // optional but recommended
  }
);


const LocationModel = mongoose.model("Location", locationSchema);

export default LocationModel;
