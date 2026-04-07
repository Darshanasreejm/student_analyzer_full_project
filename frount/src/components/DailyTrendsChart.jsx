import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const DailyTrendsChart = ({ data }) => {
  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="card-header">
        <h2 className="card-title">
          <TrendingUp size={22} className="text-primary" />
          <span>Daily Trends</span>
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196, 181, 253, 0.3)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#6b21a8' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(196, 181, 253, 0.4)' }}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b21a8' }}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(196, 181, 253, 0.4)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 20px -4px rgba(124, 58, 237, 0.12)',
                padding: '1rem',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ fontSize: '0.875rem', fontWeight: 500, padding: '2px 0' }}
              labelStyle={{ fontSize: '0.75rem', color: '#6b21a8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '1rem', fontSize: '0.875rem' }}
              iconType="circle"
              iconSize={8}
            />
            <Line
              type="monotone"
              dataKey="present"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: '#22c55e', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#16a34a' }}
              name="Present"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="late"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: '#f97316', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#ea580c' }}
              name="Late"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="absent"
              stroke="#f43f5e"
              strokeWidth={3}
              dot={{ fill: '#f43f5e', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#e11d48' }}
              name="Absent"
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTrendsChart;
