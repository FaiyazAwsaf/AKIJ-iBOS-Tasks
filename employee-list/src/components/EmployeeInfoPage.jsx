import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateEmployeeForm from './CreateEmployeeForm';

const EmployeeInfo = ({ onCreateEmployeeClick }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchData = async (page = 0) => {
    try {
      const response = await axios.get('https://devapon.ibos.io/apon/hcm/EmployeeBasicInformation/EmployeeBasicInfoLandingPasignation', {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiIzNzFjMDJkNS0wOGY4LTRjNjktOGM4Yi04NWJiYjI4ZmEyNGIiLCJlbnJvbGwiOiI5NW81TzgzcXJZTk41MFNsYVZEL2FnPT0iLCJlbWFpbGFkZHJlc3MiOiJkZW1vQGFwb24td2VsbGJlaW5nLmNvbSIsImFjY291bnQiOjUsInVuaXQiOjE4NSwidXNlciI6NTIxMTY2LCJzdWIiOiJkZW1vQGFwb24td2VsbGJlaW5nLmNvbSIsImp0aSI6ImQ3ZWZiZTE4LTRkZDQtNDZjOS1iNmY3LThjNWJjMjVmMjY0ZiIsImlhdCI6IjA1LzMwLzIwMjQgMDU6MTY6MjYiLCJleHAiOjE4MTE2NTQxODYsImlzcyI6IkFraWpJbmZvVGVjaCBMdGQuICIsImF1ZCI6IkF1ZGllbmNlIn0.QU8Iq1GIYhuqYy-VIJQAx0KlNtGdtx83uG76EF-s-HM`,
          },
        params: {
          searcTerm: searchTerm,
          Accountid: 5,
          BusinessUnitId: 185,
          viewOrder: 'desc',
          PageNo: page,
          PageSize: 1000,
        },
      });
      console.log(response.data);
      setEmployees(response.data.data);  
      setTotalPages(Math.ceil(response.data.totalCount / pageSize));  
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };



  useEffect(() => {
    fetchData();
    setCurrentPage(0);  
  }, [searchTerm, selectedDepartment, pageSize]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(0);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  const filteredEmployees = employees.filter(employee => 
    (selectedDepartment === '' || employee.department === selectedDepartment)
  );

  const paginatedEmployees = filteredEmployees.slice(currentPage * pageSize, (currentPage + 1) * pageSize);


  return (
    <div>
      <h1>Employee Information</h1>
      <button onClick={onCreateEmployeeClick} style={{ float: 'right' }}>Create Employee</button>
      <div>
        <input
          type="text"
          placeholder="Employee name or code"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select onChange={handleDepartmentChange} value={selectedDepartment}>
          <option value="">All Departments</option>
          <option value="BD & Projects">BD & Projects</option>
          <option value="Operation">Operation</option>
          <option value="Finance & Accounts">Finance & Accounts</option>
          <option value="HR & Admin">HR & Admin</option>    
        </select>

      </div>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Employee Id</th>
            <th>Employee Code</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>HR Position</th>
            <th>Designation</th>
            <th>Line Manager</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{index + (pageSize * currentPage) + 1}</td>
              <td>{employee.employeeId}</td>
              <td>{employee.employeeCode}</td>
              <td>{employee.employeeFullName}</td>
              <td>{employee.department}</td>
              <td>{employee.positionName}</td>
              <td>{employee.designationName}</td>
              <td>{employee.lineManagerName}</td>
              <td>{employee.supervisorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>
          Rows per page:
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </label>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
      {showCreateForm && <CreateEmployeeForm onClose={handleCloseForm} />}
    </div>
  );
};

export default EmployeeInfo;


