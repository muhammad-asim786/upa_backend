import mongoose from "mongoose";




const dailyActivityReportSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    shifrtStartTime: {
        type: Date,
        required: true,
    },
    shifrtEndTime: {
        type: Date,
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



const dailyActivityReportModel = mongoose.model("DailyActivityReport", dailyActivityReportSchema);
export default dailyActivityReportModel;




