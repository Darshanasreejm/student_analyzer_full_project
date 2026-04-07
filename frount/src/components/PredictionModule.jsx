import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, Bell, TrendingUp, Minus } from 'lucide-react';
import { apiSendAlert } from '../services/api';

const PredictionModule = ({ predictions }) => {
  const [sending, setSending] = useState(false);

  const getRiskColor = (level) => {
    return level === 'high' ? '#f43f5e' : '#f97316';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'declining') return <TrendingDown size={18} color="#f43f5e" />;
    if (trend === 'stable') return <Minus size={18} color="#f97316" />;
    return <TrendingUp size={18} color="#22c55e" />;
  };

  const handleSendAlerts = async () => {
    setSending(true);
    try {
      // Find high risk students to alert
      const highRiskStudents = predictions.filter(p => p.riskLevel === 'high');
      
      for (const student of highRiskStudents) {
        // We're mocking the student ID here since mock data format differs slightly
        await apiSendAlert(student.id || 'mock-id', `URGENT: Your attendance has dropped to ${student.currentAttendance}%. ${student.recommendation}`);
      }
      
      alert(`Successfully sent alerts to ${highRiskStudents.length} at-risk students.`);
    } catch (error) {
      console.error('Failed to send alerts', error);
      alert('Failed to send some alerts');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="card-title">
          <AlertTriangle size={22} className="text-primary" />
          <span>At-Risk Student Predictions</span>
        </h2>
        <button 
          className="btn btn-primary" 
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
          onClick={handleSendAlerts}
          disabled={sending}
        >
          <Bell size={16} />
          <span>{sending ? 'Sending...' : 'Send Reminders'}</span>
        </button>
      </div>

      {predictions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          color: '#6b21a8',
          backgroundColor: 'rgba(124, 58, 237, 0.04)',
          borderRadius: '0.75rem',
          border: '1px dashed rgba(196, 181, 253, 0.5)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1e1b4b' }}>All Students Doing Well!</div>
          <div style={{ marginTop: '0.5rem' }}>No students at risk currently based on our predictive model.</div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th className="text-center">Current %</th>
                <th className="text-center">Recent Absences</th>
                <th className="text-center">Trend</th>
                <th className="text-center">Risk Level</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#1e1b4b' }}>{pred.student}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b21a8', marginTop: '0.25rem' }}>
                      {pred.rollNumber}
                    </div>
                  </td>
                  <td className="text-center">
                    <span style={{
                      fontWeight: '700',
                      color: pred.currentAttendance < 60 ? '#f43f5e' : '#f97316',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1.125rem'
                    }}>
                      {pred.currentAttendance}%
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: pred.recentAbsences >= 3 ? 'rgba(244,63,94,0.1)' : 'rgba(249,115,22,0.1)',
                        color: pred.recentAbsences >= 3 ? '#e11d48' : '#ea580c',
                        border: `1px solid ${pred.recentAbsences >= 3 ? 'rgba(244,63,94,0.25)' : 'rgba(249,115,22,0.25)'}`
                      }}>
                      {pred.recentAbsences} / 10
                    </span>
                  </td>
                  <td className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {getTrendIcon(pred.trend)}
                    </div>
                  </td>
                  <td className="text-center">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: `${getRiskColor(pred.riskLevel)}15`,
                        color: getRiskColor(pred.riskLevel),
                        border: `1px solid ${getRiskColor(pred.riskLevel)}30`
                      }}>
                      {pred.riskLevel}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem', color: '#6b21a8', lineHeight: 1.5 }}>
                      {pred.recommendation}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: 'rgba(124, 58, 237, 0.04)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(196, 181, 253, 0.35)',
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <div style={{
          padding: '0.5rem',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          borderRadius: '50%',
          color: '#7c3aed'
        }}>
          <Bell size={20} strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontWeight: 600, color: '#6d28d9', marginBottom: '0.25rem' }}>
            Smart Reminder System
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b21a8', lineHeight: 1.5 }}>
            Students with declining trends will automatically receive personalized reminder notifications
            to help them improve their attendance patterns.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModule;
