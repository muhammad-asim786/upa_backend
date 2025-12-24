import * as superviseVisitService from "../services/superviseVisit.service.js";

export const createSuperviseVisitController = async (req, res)=>{
    try{
        const userId = req.user.userId; // token decoded in authenticate middleware
        const {
            supervisor,
            employee,
            location,
            visitDate,
            arrivalTime,
            departureTime,
            properUniform,
            onTime,
            supervisorNote,
            status,
        } = req.body;

        const data = {
            userId,
            supervisor,
            employee,
            location,
            visitDate,
            arrivalTime,
            departureTime,
            properUniform: properUniform || false,
            onTime: onTime || false,
            supervisorNote,
            status: status || "Draft",
        }       
        const result = await superviseVisitService.createSuperviseVisitService(data);
        console.log("result :", result);
        if(!result){
            throw new Error('Failed to Create Supervise Visit');
        }
        return res.status(201).json({
            success: true,
            message: 'Supervise Visit Created Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({   
            success: false,
            message: error.message || 'Failed to Create Supervise Visit',
        });
    }
}

export const getSuperviseVisitController = async (req, res)=>{
    try{
        const userId = req.user.userId;
        const result = await superviseVisitService.getSuperviseVisitService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no supervise visit data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Supervise Visit Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Retrieve Supervise Visit',
        });
    }
}
