import * as maintenanceReportService from "../services/mainenanaceReport.service.js";

export const createMaintenanceReportController = async (req, res)=>{
    try{
        const {employee, location, dateOfDiscovery, timeOfDiscovery, images, maintenanceNeeded, status} = req.body;
        const userId = req.user.userId;
        const data = {
            userId,
            employee,
            location,
            dateOfDiscovery,
            timeOfDiscovery,
            images,
            maintenanceNeeded,  
            status,
        }
        const result = await maintenanceReportService.createMaintenanceReportService(data);
        if(!result){
            throw new Error('Failed to Create Maintenance Report');
        }
        return res.status(201).json({
            success: true,
            message: 'Maintenance Report Created Successfully',
            data: result,
        });
    }catch(error){  
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Create Maintenance Report',
        });
    }
}

export const getMaintenanceReportController = async (req, res)=>{
    try{
        const userId = req.user.userId;
        const result = await maintenanceReportService.getMaintenanceReportService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no maintenance report data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Maintenance Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Maintenance Report',
        });
    }
}