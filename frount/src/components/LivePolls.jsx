import React, { useState, useEffect } from 'react';
import { apiCreatePoll, apiGetActivePolls, apiVotePoll } from '../services/api';
import { Activity, Plus, CheckCircle2 } from 'lucide-react';
import { mockUsers } from '../services/mockData';

const LivePolls = ({ userRole }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Faculty State
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  useEffect(() => {
    fetchPolls();
    // Poll every 5 seconds for live updates
    const interval = setInterval(fetchPolls, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPolls = async () => {
    try {
      const data = await apiGetActivePolls();
      setPolls(data);
    } catch (error) {
      console.error('Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const validOptions = options.filter(opt => opt.trim() !== '');
    if (newQuestion.trim() === '' || validOptions.length < 2) {
      return alert('Please enter a question and at least 2 options.');
    }
    
    try {
      await apiCreatePoll(newQuestion, validOptions, mockUsers.faculty.id);
      setIsCreating(false);
      setNewQuestion('');
      setOptions(['', '']);
      fetchPolls(); // Refresh immediately
    } catch (error) {
      console.error(error);
      alert('Failed to create poll');
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await apiVotePoll(pollId, optionId, mockUsers.student.id);
      fetchPolls(); // Refresh immediately
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading polls...</div>;

  return (
    <div className="card fade-in">
      <div className="card-header border-0 pb-2 flex-wrap">
        <h2 className="card-title">
          <Activity size={22} className="text-primary" />
          <span>Live Polls & Quizzes</span>
        </h2>
        
        {userRole === 'faculty' && !isCreating && (
          <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
            <Plus size={16} /> Create New Poll
          </button>
        )}
      </div>

      {userRole === 'faculty' && isCreating && (
        <form onSubmit={handleCreatePoll} className="mb-4 fade-in" style={{ backgroundColor: 'rgba(124, 58, 237, 0.03)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(196, 181, 253, 0.35)' }}>
          <div className="form-group mb-3">
            <label className="form-label">Poll Question</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="E.g., Which topic should we cover next?" 
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              required
            />
          </div>
          
          <label className="form-label">Options</label>
          {options.map((opt, index) => (
             <div className="form-group mb-2" key={index}>
               <input 
                 type="text" 
                 className="form-input" 
                 placeholder={`Option ${index + 1}`} 
                 value={opt}
                 onChange={e => {
                   const newOps = [...options];
                   newOps[index] = e.target.value;
                   setOptions(newOps);
                 }}
               />
             </div>
          ))}
          
          <div className="d-flex" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => setOptions([...options, ''])}>
              Add Option
            </button>
            <div style={{ flex: 1 }}></div>
            <button type="button" className="btn btn-secondary" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Launch Poll
            </button>
          </div>
        </form>
      )}

      {polls.length === 0 ? (
        <p className="text-secondary text-center p-4">No active polls right now.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {polls.map(poll => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
            // Check if current student has voted
            const hasVoted = userRole === 'student' && poll.voters.includes(mockUsers.student.id);

            return (
              <div key={poll._id} style={{ border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>{poll.question}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {poll.options.map(opt => {
                     const percentage = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                     
                     return (
                       <button 
                         key={opt._id}
                         onClick={() => userRole === 'student' && handleVote(poll._id, opt._id)}
                         disabled={userRole === 'faculty' || hasVoted}
                         style={{ 
                            position: 'relative',
                            padding: '1rem', 
                            textAlign: 'left',
                            borderRadius: '0.5rem',
                            border: `1px solid ${hasVoted ? 'var(--primary-color)' : 'var(--border-color)'}`,
                            background: 'transparent',
                            cursor: (userRole === 'faculty' || hasVoted) ? 'default' : 'pointer',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                         }}
                       >
                         {/* Progress bar background */}
                         {(userRole === 'faculty' || hasVoted) && (
                           <div style={{
                             position: 'absolute',
                             top: 0, left: 0, bottom: 0,
                             width: `${percentage}%`,
                              backgroundColor: 'rgba(124, 58, 237, 0.1)',
                             zIndex: 0,
                             transition: 'width 0.5s ease-out'
                           }} />
                         )}
                         
                         <span style={{ position: 'relative', zIndex: 1, fontWeight: 500 }}>
                           {opt.text}
                         </span>
                         
                         {(userRole === 'faculty' || hasVoted) && (
                            <span style={{ position: 'relative', zIndex: 1, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              {opt.votes} votes ({percentage}%)
                            </span>
                         )}
                       </button>
                     );
                  })}
                </div>
                
                {hasVoted && (
                  <p style={{ marginTop: '1rem', color: 'var(--success-color)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <CheckCircle2 size={16} /> You have voted!
                  </p>
                )}
                
                {userRole === 'faculty' && (
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Total responses: {totalVotes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LivePolls;
