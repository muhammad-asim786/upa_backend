import * as useOfForceReportServices from "../services/use_of_force_report.service.js";

export const createUseOfForceReportController = async (req, res) => {
    try {
        const userId = req.user.userId; // token decoded in authenticate middleware

        const {
            officerInfo,
            suspectInfo,
            dispositionInfo,
            levelOfResistance,
            weaponsUsed,
            injuries,
            status,
        } = req.body;

        const data = {
            userId,
            officerInfo,
            suspectInfo,
            dispositionInfo: dispositionInfo || {},
            levelOfResistance: {
                selected: levelOfResistance?.selected || [],
                notes: levelOfResistance?.notes || "",
            },
            weaponsUsed: {
                selected: weaponsUsed?.selected || [],
                notes: weaponsUsed?.notes || "",
            },
            injuries: injuries || [],
            status: status || "Draft",
        };

        const result = await useOfForceReportServices.createUseOfForceReportService(data);

        return res.status(201).json({
            success: true,
            message: "Use of Force Report Created Successfully",
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Create Use of Force Report",
        });
    }
};

export const getUseOfForceReportController = async (req, res)=> {
    try{
        const userId = req.user.userId;
        const result = await useOfForceReportServices.getUseOfForceReportService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no use of force report data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Use of Force Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Use of Force Report',
        });
    }
}

