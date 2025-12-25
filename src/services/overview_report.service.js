import overviewReportModel from "../models/overview_report.js";

export const createOverviewReportService = async (data)=>{
    try{
        const createOverviewReport = new overviewReportModel(data);
        await createOverviewReport.save();
        return createOverviewReport.toJSON();
    }catch(error){
        throw new Error(`Error Creating Overview Report: ${error.message}`);
    }
}

export const getOverviewReportService = async (userId)=>{
    try{
        const getOverviewReport = await overviewReportModel.find({ userId });
        return getOverviewReport;
    }catch(error){
        throw new Error(`Error Getting Overview Report: ${error.message}`);
    }
}

