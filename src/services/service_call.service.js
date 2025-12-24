import serviceCallModel from "../models/service_call.js";

export const createServiceCallService = async (data)=>{
    try{
        const createServiceCall = new serviceCallModel(data);
        await createServiceCall.save();
        return createServiceCall.toJSON();
    }catch(error){
        throw new Error(`Error Creating Service Call: ${error.message}`);
    }
}

export const getServiceCallService = async (userId)=>{
    try{
        const getServiceCall = await serviceCallModel.find({ userId });
        return getServiceCall;
    }catch(error){
        throw new Error(`Error Getting Service Call: ${error.message}`);
    }
}

