import useOfForceReportModel from "../models/use_of_force_report.js";

export const createUseOfForceReportService = async (data)=>{
    try{
        const createUseOfForceReport = new useOfForceReportModel(data);
        await createUseOfForceReport.save();
        return createUseOfForceReport.toJSON();
    }catch(error){
        throw new Error(`Error Creating Use of Force Report: ${error.message}`);
    }
}

export const getUseOfForceReportService = async (userId)=>{
    try{
        const getUseOfForceReport = await useOfForceReportModel.find({ userId });
        return getUseOfForceReport;
    }catch(error){
        throw new Error(`Error Getting Use of Force Report: ${error.message}`);
    }
}

