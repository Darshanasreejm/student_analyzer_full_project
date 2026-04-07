export const mockUsers = {
    admin: {
        id: 'admin-1',
        name: 'Super Admin',
        role: 'admin'
    },
    student: {
        id: 'student-1',
        motivationBadge: 'consistent',
        role: 'student',
        name: 'Alice Smith'
    },
    faculty: {
        id: 'faculty-1',
        role: 'faculty',
        name: 'Prof. Anderson'
    }
};

export const getStudentAttendance = (id) => {
    return {
        overallStats: {
            total: 45,
            present: 38,
            late: 3,
            absent: 4,
            percentage: 88,
        },
        subjectWiseStats: [
            { code: 'CS101', subject: 'Introduction to Computer Science', present: 10, absent: 1, late: 1, total: 12, percentage: 88 },
            { code: 'MA201', subject: 'Calculus II', present: 11, absent: 3, late: 0, total: 14, percentage: 78 },
            { code: 'PH101', subject: 'Physics I', present: 9, absent: 0, late: 1, total: 10, percentage: 95 },
        ],
        records: [
            { date: new Date().toISOString(), subjectCode: 'CS101', subjectName: 'Introduction to Computer Science', status: 'present', markedBy: 'Prof. Smith' },
            { date: new Date(Date.now() - 86400000).toISOString(), subjectCode: 'MA201', subjectName: 'Calculus II', status: 'absent', markedBy: 'Prof. Johnson' },
            { date: new Date(Date.now() - 172800000).toISOString(), subjectCode: 'PH101', subjectName: 'Physics I', status: 'present', markedBy: 'Prof. Davis' }
        ]
    };
};

export const mockSubjects = [
    { id: 'sub-1', code: 'CS101', name: 'Intro to CS', facultyId: 'faculty-1' },
    { id: 'sub-2', code: 'MA201', name: 'Calculus II', facultyId: 'faculty-1' },
    { id: 'sub-3', code: 'PH101', name: 'Physics I', facultyId: 'faculty-2' },
];

export const mockStudents = [
    { id: 'stu-1', rollNumber: 'R001', name: 'Alice Smith', attendancePercentage: 92, enrolledSubjects: ['sub-1', 'sub-2'] },
    { id: 'stu-2', rollNumber: 'R002', name: 'Bob Jones', attendancePercentage: 75, enrolledSubjects: ['sub-1', 'sub-3'] },
    { id: 'stu-3', rollNumber: 'R003', name: 'Charlie Brown', attendancePercentage: 55, enrolledSubjects: ['sub-2', 'sub-3'] },
    { id: 'stu-4', rollNumber: 'R004', name: 'Diana King', attendancePercentage: 92, enrolledSubjects: ['sub-1'] },
    { id: 'stu-5', rollNumber: 'R005', name: 'Eve Davies', attendancePercentage: 88, enrolledSubjects: ['sub-1', 'sub-2', 'sub-3'] },
];

export const getDailyTrends = (days) => {
    const data = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        data.push({
            date: d.toISOString(),
            present: Math.floor(Math.random() * 20) + 30,
            late: Math.floor(Math.random() * 5),
            absent: Math.floor(Math.random() * 10),
        });
    }
    return data;
};

export const getSubjectHeatmap = () => {
    return [
        { code: 'CS101', subject: 'Intro to CS', present: 30, absent: 2, late: 1, attendanceRate: 95 },
        { code: 'MA201', subject: 'Calculus II', present: 20, absent: 10, late: 5, attendanceRate: 65 },
        { code: 'PH101', subject: 'Physics I', present: 25, absent: 5, late: 2, attendanceRate: 80 },
    ];
};

export const getStudentRankings = () => {
    return [
        { id: 'stu-1', name: 'Alice Smith', rollNumber: 'R001', attendancePercentage: 95, motivationBadge: 'consistent' },
        { id: 'stu-2', name: 'Diana King', rollNumber: 'R004', attendancePercentage: 92, motivationBadge: 'consistent' },
        { id: 'stu-3', name: 'Eve Davies', rollNumber: 'R005', attendancePercentage: 88, motivationBadge: 'improving' },
        { id: 'stu-4', name: 'Bob Jones', rollNumber: 'R002', attendancePercentage: 75, motivationBadge: 'needs-improvement' },
    ];
};

export const predictAtRiskStudents = () => {
    return [
        { student: 'Charlie Brown', rollNumber: 'R003', currentAttendance: 55, recentAbsences: 4, trend: 'declining', riskLevel: 'high', recommendation: 'Schedule counseling' },
    ];
};

export const generateReport = (type) => {
    return `Generated ${type} report payload`;
};
