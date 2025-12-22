import * as incidentServices from "../services/incident.service.js";




export const createIncidentReportController = async (req, res) => {
    try {
      const userId = req.user.userId; // from auth middleware
  
      const {
        employee,
        location,
        incidentDate,
        incidentTime,
        suspectsVictims,
        vehicles,
        respondingAgencies,
        narrative,
        status,
      } = req.body;
  
      const data = {
        userId,
        employee,
        location,
        incidentDate,
        incidentTime,
        suspectsVictims: suspectsVictims || [],
        vehicles: vehicles || [],
        respondingAgencies: respondingAgencies || [],
        narrative,
        status: status || "Draft",
      };
  
      const result = await incidentServices.createIncidentReportService(data);
  
      return res.status(201).json({
        success: true,
        message: "Incident Report Created Successfully",
        data: result,
      });
  
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to Create Incident Report",
      });
    }
  };
  


export const getIncidentReportController = async (req, res)=> {
    try{
        const userId = req.user.userId;
        const result = await incidentServices.getIncidentReportService(userId);

        if(!result || result.length === 0){
            return res.status(200).json({
                success: true,
                message: 'Request successful, but there is no incident report data for this user',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Incident Report Retrieved Successfully',
            data: result,
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to Get Incident Report',
        });
    }
}
