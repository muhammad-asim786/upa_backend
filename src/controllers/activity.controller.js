import * as activityServices from "../services/activity.service.js";




export const createActivityController = async (req, res)=>{


    try{
        const {employeeId, locationId, date, shiftStartTime, shiftEndTime, activities, images, status} = req.body;

        const data = {
            employeeId,
            locationId,
            date,
            shiftStartTime,
            shiftEndTime,
            activities,
            images,
            status,
        }

        const result = await activityServices.createActivityService(data);

        if(!result){
            throw new Error('Failed to Create Activity');
        }

        return res.status(201).json({
            success: true,
            message: 'Activity Created Successfully',
            data: result,
        }); 
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Create Activity',
        });
    }
}


export const getActivityController = async (req, res)=> {
    try{
        const result = await activityServices.getActivityService();

        if(!result){
            throw new Error('Failed to Get Activity');
        }

        return res.status(200).json({
            success: true,
            message: 'Activity Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Create Activity',
        });
    }
}