import React, { useState } from 'react';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState(null);

  const fetchScans = () => {
    axios.get('https://qr-scanner-jkzb.onrender.com/qrcodes')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scans:', error);
      });
  };

  const deleteRow = (id) => {
    axios.delete(`https://qr-scanner-jkzb.onrender.com/qrcodes/${id}`)
      .then(() => {
        fetchScans();
      })
      .catch((error) => {
        console.error('Error deleting scan:', error);
      });
  };

  return (
    <div>
      <button type="button" className='btn btn-primary mt-3' onClick={fetchScans}>History</button>
      {data && (
        <div>
          <h4 className='mt-3'>Scanned QR Codes</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Content</th>
                <th scope="col">Scan Date</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.content}</td>
                  <td>{item.scan_date}</td>
                  <td>
                    <button type="button" className='btn btn-danger' onClick={() => deleteRow(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
