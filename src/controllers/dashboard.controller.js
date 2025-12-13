import * as dashboardService from "../services/dashboard.service.js";
import { verifyToken } from "../utils/jwt.js";

/**
 * Dashboard Controller
 * Handles HTTP requests for dashboard endpoints
 */

// --------------------------------------------
// STORE DASHBOARD DATA
// --------------------------------------------
export const storeDashboardData = async (req, res) => {
  try {

    const { activityReport, incidentsReport, trespass, patrolReport, employeeAnniversary } = req.body;
    const userId = req.user.userId;  // token decoded in authenticate middleware

    const data = {
        userID: userId,
        activityReport,
        incidentsReport,
        trespass,
        patrolReport,
        employeeAnniversary,
      };

    const result = await dashboardService.storeDashboarData(data);

    if (!result) {
      throw new Error("Failed to store dashboard data");
    }

    return res.status(201).json({
      success: true,
      message: "Dashboard Data Stored Successfully",
      data: { dashboard: result },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to store dashboard data",
    });
  }
};

// --------------------------------------------
// GET DASHBOARD DATA
// --------------------------------------------
export const getDashboardData = async (req, res) => {
    try {
      const userId = req.user.userId; // token already decoded in middleware
  
      const result = await dashboardService.getDashboardData(userId);
  
      return res.status(200).json({
        success: true,
        message: "Dashboard Data Retrieved Successfully",
        data: {
          dashboard: result,
        },
      });
  
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to retrieve dashboard data",
      });
    }
  };
  
