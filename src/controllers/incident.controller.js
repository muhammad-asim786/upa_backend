import * as incidentServices from "../services/incident.service.js";




export const createIncidentReportController = async (req, res)=> {


    try{
        const {employeeName, employeeId, location, locationId, date, shiftStartTime, shiftEndTime, activities, images, status} = req.body;
        const userId = req.user.userId; // token decoded in authenticate middleware

        const data = {
            userId,
            employeeName,
            employeeId,
            location,
            locationId,
            date,
            shiftStartTime,
            shiftEndTime,
            activities,
            images,
            status,
        }

        const result = await incidentServices.createIncidentReportService(data);

        if(!result){
            throw new Error('Failed to Create Incident Report');
        }

        return res.status(201).json({
            success: true,
            message: 'Incident Report Created Successfully',
            data: result,
        }); 
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Create Incident Report',
        });
    }
}


export const getIncidentReportController = async (req, res)=> {
    try{
        const result = await incidentServices.getIncidentReportService();

        if(!result){
            throw new Error('Failed to Get Incident Report');
        }

        return res.status(200).json({
            success: true,
            message: 'Incident Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Incident Report',
        });
    }
}
