import dailyActivityReportModel from "../models/dailyactivityreport.js";

export const createActivityService = async (data)=>{

    try{
        const createActivity = new dailyActivityReportModel(data);

        await createActivity.save();
        return createActivity.toJSON();
    }catch(error){
        throw new Error(`Error Creating Activity: ${error.message}`);
    }
}


const getActivityService = async ()=>{
    try{
        const getActivity = await dailyActivityReportModel.find();
        if(getActivity.length === 0){
            throw new Error('No Activity Found');
        }
        return getActivity.toJSON();
    }catch(error){
        throw new Error(`Error Getting Activity: ${error.message}`);
    }
}

