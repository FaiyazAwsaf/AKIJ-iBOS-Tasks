import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SalesReport = ({ fromDate, toDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get('https://apon.ibos.io/apon/wms/WmsReport/GetPOSSalesReport', {
          headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJmZWYwNzVmMS00ZjEwLTQwNjUtYTFhZi1mMjlmZDkyZTE5MGMiLCJlbnJvbGwiOiJ5Z3IzZ3psd3U5ZDNFNFZmV2FHbW9BPT0iLCJlbWFpbGFkZHJlc3MiOiJhcmFmYXRAYXBvbi13ZWxsYmVpbmcuY29tIiwiYWNjb3VudCI6NSwidW5pdCI6MTg1LCJ1c2VyIjo1MjEyNjEsInN1YiI6ImFyYWZhdEBhcG9uLXdlbGxiZWluZy5jb20iLCJqdGkiOiJhNmQ0ODUyNC0xZDI1LTRkZDktYTkwMy03NmEzM2VjMTc2NmYiLCJpYXQiOiIwNy8wMi8yMDI0IDE0OjU5OjM1IiwiZXhwIjoxODE0NTQwMzc1LCJpc3MiOiJBa2lqSW5mb1RlY2ggTHRkLiAiLCJhdWQiOiJBdWRpZW5jZSJ9.Dikc2THMofamthFZ2_2qQvfL83dH_oMMc2Dyo-ta5fg',
            },
          params: {
            reportTypeId: 1,
            businessUnitId: 185,
            warehouseId: 10177,
            fromDate: fromDate,
            toDate: toDate,
          },
        });
        setData(response.data);
        console.log(response.data)

        if (fromDate && toDate) {
          fetchData();
        }
      };
    }
    catch (error) {
      console.error('Error creating employee', error);
    }
  }, [fromDate, toDate]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SI</th>
            <th>Outlet</th>
            <th>Customer Name</th>
            <th>Customer Code</th>
            <th>Date</th>
            <th>Item</th>
            <th>Item Category</th>
            <th>Item Sub Category</th>
            <th>MRP</th>
            <th>Sales Price</th>
            <th>Total Quantity</th>
            <th>Total Sales</th>
            <th>Total Discount</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.strOutletName}</td>
              <td>{item.strShipToPartnerName}</td>
              <td>{item.strSoldToPartnerCode}</td>
              <td>{item.dteDeliveryDate}</td>
              <td>{item.itemname}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemSubCategory}</td>
              <td>{item.numMRP}</td>
              <td>{item.numItemPrice}</td>
              <td>{item.numTotalDeliveryQuantity}</td>
              <td>{item.numTotalNetValue}</td>
              <td>{item.numGrossDiscount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
