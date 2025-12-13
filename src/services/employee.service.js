import EmployeeModel from '../models/Employee.js';

export const createEmployeeService = async (data) => {
  try {
    const employee = new EmployeeModel(data);
    await employee.save();
    return employee.toJSON();
  } catch (error) {
    throw new Error(`Error Creating Employee: ${error.message}`);
  }
};


export const getEmployeeService = async () => {
  try{
    const employees = await EmployeeModel.find();
    if(employees.length === 0){
      throw new Error('No employees found');
    }

    const employeeList = employees.map(employees=> employees.toJSON());
    return employeeList;
  }catch(error){
    throw new Error(`Error Getting Employees: ${error.message}`);
  }
}

