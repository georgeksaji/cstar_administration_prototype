import React, { useState } from 'react';
import { 
    CreditCard, Megaphone, MessageSquare, LogOut, Menu, X, 
    ChevronRight, Users, LayoutDashboard, CheckSquare as CheckSquareAdmin, 
    ThumbsUp, ThumbsDown, PlusCircle, Upload, Trash2, Edit, UserPlus, Calendar,
    BookCopy, Shield, ArrowLeftRight
} from 'lucide-react';

// --- FIXED ASSET ---
// Using the imported cstarLogo from the assets folder.
import cstarLogo from './assets/cstar.png'; 

// --- ADMIN MOCK DATA ---
const adminData = { name: "Diljith" };
const dashboardStats = { totalStudents: 150, pendingEndorsements: 2, openQueries: 1 };

const initialCoursesData = [
    { id: 1, name: 'Master of Computer Applications', duration: 2 },
    { id: 2, name: 'Bachelor of Computer Applications', duration: 3 },
];

const initialBatchesData = [
    { 
        id: 1, courseId: 1, academicYear: '2024-2026', status: 'Active', 
        students: [
            { id: 101, name: 'George K Saji', rollNo: 'MCA24001', gender: 'Male', group: 1, phone: '9876543210', email: 'george.saji@example.com' },
            { id: 102, name: 'Tejaa Tharshini', rollNo: 'MCA24002', gender: 'Female', group: 1, phone: '9876543211', email: 'tejaa.t@example.com' },
            { id: 103, name: 'Sivalakshmi P S', rollNo: 'MCA24003', gender: 'Female', group: 1, phone: '9876543212', email: 'sivalakshmi.ps@example.com' },
        ]
    },
    { 
        id: 2, courseId: 2, academicYear: '2023-2026', status: 'Active', 
        students: [
            { id: 201, name: 'Dony Mullanil Binu', rollNo: 'BCA23001', gender: 'Male', group: 2, phone: '9988776655', email: 'dony.m@example.com' },
            { id: 202, name: 'Geo Devassy', rollNo: 'BCA23002', gender: 'Male', group: 2, phone: '9988776656', email: 'geo.d@example.com' },
        ]
    },
];

const initialEndorsements = [
    { id: 1, studentName: 'George K Saji', contribution: 'Organized the technical quiz for the "Innovate 2025" symposium.', status: 'Pending' },
    { id: 2, studentName: 'Tejaa Tharshini', contribution: 'Designed the welcome banner for Freshers\' Day.', status: 'Pending' },
    { id: 3, studentName: 'Sivalakshmi P S', contribution: 'Volunteered for the blood donation camp.', status: 'Endorsed' },
];

const initialAnnouncements = [
    { id: 1, date: 'July 10, 2025', title: 'No CSTAR on July 14', content: 'Please note that there will be no CSTAR session on July 14th due to scheduling conflicts.' },
    { id: 2, date: 'July 08, 2025', title: 'Freshers Welcome Event', content: 'Join us for the Freshers Welcome Event on July 20th at 5 PM in the main auditorium.' },
];

const initialQueries = [
    { id: 1, studentName: 'George K Saji', query: "When is the deadline for the next fee payment?", reply: "The deadline for the next semester's tuition fee is August 15, 2025.", status: 'Answered' },
    { id: 2, studentName: 'Arjun C', query: "Is there a holiday for the upcoming festival?", reply: null, status: 'Open' },
];

