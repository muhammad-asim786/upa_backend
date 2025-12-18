import mongoose from "mongoose";




const incidentReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    locationId: {
        type: String,
        ref: "Location",
        required: true,
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
    activities: {
        type: Array,
        required: true,
        default: [],
    },
    images: {
        type: Array,
        required: true,
        default: [],
    },
    status: {
        type: String,
        required: true,
        default: "Draft",
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
})



const incidentReportModel = mongoose.model("IncidentReport", incidentReportSchema);
export default incidentReportModel;




