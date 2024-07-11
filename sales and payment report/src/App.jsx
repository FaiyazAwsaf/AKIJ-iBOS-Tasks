import React, { useState } from 'react';
import Header from './components/Header';
// import SalesReport from './components/SalesReport';
import PaymentReport from './components/PaymentReport';
import './App.css';

const App = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleViewData = (fromDate, toDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
  };


  return (
    <div className="app">
      <Header onView={handleViewData} />
      {fromDate && toDate && <PaymentReport fromDate={fromDate} toDate={toDate} />}
    </div>
  );
};

export default App;
