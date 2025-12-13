import * as employeeService from '../services/employee.service.js';




export const createEmployeeController = async (req, res) => {
  try {
    const { name, employeeId, phone, email, designation } = req.body;

    const data = {
      name,
      employeeId,
      phone,
      email,
      designation,
    };

    console.log(data);

    const result = await employeeService.createEmployeeService(data);

    return res.status(201).json({
      success: true,
      message: 'Employee Created Successfully',
      data: result,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to Create Employee',
    });
  }
};


export const getEmployeeController = async (req, res) => {
  try{
    const result = await employeeService.getEmployeeService();

    if(!result){
      throw new Error('Failed to Get Employee');
    }

    return res.status(200).json({
      success: true,
      message: 'Employee Retrieved Successfully',
      data: result,
    });
  }catch(error){
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to Get Employee',
    });
  }
}