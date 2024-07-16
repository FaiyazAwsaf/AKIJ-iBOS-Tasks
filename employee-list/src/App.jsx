import React, { useState } from 'react';
import EmployeeInfoPage from './components/EmployeeInfoPage';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import './App.css'

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleCreateEmployeeClick = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <div className="App">
      {isFormVisible ? (
        <CreateEmployeeForm onClose={handleCloseForm} />
      ) : (
        <EmployeeInfoPage onCreateEmployeeClick={handleCreateEmployeeClick} />
      )}
    </div>
  );
};

export default App;



