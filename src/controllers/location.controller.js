import * as locationService from '../services/location.service.js';



export const createLocationController = async (req,res )=>{

    try{
        const {name, locationId} = req.body;
        const data = {
            name,
            locationId,
        }

        const result = await locationService.createLocationService(data);

        if(!result){
            throw new Error('Failed to create location');
        }

        return res.status(201).json({
            success: true,
            message: 'Location created successfully',
            data: result,   
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to create location',
        });
    }

}

export const getLocationController = async (req,res )=>{
    try{
        const result = await locationService.getLocationService();

        if(!result){
            throw new Error('Failed to get location');
        }

        return res.status(200).json({
            success: true,
            message: 'Location retrieved successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to get location',
        });
    }
}