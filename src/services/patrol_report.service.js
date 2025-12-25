import patrolReportModel from "../models/patrol_report.js";

export const createPatrolReportService = async (data)=>{
    try{
        const createPatrolReport = new patrolReportModel(data);
        await createPatrolReport.save();
        return createPatrolReport.toJSON();
    }catch(error){
        throw new Error(`Error Creating Patrol Report: ${error.message}`);
    }
}

export const getPatrolReportService = async (userId)=>{
    try{
        const getPatrolReport = await patrolReportModel.find({ userId });
        return getPatrolReport;
    }catch(error){
        throw new Error(`Error Getting Patrol Report: ${error.message}`);
    }
}

