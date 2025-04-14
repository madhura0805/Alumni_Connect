import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AlumniChart = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/alumni-count')
      .then(response => response.json())
      .then(data => {
        setAlumniData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching alumni data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: alumniData.map(item => item._id),
    datasets: [{
      data: alumniData.map(item => item.count),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71',
        '#E67E22', '#3498DB', '#F39C12', '#1ABC9C', '#C0392B',
        '#9B59B6', '#27AE60', '#2980B9', '#E74C3C', '#95A5A6'
      ]
    }]
  };

  return (
    <div>
      <h2 style={{ fontSize: '45px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
        Alumni by Company
      </h2>
      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default AlumniChart;
