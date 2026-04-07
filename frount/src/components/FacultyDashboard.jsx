import React, { useState, useEffect } from 'react';
import { Users, Calendar, BarChart3, Download, AlertCircle, QrCode, FileSpreadsheet } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import DailyTrendsChart from './DailyTrendsChart';
import SubjectHeatmap from './SubjectHeatmap';
import StudentRankings from './StudentRankings';
import PredictionModule from './PredictionModule';
import LivePolls from './LivePolls';
import {
  getDailyTrends,
  getSubjectHeatmap,
  getStudentRankings,
  predictAtRiskStudents,
  mockSubjects,
  mockStudents
} from '../services/mockData';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMarks, setAttendanceMarks] = useState({});
  const [showQR, setShowQR] = useState(false);

  const dailyTrends = getDailyTrends(30);
  const subjectHeatmap = getSubjectHeatmap();
  const studentRankings = getStudentRankings();
  const predictions = predictAtRiskStudents();

  const mappedStudents = mockStudents.filter(s => !s.enrolledSubjects || s.enrolledSubjects.includes(selectedSubject));

  // Initialize attendance marks when selected subject changes
  useEffect(() => {
    const marks = {};
    mappedStudents.forEach(student => {
      marks[student.id] = 'present';
    });
    setAttendanceMarks(marks);
  }, [selectedSubject]);

  const handleMarkAttendance = (studentId, status) => {
    setAttendanceMarks(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = () => {
    // In real app, this would send to backend
    alert('Attendance marked successfully!');
    console.log('Attendance data:', {
      subject: selectedSubject,
      date: selectedDate,
      marks: attendanceMarks
    });
  };

  const handleGenerateCSV = () => {
    // Basic CSV generation for demo
    const rows = [
      ['Roll Number', 'Student Name', 'Current %', 'Status For Today'],
      ...mappedStudents.map(s => [s.rollNumber, s.name, `${s.attendancePercentage}%`, attendanceMarks[s.id] || 'N/A'])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${selectedSubject}_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const totalPresent = mappedStudents.filter(m => attendanceMarks[m.id] === 'present').length;
  const totalAbsent = mappedStudents.filter(m => attendanceMarks[m.id] === 'absent').length;
  const totalLate = mappedStudents.filter(m => attendanceMarks[m.id] === 'late').length;

  return (
    <div className="fade-in">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e1b4b', fontFamily: 'Outfit, sans-serif' }}>
          Faculty Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handleGenerateCSV}
          >
            <FileSpreadsheet size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '2rem',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'overview' ? '3px solid #7c3aed' : '3px solid transparent',
            color: activeTab === 'overview' ? '#7c3aed' : '#6b21a8',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BarChart3 size={18} />
          Analytics Overview
        </button>
        <button
          onClick={() => setActiveTab('mark')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'mark' ? '3px solid #7c3aed' : '3px solid transparent',
            color: activeTab === 'mark' ? '#7c3aed' : '#6b21a8',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Calendar size={18} />
          Mark Attendance
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'predictions' ? '3px solid #7c3aed' : '3px solid transparent',
            color: activeTab === 'predictions' ? '#7c3aed' : '#6b21a8',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertCircle size={18} />
          Predictions
        </button>
        <button
          onClick={() => setActiveTab('qr')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'qr' ? '3px solid #7c3aed' : '3px solid transparent',
            color: activeTab === 'qr' ? '#7c3aed' : '#6b21a8',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <QrCode size={18} />
          Live QR Generator
        </button>
        <button
          onClick={() => setActiveTab('polls')}
          style={{
            padding: '1rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'polls' ? '3px solid #7c3aed' : '3px solid transparent',
            color: activeTab === 'polls' ? '#7c3aed' : '#6b21a8',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BarChart3 size={18} />
          Live Polls
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="fade-in">
          {/* Stats Summary */}
          <div className="stats-grid">
            <div className="stat-card info fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="stat-header">
                <span className="stat-label">Total Students</span>
                <span className="stat-icon">
                  <Users size={20} />
                </span>
              </div>
              <div className="stat-value">{mockStudents.length}</div>
              <div className="stat-description">Enrolled students</div>
            </div>

            <div className="stat-card success fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="stat-header">
                <span className="stat-label">Average Attendance</span>
                <span className="stat-icon">
                  <BarChart3 size={20} />
                </span>
              </div>
              <div className="stat-value">
                {(mockStudents.reduce((sum, s) => sum + s.attendancePercentage, 0) / mockStudents.length).toFixed(1)}%
              </div>
              <div className="stat-description">Class average</div>
            </div>

            <div className="stat-card danger fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="stat-header">
                <span className="stat-label">At Risk Students</span>
                <span className="stat-icon">
                  <AlertCircle size={20} />
                </span>
              </div>
              <div className="stat-value">{predictions.length}</div>
              <div className="stat-description">Need attention</div>
            </div>

            <div className="stat-card warning fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="stat-header">
                <span className="stat-label">Subjects</span>
                <span className="stat-icon">
                  <Calendar size={20} />
                </span>
              </div>
              <div className="stat-value">{mockSubjects.length}</div>
              <div className="stat-description">Active courses</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-2 mb-2">
            <DailyTrendsChart data={dailyTrends} />
            <SubjectHeatmap data={subjectHeatmap} />
          </div>

          {/* Rankings */}
          <StudentRankings students={studentRankings} />
        </div>
      )}

      {/* Mark Attendance Tab */}
      {activeTab === 'mark' && (
        <div className="fade-in">
          <div className="card mb-2">
            <div className="card-header">
              <h2 className="card-title">
                <Calendar size={22} className="text-primary" />
                <span>Mark Attendance</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="form-group mb-0">
                <label className="form-label" style={{ fontWeight: 600, color: '#6b21a8' }}>Select Subject</label>
                <select
                  className="form-select"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {mockSubjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label" style={{ fontWeight: 600, color: '#6b21a8' }}>Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'rgba(124, 58, 237, 0.03)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(196, 181, 253, 0.35)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b21a8', marginBottom: '0.25rem', fontWeight: 500 }}>Present</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#22c55e' }}>{totalPresent}</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(196,181,253,0.3)', borderRight: '1px solid rgba(196,181,253,0.3)' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b21a8', marginBottom: '0.25rem', fontWeight: 500 }}>Late</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#f97316' }}>{totalLate}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b21a8', marginBottom: '0.25rem', fontWeight: 500 }}>Absent</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '700', color: '#f43f5e' }}>{totalAbsent}</div>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th style={{ textAlign: 'center' }}>Current %</th>
                    <th style={{ textAlign: 'center' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {mappedStudents.map(student => (
                    <tr key={student.id}>
                      <td style={{ fontWeight: 600, color: '#1e1b4b' }}>{student.rollNumber}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{student.name}</div>
                      </td>
                      <td className="text-center">
                        <span
                          className="badge"
                          style={{
                            backgroundColor: student.attendancePercentage >= 90 ? 'rgba(34,197,94,0.12)' :
                              student.attendancePercentage >= 60 ? 'rgba(249,115,22,0.1)' : 'rgba(244,63,94,0.1)',
                            color: student.attendancePercentage >= 90 ? '#16a34a' :
                              student.attendancePercentage >= 60 ? '#ea580c' : '#e11d48',
                            border: `1px solid ${student.attendancePercentage >= 90 ? 'rgba(34,197,94,0.25)' :
                                student.attendancePercentage >= 60 ? 'rgba(249,115,22,0.25)' : 'rgba(244,63,94,0.25)'
                              }`
                          }}>
                          {student.attendancePercentage}%
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'present' ? 'btn-success' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'present' ? '#22c55e' : 'transparent',
                              color: attendanceMarks[student.id] === 'present' ? 'white' : '#22c55e',
                              border: `1px solid #22c55e`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'present')}
                          >
                            Present
                          </button>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'late' ? 'btn-warning' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'late' ? '#f97316' : 'transparent',
                              color: attendanceMarks[student.id] === 'late' ? 'white' : '#f97316',
                              border: `1px solid #f97316`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'late')}
                          >
                            Late
                          </button>
                          <button
                            className={`btn ${attendanceMarks[student.id] === 'absent' ? 'btn-danger' : 'btn-outline'}`}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.875rem',
                              backgroundColor: attendanceMarks[student.id] === 'absent' ? '#f43f5e' : 'transparent',
                              color: attendanceMarks[student.id] === 'absent' ? 'white' : '#f43f5e',
                              border: `1px solid #f43f5e`
                            }}
                            onClick={() => handleMarkAttendance(student.id, 'absent')}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button
                className="btn btn-primary"
                style={{ padding: '1rem 3rem', fontSize: '1rem' }}
                onClick={handleSubmitAttendance}
              >
                Submit Attendance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="fade-in">
          <PredictionModule predictions={predictions} />
        </div>
      )}

      {/* QR Generator Tab */}
      {activeTab === 'qr' && (
        <div className="fade-in">
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="card-header pb-2 mx-auto justify-content-center border-0">
               <h2 className="card-title justify-content-center">
                <QrCode size={24} className="text-primary" />
                Live Attendance Session
               </h2>
            </div>
            
            <p className="text-secondary mb-4">Select a subject for students to scan and mark attendance.</p>
            
            <div className="form-group text-left mb-4">
              <label className="form-label text-left">Target Subject Context</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setShowQR(false);
                }}
              >
                {mockSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>

            {!showQR ? (
               <button className="btn btn-primary" onClick={() => setShowQR(true)}>Generate QR Code</button>
            ) : (
               <div className="mt-4 fade-in pt-3 pb-3" style={{ background: '#fff', borderRadius: '1rem', display: 'inline-block', padding: '2rem' }}>
                  {/* Generating a payload with the subjectId and a timestamp */}
                  <QRCodeSVG 
                    value={JSON.stringify({ subject: selectedSubject, ts: Date.now() })} 
                    size={250} 
                    level={"H"}
                    includeMargin={true}
                  />
                  <div className="mt-3 text-secondary" style={{ fontSize: '0.9rem' }}>
                    <p>Have students scan this using the app.</p>
                  </div>
               </div>
            )}
          </div>
        </div>
      )}

      {/* Live Polls Tab */}
      {activeTab === 'polls' && (
        <div className="fade-in">
          <LivePolls userRole="faculty" />
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
