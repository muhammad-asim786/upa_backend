import * as patrolReportServices from "../services/patrol_report.service.js";

export const createPatrolReportController = async (req, res) => {
    try {
        const userId = req.user.userId; // token decoded in authenticate middleware

        const {
            employee,
            location,
            date,
            images,
            details,
            timeline,
            status,
        } = req.body;

        const data = {
            userId,
            employee,
            location,
            date,
            images: images || [],
            details,
            timeline: timeline || [],
            status: status || "Draft",
        };

        const result = await patrolReportServices.createPatrolReportService(data);

        return res.status(201).json({
            success: true,
            message: "Patrol Report Created Successfully",
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Create Patrol Report",
        });
    }
};

export const getPatrolReportController = async (req, res)=> {
    try{
        const userId = req.user.userId;
        const result = await patrolReportServices.getPatrolReportService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no patrol report data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Patrol Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Patrol Report',
        });
    }
}