// --- MAIN ADMIN COMPONENT ---
function Admin() {
    const [activeScreen, setActiveScreen] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [courses, setCourses] = useState(initialCoursesData);
    const [batches, setBatches] = useState(initialBatchesData);
    const [endorsements, setEndorsements] = useState(initialEndorsements);
    const [announcements, setAnnouncements] = useState(initialAnnouncements);
    const [queries, setQueries] = useState(initialQueries);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Dashboard': return <AdminDashboard stats={dashboardStats} setActiveScreen={setActiveScreen} />;
            case 'Students': return <StudentsManagement batches={batches} setBatches={setBatches} courses={courses} />;
            case 'Courses & Batches': return <CoursesAndBatchesManagement courses={courses} setCourses={setCourses} batches={batches} setBatches={setBatches} />;
            case 'Endorsements': return <EndorsementsManagement endorsements={endorsements} setEndorsements={setEndorsements} />;
            case 'Announcements': return <AdminAnnouncements announcements={announcements} setAnnouncements={setAnnouncements} />;
            case 'Queries': return <AdminQueries queries={queries} setQueries={setQueries} />;
            default: return <AdminDashboard stats={dashboardStats} setActiveScreen={setActiveScreen} />;
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-sm">
            <AdminSidebar 
                activeScreen={activeScreen} 
                setActiveScreen={setActiveScreen} 
                isSidebarOpen={isSidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader adminName={adminData.name} onMenuClick={() => setSidebarOpen(true)} />
                
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {renderScreen()}
                </main>
            </div>
        </div>
    );
}

// --- ADMIN LAYOUT COMPONENTS ---

const AdminSidebar = ({ activeScreen, setActiveScreen, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Students', icon: Users },
        { name: 'Courses & Batches', icon: BookCopy },
        { name: 'Endorsements', icon: Shield }, // Changed from CheckSquare to Shield for clarity
        { name: 'Announcements', icon: Megaphone },
        { name: 'Queries', icon: MessageSquare },
    ];

    const handleItemClick = (screen) => {
        setActiveScreen(screen);
        setSidebarOpen(false);
    };
    return (
        <>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 sm:hidden" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`fixed sm:relative inset-y-0 left-0 w-56 bg-white border-r border-slate-200 flex-col flex-shrink-0 z-40 sm:flex transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
                <div className="h-16 flex items-center justify-between mx-auto border-b border-slate-200">
                    <img src={cstarLogo} alt="CSTAR" className='h-12 mx-auto' />
                    <button onClick={() => setSidebarOpen(false)} className="sm:hidden p-1 text-slate-500"><X size={20} /></button>
                </div>
                <nav className="flex-1 px-4 py-4">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Admin Panel</p>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.name}>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick(item.name); }}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${activeScreen === item.name ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                                    <item.icon className="w-4 h-4 mr-3" />
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="px-4 py-4 border-t border-slate-200">
                    <button className="flex items-center px-4 py-2 rounded-md transition-colors duration-200 font-medium text-blue-600 hover:bg-blue-50">
                        <ArrowLeftRight className="w-4 h-4 mr-3" />
                        <span>Student Portal</span>
                    </button>
                    <a href="#" className="flex items-center px-4 py-2 rounded-md transition-colors duration-200 font-medium text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        </>
    );
};

const AdminHeader = ({ adminName, onMenuClick }) => (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
            <button onClick={onMenuClick} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 sm:hidden"><Menu size={20} /></button>
            <h2 className="text-lg font-semibold text-slate-800">Welcome, {adminName}</h2>
        </div>
        <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-slate-600 font-bold">{adminName.charAt(0)}</div>
    </header>
);

