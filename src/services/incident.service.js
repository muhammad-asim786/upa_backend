import incidentReportModel from "../models/incidentreport.js";

export const createIncidentReportService = async (data)=>{

    try{
        const createIncidentReport = new incidentReportModel(data);
        await createIncidentReport.save();
        return createIncidentReport.toJSON();
    }catch(error){
        throw new Error(`Error Creating Incident Report: ${error.message}`);
    }
}


export const getIncidentReportService = async ()=>{
    try{
        const getIncidentReport = await incidentReportModel.find();
        if(getIncidentReport.length === 0){
            throw new Error('No Incident Report Found');
        }
        return getIncidentReport;
    }catch(error){
        throw new Error(`Error Getting Incident Report: ${error.message}`);
    }
}

