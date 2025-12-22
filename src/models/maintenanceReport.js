import mongoose from 'mongoose';




const maintenanceReportSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    employee:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
            required: true
        },
        name: {
            type: String,
            required: true
        }
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

      dateOfDiscovery: {
        type: Date,
        required: true,
      },

      timeOfDiscovery: {
        type: String,
        required: true,
      },

      images: {
        type: [String], // image URLs (Cloudinary / S3)
        default: [],
      },

      maintenanceNeeded: {
        type: String,
        required: true,
      },

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



const MaintenanceReport = mongoose.model(
    "MaintenanceReport",
    maintenanceReportSchema
  );

  export default MaintenanceReport;