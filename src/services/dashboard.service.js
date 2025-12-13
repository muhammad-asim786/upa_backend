import DashboardModel from '../models/dashboard.js';

/**
 * Dashboard Service
 * Handles dashboard data operations
 */




// /**m1
//  * Store dashboard data
//  * @param {Object} data - Dashboard data object
//  * @param {number} activityReport - Activity report
//  * @param {number} incidentsReport - Incidents report
//  * @param {Object} trespass - Trespass data
//  * @param {number} patrolReport - Patrol report
//  * @param {Object} employeeAnniversary - Employee anniversary data
//  * @returns {Promise<Object>} - Dashboard data object
//  */

export const storeDashboarData = async (data)=> {
    try{
        const dashboarData = new DashboardModel({
            userID: data.userID,
            activityReport: data.activityReport,
            incidentsReport: data.incidentsReport,
            trespass: data.trespass,
            patrolReport: data.patrolReport,
            employeeAnniversary: data.employeeAnniversary,
        })
        await dashboarData.save();
        return dashboarData.toJSON();    
    }catch(error){
         throw new Error(`Error Storing Dashboard Data: ${error.message}`)
    }
}

export const getDashboardData = async (userId) => {
    try {
      console.log("userId", userId);

  
      const dashboardData = await DashboardModel.findOne({ userID: userId });
      console.log("dashboardData", dashboardData);
  
      if (!dashboardData) {
        throw new Error("Dashboard Data Not Found");
      }
  
      return dashboardData.toJSON();
    } catch (error) {
      throw new Error(`Error Retrieving Dashboard Data: ${error.message}`);
    }
  };
  
  

