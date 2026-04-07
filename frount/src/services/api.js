const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : 'https://student-analyzer-full-project.onrender.com/api');

const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return {
        'Content-Type': 'application/json',
        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
    };
};

export const apiLogin = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const apiSendAlert = async (studentId, message) => {
    try {
        const response = await fetch(`${API_URL}/alerts/send`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ studentId, message })
        });
        return await response.json();
    } catch (error) {
        console.error('Failed to send alert:', error);
        throw error;
    }
};

export const apiMarkQrAttendance = async (studentId, subject) => {
    try {
        const response = await fetch(`${API_URL}/attendance/mark-qr`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ studentId, subject })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to mark attendance');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const apiCreatePoll = async (question, options, facultyId) => {
    try {
        const response = await fetch(`${API_URL}/polls`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ question, options, facultyId })
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const apiGetActivePolls = async () => {
    try {
        const response = await fetch(`${API_URL}/polls/active`, {
            headers: getHeaders()
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const apiVotePoll = async (pollId, optionId, studentId) => {
    try {
        const response = await fetch(`${API_URL}/polls/${pollId}/vote`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ optionId, studentId })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to vote');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
