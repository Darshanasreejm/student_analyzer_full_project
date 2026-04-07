import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import MotivationBadge from './MotivationBadge';

const StudentRankings = ({ students }) => {
  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy size={24} color="#f97316" />;
    if (rank === 2) return <Medal size={24} color="#a78bfa" />;
    if (rank === 3) return <Award size={24} color="#ea580c" />;
    return <span style={{ width: '24px', textAlign: 'center', fontWeight: 'bold', color: '#6b21a8' }}>{rank}</span>;
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="card-header">
        <h2 className="card-title">
          <Trophy size={22} className="text-primary" />
          <span>Student Consistency Rankings</span>
        </h2>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="text-center" style={{ width: '80px' }}>Rank</th>
              <th>Student Details</th>
              <th className="text-center">Attendance</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="text-center">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {getMedalIcon(index + 1)}
                  </div>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.25rem' }}>
                    {student.rollNumber}
                  </div>
                </td>
                <td className="text-center">
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: student.attendancePercentage >= 90 ? '#22c55e' :
                      student.attendancePercentage >= 60 ? '#f97316' : '#f43f5e'
                  }}>
                    {student.attendancePercentage}%
                  </div>
                </td>
                <td className="text-center">
                  <MotivationBadge badge={student.motivationBadge} size="small" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: 'rgba(124, 58, 237, 0.04)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(196, 181, 253, 0.3)',
        fontSize: '0.875rem'
      }}>
        <div style={{ fontWeight: 600, color: '#1e1b4b', marginBottom: '0.75rem' }}>Badge Criteria:</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b21a8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            Consistent Learner: ≥90%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b21a8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f97316' }} />
            Needs Improvement: 60-89%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b21a8' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
            At Risk: &lt;60%
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRankings;
