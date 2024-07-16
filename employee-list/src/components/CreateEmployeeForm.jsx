import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployeeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    employeeFullName: "",
    employeeCode: "",
    gender: "",
    religion: "",
    email: "",
    joiningDate: "",
    workplace: "",
    functionalDepartment: "",
    designation: "",
    employmentType: "",
    supervisor: "",
    lineManager: "",
    grossSalary: "",
    basicSalary: "",
    houseRent: "",
    medicalAllowance: "",
    transportAllowance: "",
    taxAmount: ""
  
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      employeeCode: formData.employeeCode,
      employeeFirstName: "",
      middleName: "",
      lastName: "",
      employeeFullName: formData.employeeFullName,
      accountId: 5,
      businessunitId: 185,
      sbuid: 0,
      departmentId: 342, // You might want to map this from functionalDepartment
      designationId: 2152, // You might want to map this from designation
      joiningDate: formData.joiningDate,
      presentAddress: "",
      permanentAddress: "",
      countryId: 0,
      contactNumber: "",
      alternativeContactNumber: "",
      email: formData.email,
      dateOfBirth: formData.dateOfBirth, 
      idtypeId: 0,
      idnumber: "",
      fatherName: "",
      motherName: "",
      bloodGroupId: 0,
      userGroupId: 0,
      supervisorId: 558390, 
      costCenterId: 0,
      workplaceGroupId: 1,
      workplaceId: 259, 
      positionId: 0,
      empGradeId: 0,
      employmentTypeId: 76, 
      lineManagerId: 558390, 
      lineManagerCode: "0279", 
      employmentStatusId: 1,
      actionBy: 521166,
      basicSalary: parseFloat(formData.basicSalary),
      grossSalary: formData.grossSalary,
      houseRent: parseFloat(formData.houseRent),
      medical: parseFloat(formData.medicalAllowance),
      transport: parseFloat(formData.transportAllowance),
      taxAmount: parseFloat(formData.taxAmount),
      genderId: formData.gender === "Male" ? 1 : 2, 
      gender: formData.gender,
      confirmationDate: "",
      religionId: formData.religion === "Islam" ? 1 : 0,
      religion: formData.religion
    };

    try {
      const response = await axios.post('https://devapon.ibos.io/apon/hcm/EmployeeBasicInformation/CreateEmployeeBasicInformationIBOS', payload, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzNzFjMDJkNS0wOGY4LTRjNjktOGM4Yi04NWJiYjI4ZmEyNGIiLCJlbnJvbGwiOiI5NW81TzgzcXJZTk41MFNsYVZEL2FnPT0iLCJlbWFpbGFkZHJlc3MiOiJkZW1vQGFwb24td2VsbGJlaW5nLmNvbSIsImFjY291bnQiOjUsInVuaXQiOjE4NSwidXNlciI6NTIxMTY2LCJzdWIiOiJkZW1vQGFwb24td2VsbGJlaW5nLmNvbSIsImp0aSI6ImQ3ZWZiZTE4LTRkZDQtNDZjOS1iNmY3LThjNWJjMjVmMjY0ZiIsImlhdCI6IjA1LzMwLzIwMjQgMDU6MTY6MjYiLCJleHAiOjE4MTE2NTQxODYsImlzcyI6IkFraWpJbmZvVGVjaCBMdGQuICIsImF1ZCI6IkF1ZGllbmNlIn0.QU8Iq1GIYhuqYy-VIJQAx0KlNtGdtx83uG76EF-s-HM`,
        },
      });
      console.log('Employee created successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error creating employee', error);
    }
  };

  return (
    <div className='form-container'>
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeFullName"
          placeholder="Employee Name"
          value={formData.employeeFullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employeeCode"
          placeholder="Employee Code"
          value={formData.employeeCode}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="religion" value={formData.religion} onChange={handleChange}>
          <option value="">Select Religion</option>
          <option value="Islam">Islam</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Email (Optional)"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dateOfBirth"
          placeholder="DOB"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
        
        <input
          type="number"
          name="grossSalary"
          placeholder="Gross Salary"
          value={formData.grossSalary}
          onChange={handleChange}
        />
        <input
          type="number"
          name="basicSalary"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
        />
        <input
          type="number"
          name="houseRent"
          placeholder="House Rent"
          value={formData.houseRent}
          onChange={handleChange}
        />
        <input
          type="number"
          name="medicalAllowance"
          placeholder="Medical Allowance"
          value={formData.medicalAllowance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="transportAllowance"
          placeholder="Transport Allowance"
          value={formData.transportAllowance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="taxAmount"
          placeholder="Tax Amount"
          value={formData.taxAmount}
          onChange={handleChange}
        />
      </form>
      <div className="buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
      
    </div>
  );
};

export default CreateEmployeeForm;
