import moment from 'moment';
import React, { useState } from 'react';

const Header = ({ onView }) => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const handleFromDateChange = (event) => {
        const formattedDate = moment(event.target.value).format('YYYY-MM-DD');
        setFromDate(formattedDate);
      };
    
      const handleToDateChange = (e) => {
        const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
        setToDate(formattedDate);
      };

    const handleViewClick = () => {
        onView(fromDate, toDate);
    }


  return (
    <header>
      <h1>Sales Report</h1>
      <div>
        <label>From date:</label>
        <input type="date" value={moment(fromDate).format('YYYY-MM-DD')}  onChange={handleFromDateChange} />
        <label>To date:</label>
        <input type="date" value={moment(toDate).format('YYYY-MM-DD')} onChange={handleToDateChange} />
        <button onClick={handleViewClick}>View</button>
      </div>
    </header>
  );
};

export default Header;


