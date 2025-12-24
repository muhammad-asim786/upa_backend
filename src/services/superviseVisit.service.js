import supervisVistModel from "../models/supervis_vist.js";

export const createSuperviseVisitService = async (data)=>{
    try{
        const createSuperviseVisit = new supervisVistModel(data);
        await createSuperviseVisit.save();
        return createSuperviseVisit.toJSON();
    }catch(error){
        throw new Error(`Error Creating Supervise Visit: ${error.message}`);
    }
}       

export const getSuperviseVisitService = async (userId)=>{
    try{
        const superviseVisit = await supervisVistModel.find({ userId });
        return superviseVisit;
    }catch(error){
        throw new Error(`Error Getting Supervise Visit: ${error.message}`);
    }
}