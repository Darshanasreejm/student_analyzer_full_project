import React, { useState } from 'react';
import { BookOpen, Users, CheckSquare, Square, Save } from 'lucide-react';
import { mockSubjects, mockStudents } from '../services/mockData';

const AdminDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0].id);
  
  // Track local state for saveable mapping so the admin can make changes
  const [students, setStudents] = useState(mockStudents);
  const [isSaving, setIsSaving] = useState(false);

  const toggleStudentEnrollment = (studentId) => {
    setStudents(prevStudents => prevStudents.map(student => {
      if (student.id === studentId) {
        const isCurrentlyEnrolled = student.enrolledSubjects?.includes(selectedSubject);
        
        let updatedSubjects;
        if (isCurrentlyEnrolled) {
           updatedSubjects = student.enrolledSubjects.filter(sub => sub !== selectedSubject);
        } else {
           updatedSubjects = [...(student.enrolledSubjects || []), selectedSubject];
        }

        return { ...student, enrolledSubjects: updatedSubjects };
      }
      return student;
    }));
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    
    // In a real application, you would make an API call to update the backend mapping DB here
    console.log("Saving new enrollment map:", students);
    
    // Simulating network delay
    setTimeout(() => {
        setIsSaving(false);
        alert('Student mappings successfully saved!');
        
        // Normally, you would update the global mock students array here if keeping it purely local
        // but for this UI demonstration, the local state is sufficient.
    }, 800);
  };

  const currentSubjectObj = mockSubjects.find(s => s.id === selectedSubject);

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
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
          Administrator Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleSaveChanges}
            disabled={isSaving}
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-2 mb-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        
        {/* Left Column - Subject Selection */}
        <div className="card fade-in">
          <div className="card-header border-0 pb-2">
            <h2 className="card-title">
              <BookOpen size={22} className="text-primary" />
              <span>Subject Directory</span>
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {mockSubjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    background: selectedSubject === subject.id ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                    border: `1px solid ${selectedSubject === subject.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{subject.code}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{subject.name}</span>
                </button>
            ))}
          </div>
        </div>

        {/* Right Column - Student Mapping */}
        <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="card-header border-0 pb-2 flex-wrap pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <h2 className="card-title">
              <Users size={22} className="text-primary" />
              <span>Enrollment: {currentSubjectObj?.name}</span>
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Assigned Faculty ID: <strong style={{color: 'var(--text-primary)'}}>{currentSubjectObj?.facultyId}</strong>
            </div>
          </div>
          
          <div className="table-container mt-4">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>Status</th>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    const isEnrolled = student.enrolledSubjects?.includes(selectedSubject);
                    
                    return (
                        <tr 
                            key={student.id} 
                            style={{ 
                                cursor: 'pointer',
                                backgroundColor: isEnrolled ? 'rgba(34, 197, 94, 0.06)' : 'transparent'
                            }}
                            onClick={() => toggleStudentEnrollment(student.id)}
                        >
                          <td style={{ textAlign: 'center', color: isEnrolled ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                            {isEnrolled ? <CheckSquare size={20} /> : <Square size={20} />}
                          </td>
                          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student.rollNumber}</td>
                          <td>
                            <div style={{ fontWeight: 500 }}>{student.name}</div>
                          </td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
