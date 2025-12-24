import * as trespasserServices from "../services/trespasser.service.js";

export const createTrespasserController = async (req, res) => {
    try {
        const userId = req.user.userId; // token decoded in authenticate middleware

        const {
            partyName,
            dateOfBirth,
            address,
            dateIssued,
            issuingPersonName,
            signature,
            images,
            reason,
            status,
        } = req.body;

        const data = {
            userId,
            partyName,
            dateOfBirth,
            address,
            dateIssued,
            issuingPersonName,
            signature,
            images: images || [],
            reason,
            status: status || "Draft",
        };

        const result = await trespasserServices.createTrespasserService(data);

        return res.status(201).json({
            success: true,
            message: "Trespasser Created Successfully",
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to Create Trespasser",
        });
    }
};

export const getTrespasserController = async (req, res)=> {
    try{
        const userId = req.user.userId;
        const result = await trespasserServices.getTrespasserService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no trespasser data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Trespasser Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Trespasser',
        });
    }
}

