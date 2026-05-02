import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Film } from 'lucide-react';
function App (){
const [data , setData] = useState([]); 
  // Phase 3: Fetch Data from your "Data Factory"
  useEffect(()=>{
    axios.get('http://localhost:5000/api/stats/genres')
      .then(response => {
        setData(response.data.slice(0,10));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    return (
    <div style={{ backgroundColor: '#141414', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'Arial' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <Film size={32} color="#E50914" style={{ marginRight: '10px' }} />
        <h1 style={{ fontSize: '2rem', color: '#E50914' }}>NETFLIX <span style={{color: 'white'}}>DASHBOARD</span></h1>
      </header>

      <div style={{ backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px' }}>Top 10 Genres</h2>
        
        {/* The Visual Layer (Recharts) */}
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#ccc" fontSize={12} tickLine={false} />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#E50914' : '#b3b3b3'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  

}
export default App;