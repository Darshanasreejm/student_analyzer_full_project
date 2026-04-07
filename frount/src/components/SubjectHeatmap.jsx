import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BookOpen } from 'lucide-react';

const SubjectHeatmap = ({ data }) => {
  // Color based on attendance rate matching new root variables
  const getColor = (rate) => {
    if (rate >= 90) return '#22c55e'; // success
    if (rate >= 75) return '#0ea5e9'; // info
    if (rate >= 60) return '#f97316'; // warning
    return '#f43f5e';                 // danger
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <h2 className="card-title">
          <BookOpen size={22} className="text-primary" />
          <span>Subject-wise Heatmap</span>
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(196, 181, 253, 0.3)" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b21a8' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(196, 181, 253, 0.4)' }}
            />
            <YAxis
              type="category"
              dataKey="code"
              width={80}
              tick={{ fontSize: 12, fill: '#1e1b4b', fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(124, 58, 237, 0.04)' }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(196, 181, 253, 0.4)',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 20px -4px rgba(124, 58, 237, 0.12)',
                padding: '1rem',
                fontFamily: 'Inter, sans-serif'
              }}
              itemStyle={{ fontSize: '0.95rem', fontWeight: 600, padding: '2px 0' }}
              labelStyle={{ fontSize: '0.75rem', color: '#6b21a8', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              formatter={(value, name) => {
                if (name === 'attendanceRate') return [`${value}%`, 'Attendance Rate'];
                return [value, name];
              }}
            />
            <Bar dataKey="attendanceRate" radius={[0, 8, 8, 0]} barSize={24} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(parseFloat(entry.attendanceRate))} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="table-container" style={{ marginTop: '2rem' }}>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th className="text-center">Present</th>
              <th className="text-center">Absent</th>
              <th className="text-center">Late</th>
              <th style={{ textAlign: 'right' }}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subject, index) => (
              <tr key={index}>
                <td>
                  <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{subject.code}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.25rem' }}>{subject.subject}</div>
                </td>
                <td className="text-center" style={{ color: '#22c55e', fontWeight: 600 }}>
                  {subject.present}
                </td>
                <td className="text-center" style={{ color: '#f43f5e', fontWeight: 600 }}>
                  {subject.absent}
                </td>
                <td className="text-center" style={{ color: '#f97316', fontWeight: 600 }}>
                  {subject.late}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: `${getColor(parseFloat(subject.attendanceRate))}15`,
                      color: getColor(parseFloat(subject.attendanceRate)),
                      border: `1px solid ${getColor(parseFloat(subject.attendanceRate))}30`
                    }}
                  >
                    {subject.attendanceRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectHeatmap;
