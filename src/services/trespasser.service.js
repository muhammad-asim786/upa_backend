import trespasserModel from "../models/trespasser.js";

export const createTrespasserService = async (data)=>{
    try{
        const createTrespasser = new trespasserModel(data);
        await createTrespasser.save();
        return createTrespasser.toJSON();
    }catch(error){
        throw new Error(`Error Creating Trespasser: ${error.message}`);
    }
}

export const getTrespasserService = async (userId)=>{
    try{
        const getTrespasser = await trespasserModel.find({ userId });
        return getTrespasser;
    }catch(error){
        throw new Error(`Error Getting Trespasser: ${error.message}`);
    }
}