const AdminPageWrapper = ({ title, children }) => (
    <div className="w-full bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-base font-semibold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);

const AdminSection = ({ title, children }) => (
    <div>
        <h4 className="text-base font-semibold text-slate-800 mb-3">{title}</h4>
        {children}
    </div>
);

// --- ADMIN PAGE COMPONENTS ---
const AdminDashboard = ({ stats, setActiveScreen }) => (
    <AdminPageWrapper title="Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <InfoCard label="Total Students" value={stats.totalStudents} />
            <InfoCard label="Pending Endorsements" value={stats.pendingEndorsements} onClick={() => setActiveScreen('Endorsements')} action="Review" />
            <InfoCard label="Open Queries" value={stats.openQueries} onClick={() => setActiveScreen('Queries')} action="Respond" />
        </div>
    </AdminPageWrapper>
);

const StudentsManagement = ({ batches, setBatches, courses }) => {
    const [selectedBatch, setSelectedBatch] = useState('');
    const [isAddStudentModalOpen, setAddStudentModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', rollNo: '', gender: '', group: '', phone: '', email: '', courseId: '' });

    const handleAddStudent = (e) => {
        e.preventDefault();
        // Simple validation
        if (!newStudent.name || !newStudent.rollNo || !newStudent.courseId || !newStudent.gender || !newStudent.group) {
            alert('Please fill in all required fields.');
            return;
        }

        const courseName = courses.find(c => c.id === parseInt(newStudent.courseId))?.name;
        if (!courseName) {
            alert('Invalid Course selected.');
            return;
        }

        setBatches(prevBatches => {
            const updatedBatches = prevBatches.map(batch => {
                // Find the batch that matches the course and can accommodate the new student
                // For simplicity, we're adding to the first active batch of the selected course
                if (batch.courseId === parseInt(newStudent.courseId) && batch.status === 'Active') {
                    return {
                        ...batch,
                        students: [...batch.students, {
                            id: Date.now(), // Unique ID for new student
                            name: newStudent.name,
                            rollNo: newStudent.rollNo,
                            gender: newStudent.gender,
                            group: parseInt(newStudent.group),
                            phone: newStudent.phone,
                            email: newStudent.email,
                        }]
                    };
                }
                return batch;
            });
            // If no suitable batch found, or if we need to create a new batch for this course,
            // more complex logic would go here. For now, assuming batches exist.
            if (!updatedBatches.some(batch => batch.courseId === parseInt(newStudent.courseId) && batch.students.some(s => s.id === Date.now()))) {
                alert('Could not find an active batch for the selected course to add the student.');
                return prevBatches; // Revert if no batch was updated
            }
            return updatedBatches;
        });
        setAddStudentModalOpen(false);
        setNewStudent({ name: '', rollNo: '', gender: '', group: '', phone: '', email: '', courseId: '' }); // Reset form
    };

    const studentsToDisplay = selectedBatch 
        ? batches.find(b => b.id === parseInt(selectedBatch))?.students || []
        : batches.flatMap(batch => batch.students);

    return (
        <AdminPageWrapper title="Students Management">
            <div className="mb-4 flex justify-between items-center">
                <select 
                    value={selectedBatch} 
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="p-2 border border-slate-300 rounded-md bg-white text-slate-700"
                >
                    <option value="">All Batches</option>
                    {batches.map(batch => (
                        <option key={batch.id} value={batch.id}>{courses.find(c => c.id === batch.courseId)?.name} ({batch.academicYear})</option>
                    ))}
                </select>
                <button onClick={() => setAddStudentModalOpen(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md flex items-center">
                    <UserPlus size={16} className="mr-2" /> Add Student
                </button>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-md">
                <table className="w-full min-w-[700px]">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left font-semibold p-3">Name</th>
                            <th className="text-left font-semibold p-3">Roll No.</th>
                            <th className="text-left font-semibold p-3">Course</th>
                            <th className="text-left font-semibold p-3">Batch</th>
                            <th className="text-left font-semibold p-3">Gender</th>
                            <th className="text-left font-semibold p-3">Group</th>
                            <th className="text-left font-semibold p-3">Contact</th>
                            <th className="text-left font-semibold p-3">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsToDisplay.map(student => {
                            const batch = batches.find(b => b.students.some(s => s.id === student.id));
                            const course = courses.find(c => c.id === batch?.courseId);
                            return (
                                <tr key={student.id} className="border-t border-slate-200">
                                    <td className="p-3 font-medium">{student.name}</td>
                                    <td className="p-3">{student.rollNo}</td>
                                    <td className="p-3">{course?.name || 'N/A'}</td>
                                    <td className="p-3">{batch?.academicYear || 'N/A'}</td>
                                    <td className="p-3">{student.gender}</td>
                                    <td className="p-3">{student.group}</td>
                                    <td className="p-3">{student.phone}</td>
                                    <td className="p-3">{student.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isAddStudentModalOpen && (
                <Modal title="Add New Student" onClose={() => setAddStudentModalOpen(false)}>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <InputField label="Name" name="name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} required />
                        <InputField label="Roll No." name="rollNo" value={newStudent.rollNo} onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })} required />
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-1">Course</label>
                            <select 
                                name="courseId" 
                                value={newStudent.courseId} 
                                onChange={(e) => setNewStudent({ ...newStudent, courseId: e.target.value })} 
                                className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-700"
                                required
                            >
                                <option value="">Select Course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                        <InputField label="Gender" name="gender" value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} required />
                        <InputField label="Group" name="group" type="number" value={newStudent.group} onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })} required />
                        <InputField label="Phone" name="phone" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} />
                        <InputField label="Email" name="email" type="email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md">Add Student</button>
                        </div>
                    </form>
                </Modal>
            )}
        </AdminPageWrapper>
    );
};

