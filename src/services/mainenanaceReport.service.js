import MaintenanceReport from "../models/maintenancereport.js";

export const createMaintenanceReportService = async (data)=>{
    try{
        const createMaintenanceReport = new MaintenanceReport(data);
        await createMaintenanceReport.save();
        return createMaintenanceReport.toJSON();
    }catch(error){
        throw new Error(`Error Creating Maintenance Report: ${error.message}`);
    }
}

export const getMaintenanceReportService = async (userId)=>{
    try{
        const getMaintenanceReport = await MaintenanceReport.find({ userId });
        return getMaintenanceReport;
    }catch(error){
        throw new Error(`Error Getting Maintenance Report: ${error.message}`);
    }
}