import * as overviewReportServices from "../services/overview_report.service.js";

export const createOverviewReportController = async (req, res) => {
    try {
        const userId = req.user.userId; // token decoded in authenticate middleware

        const {
            employee,
            date,
            shiftStartTime,
            shiftEndTime,
            overviewDetails,
            status,
        } = req.body;

        const data = {
            userId,
            employee,
            date,
            shiftStartTime,
            shiftEndTime,
            overviewDetails,
            status: status || "Draft",
        };

        const result = await overviewReportServices.createOverviewReportService(data);

        return res.status(201).json({
            success: true,
            message: "Overview Report Created Successfully",
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Create Overview Report",
        });
    }
};

export const getOverviewReportController = async (req, res)=> {
    try{
        const userId = req.user.userId;
        const result = await overviewReportServices.getOverviewReportService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no overview report data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Overview Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Overview Report',
        });
    }
}