const CoursesAndBatchesManagement = ({ courses, setCourses, batches, setBatches }) => {
    const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDuration, setNewCourseDuration] = useState('');

    const [isAddBatchModalOpen, setAddBatchModalOpen] = useState(false);
    const [newBatch, setNewBatch] = useState({ courseId: '', academicYear: '', status: 'Active' });

    const handleAddCourse = (e) => {
        e.preventDefault();
        if (newCourseName && newCourseDuration) {
            setCourses([...courses, { id: Date.now(), name: newCourseName, duration: parseInt(newCourseDuration) }]);
            setNewCourseName('');
            setNewCourseDuration('');
            setAddCourseModalOpen(false);
        }
    };

    const handleAddBatch = (e) => {
        e.preventDefault();
        if (newBatch.courseId && newBatch.academicYear) {
            setBatches([...batches, { id: Date.now(), courseId: parseInt(newBatch.courseId), academicYear: newBatch.academicYear, status: newBatch.status, students: [] }]);
            setNewBatch({ courseId: '', academicYear: '', status: 'Active' });
            setAddBatchModalOpen(false);
        }
    };

    const handleDeleteCourse = (id) => {
        if (window.confirm("Are you sure you want to delete this course? This will also delete associated batches.")) {
            setCourses(courses.filter(c => c.id !== id));
            setBatches(batches.filter(b => b.courseId !== id));
        }
    };

    const handleDeleteBatch = (id) => {
        if (window.confirm("Are you sure you want to delete this batch?")) {
            setBatches(batches.filter(b => b.id !== id));
        }
    };

    return (
        <AdminPageWrapper title="Courses & Batches Management">
            <AdminSection title="Courses">
                <button onClick={() => setAddCourseModalOpen(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md flex items-center mb-4">
                    <PlusCircle size={16} className="mr-2" /> Add Course
                </button>
                <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left font-semibold p-3">Course Name</th>
                                <th className="text-left font-semibold p-3">Duration (Years)</th>
                                <th className="text-right font-semibold p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id} className="border-t border-slate-200">
                                    <td className="p-3 font-medium">{course.name}</td>
                                    <td className="p-3">{course.duration}</td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => handleDeleteCourse(course.id)} className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminSection>

            <div className="my-8 border-t border-slate-200"></div>

            <AdminSection title="Batches">
                <button onClick={() => setAddBatchModalOpen(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md flex items-center mb-4">
                    <PlusCircle size={16} className="mr-2" /> Add Batch
                </button>
                <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left font-semibold p-3">Course</th>
                                <th className="text-left font-semibold p-3">Academic Year</th>
                                <th className="text-left font-semibold p-3">Status</th>
                                <th className="text-right font-semibold p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map(batch => (
                                <tr key={batch.id} className="border-t border-slate-200">
                                    <td className="p-3 font-medium">{courses.find(c => c.id === batch.courseId)?.name || 'N/A'}</td>
                                    <td className="p-3">{batch.academicYear}</td>
                                    <td className="p-3">{batch.status}</td>
                                    <td className="p-3 text-right">
                                        <button onClick={() => handleDeleteBatch(batch.id)} className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminSection>

            {isAddCourseModalOpen && (
                <Modal title="Add New Course" onClose={() => setAddCourseModalOpen(false)}>
                    <form onSubmit={handleAddCourse} className="space-y-4">
                        <InputField label="Course Name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} required />
                        <InputField label="Duration (Years)" type="number" value={newCourseDuration} onChange={(e) => setNewCourseDuration(e.target.value)} required />
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md">Add Course</button>
                        </div>
                    </form>
                </Modal>
            )}

            {isAddBatchModalOpen && (
                <Modal title="Add New Batch" onClose={() => setAddBatchModalOpen(false)}>
                    <form onSubmit={handleAddBatch} className="space-y-4">
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-1">Course</label>
                            <select 
                                value={newBatch.courseId} 
                                onChange={(e) => setNewBatch({ ...newBatch, courseId: e.target.value })} 
                                className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-700"
                                required
                            >
                                <option value="">Select Course</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                        <InputField label="Academic Year (e.g., 2024-2026)" value={newBatch.academicYear} onChange={(e) => setNewBatch({ ...newBatch, academicYear: e.target.value })} required />
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-1">Status</label>
                            <select 
                                value={newBatch.status} 
                                onChange={(e) => setNewBatch({ ...newBatch, status: e.target.value })} 
                                className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-700"
                            >
                                <option value="Active">Active</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md">Add Batch</button>
                        </div>
                    </form>
                </Modal>
            )}
        </AdminPageWrapper>
    );
};

const EndorsementsManagement = ({ endorsements, setEndorsements }) => {
    const handleEndorse = (id) => {
        setEndorsements(endorsements.map(e => e.id === id ? { ...e, status: 'Endorsed' } : e));
    };

    const handleReject = (id) => {
        setEndorsements(endorsements.map(e => e.id === id ? { ...e, status: 'Rejected' } : e));
    };

    const pendingEndorsements = endorsements.filter(e => e.status === 'Pending');
    const reviewedEndorsements = endorsements.filter(e => e.status !== 'Pending');

    return (
        <AdminPageWrapper title="Endorsements Management">
            <AdminSection title="Pending Endorsements">
                {pendingEndorsements.length === 0 ? (
                    <p className="text-slate-600">No pending endorsements.</p>
                ) : (
                    <div className="space-y-4">
                        {pendingEndorsements.map(item => (
                            <div key={item.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                                <p className="font-semibold text-slate-700">{item.studentName}</p>
                                <p className="text-slate-600 my-2">{item.contribution}</p>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleEndorse(item.id)} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md text-xs flex items-center">
                                        <ThumbsUp size={14} className="mr-1" /> Endorse
                                    </button>
                                    <button onClick={() => handleReject(item.id)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-xs flex items-center">
                                        <ThumbsDown size={14} className="mr-1" /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </AdminSection>

            <div className="my-8 border-t border-slate-200"></div>

            <AdminSection title="Reviewed Endorsements">
                {reviewedEndorsements.length === 0 ? (
                    <p className="text-slate-600">No reviewed endorsements.</p>
                ) : (
                    <div className="space-y-4">
                        {reviewedEndorsements.map(item => (
                            <div key={item.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                                <p className="font-semibold text-slate-700">{item.studentName}</p>
                                <p className="text-slate-600 my-2">{item.contribution}</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Endorsed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </AdminSection>
        </AdminPageWrapper>
    );
};

const AdminAnnouncements = ({ announcements, setAnnouncements }) => {
    const [isAddAnnouncementModalOpen, setAddAnnouncementModalOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);

    const handleAddAnnouncement = (e) => {
        e.preventDefault();
        if (newAnnouncement.title && newAnnouncement.content) {
            setAnnouncements([{ id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), ...newAnnouncement }, ...announcements]);
            setNewAnnouncement({ title: '', content: '' });
            setAddAnnouncementModalOpen(false);
        }
    };

    const handleUpdateAnnouncement = (e) => {
        e.preventDefault();
        if (editingAnnouncement && editingAnnouncement.title && editingAnnouncement.content) {
            setAnnouncements(announcements.map(ann => ann.id === editingAnnouncement.id ? editingAnnouncement : ann));
            setEditingAnnouncement(null);
        }
    };

    const handleDeleteAnnouncement = (id) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            setAnnouncements(announcements.filter(ann => ann.id !== id));
        }
    };

    const openEditModal = (announcement) => {
        setEditingAnnouncement({ ...announcement });
    };

    return (
        <AdminPageWrapper title="Announcements Management">
            <button onClick={() => setAddAnnouncementModalOpen(true)} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md flex items-center mb-4">
                <PlusCircle size={16} className="mr-2" /> Create New Announcement
            </button>
            <div className="space-y-6">
                {announcements.map(ann => (
                    <div key={ann.id} className="pb-4 border-b border-slate-200 last:border-b-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">{ann.date}</p>
                                <h4 className="font-semibold text-slate-800 mb-1">{ann.title}</h4>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => openEditModal(ann)} className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDeleteAnnouncement(ann.id)} className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="text-slate-600">{ann.content}</p>
                    </div>
                ))}
            </div>

            {isAddAnnouncementModalOpen && (
                <Modal title="Create New Announcement" onClose={() => setAddAnnouncementModalOpen(false)}>
                    <form onSubmit={handleAddAnnouncement} className="space-y-4">
                        <InputField label="Title" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} required />
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-1">Content</label>
                            <textarea className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" placeholder="Type announcement content here..." rows={4} value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md">Publish Announcement</button>
                        </div>
                    </form>
                </Modal>
            )}

            {editingAnnouncement && (
                <Modal title="Edit Announcement" onClose={() => setEditingAnnouncement(null)}>
                    <form onSubmit={handleUpdateAnnouncement} className="space-y-4">
                        <InputField label="Title" value={editingAnnouncement.title} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })} required />
                        <div>
                            <label className="block text-slate-700 text-sm font-semibold mb-1">Content</label>
                            <textarea className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" rows={4} value={editingAnnouncement.content} onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })} required></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md">Update Announcement</button>
                        </div>
                    </form>
                </Modal>
            )}
        </AdminPageWrapper>
    );
};

const AdminQueries = ({ queries, setQueries }) => {
    const handleReplyChange = (id, value) => {
        setQueries(queries.map(q => q.id === id ? { ...q, reply: value } : q));
    };

    const handleSendReply = (id) => {
        setQueries(queries.map(q => q.id === id && q.reply !== null ? { ...q, status: 'Answered' } : q));
    };

    return (
        <AdminPageWrapper title="Student Queries">
            <AdminSection title="Open Queries">
                {queries.filter(q => q.status === 'Open').length === 0 ? (
                    <p className="text-slate-600">No open queries.</p>
                ) : (
                    <div className="space-y-4">
                        {queries.filter(q => q.status === 'Open').map(q => (
                            <div key={q.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                                <p className="font-semibold text-slate-600">{q.studentName}</p>
                                <p className="text-slate-800 my-2">Q: {q.query}</p>
                                <div className="space-y-2">
                                    <textarea 
                                        className="w-full bg-white rounded-md p-2 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" 
                                        placeholder="Type your reply here..." 
                                        rows={2} 
                                        value={q.reply || ''} 
                                        onChange={(e) => handleReplyChange(q.id, e.target.value)}
                                    ></textarea>
                                    <div className="text-right">
                                        <button onClick={() => handleSendReply(q.id)} className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md text-xs">Send Reply</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </AdminSection>

            <div className="my-8 border-t border-slate-200"></div>

            <AdminSection title="Answered Queries">
                {queries.filter(q => q.status === 'Answered').length === 0 ? (
                    <p className="text-slate-600">No answered queries.</p>
                ) : (
                    <div className="space-y-4">
                        {queries.filter(q => q.status === 'Answered').map(q => (
                            <div key={q.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                                <p className="font-semibold text-slate-600">{q.studentName}</p>
                                <p className="text-slate-800 my-2">Q: {q.query}</p>
                                {q.reply && (
                                    <p className="p-3 bg-green-50 border-l-4 border-green-300 rounded-r-md text-sm">A: {q.reply}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </AdminSection>
        </AdminPageWrapper>
    );
};

// --- REUSABLE ADMIN UI COMPONENTS ---

const InfoCard = ({ label, value, action, onClick }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
        <div>
            <p className="text-slate-500">{label}</p>
            <p className="text-slate-800 font-semibold text-2xl mt-1">{value}</p>
        </div>
        {action && (
            <div className="mt-4">
                <button onClick={onClick} className="flex items-center text-sky-600 hover:underline font-medium text-xs cursor-pointer">
                    {action} <ChevronRight className="w-4 h-4 ml-0.5" />
                </button>
            </div>
        )}
    </div>
);

const InputField = ({ label, type = "text", value, onChange, required = false, name }) => (
    <div>
        <label htmlFor={name} className="block text-slate-700 text-sm font-semibold mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
    </div>
);

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl relative">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700">
                <X size={20} />
            </button>
            {children}
        </div>
    </div>
);

export default Admin;