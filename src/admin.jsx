import React, { useState } from 'react';
import { 
    CreditCard, Megaphone, MessageSquare, LogOut, Menu, X, 
    ChevronRight, Users, LayoutDashboard, CheckSquare as CheckSquareAdmin, 
    ThumbsUp, ThumbsDown, PlusCircle, Upload, Trash2, Edit, UserPlus, Calendar,
    BookCopy, Shield
} from 'lucide-react';

// --- FIXED ASSET ---
// Using a placeholder URL for the logo.
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
            { id: 103, name: 'Sivalakshmi P S', rollNo: 'MCA24003', gender: 'Female', group: 2, phone: '9876543212', email: 'sivalakshmi.ps@example.com' },
        ]
    },
    { 
        id: 2, courseId: 2, academicYear: '2023-2026', status: 'Active',
        students: [
            { id: 201, name: 'Dony Mullanil Binu', rollNo: 'BCA23001', gender: 'Male', group: null, phone: '9876543213', email: 'dony.binu@example.com' },
            { id: 202, name: 'Geo Devassy', rollNo: 'BCA23002', gender: 'Male', group: null, phone: '9876543214', email: 'geo.devassy@example.com' },
        ]
    },
    { id: 3, courseId: 1, academicYear: '2022-2024', status: 'Inactive', students: [] },
];

const initialOfficeBearers = [
    { id: 1, name: 'Dr. Bindiya', position: 'CSTAR Coordinator', username: 'bindiya.m' },
    { id: 2, name: 'Prof. John Doe', position: 'Asst. Coordinator', username: 'john.doe' },
];

// ####################################################################
// #  MAIN APP COMPONENT                                              #
// ####################################################################
export default function App() {
    const [activeScreen, setActiveScreen] = useState('Dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Dashboard': return <AdminDashboardPage setActiveScreen={setActiveScreen} />;
            case 'Manage Courses': return <ManageCoursesPage />;
            case 'Manage Batches': return <ManageBatchesPage />;
            case 'Manage Groups': return <ManageGroupsPage />;
            case 'Attendance': return <AttendancePage />;
            case 'Payments': return <AdminPaymentsPage />;
            case 'Office Bearers': return <OfficeBearersPage />;
            case 'Endorse Contributions': return <EndorseContributionsPage />;
            case 'Announcements': return <AdminAnnouncementsPage />;
            case 'Queries': return <AdminQueriesPage />;
            default: return <AdminDashboardPage setActiveScreen={setActiveScreen} />;
        }
    }

    return (
        <div className="flex h-screen bg-slate-100 font-sans text-sm">
            <AdminSidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader adminName={adminData.name} onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">{renderScreen()}</main>
            </div>
        </div>
    );
};


// ####################################################################
// #  LAYOUT & REUSABLE COMPONENTS                                    #
// ####################################################################

const AdminSidebar = ({ activeScreen, setActiveScreen, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard }, 
        { name: 'Manage Courses', icon: BookCopy },
        { name: 'Manage Batches', icon: Users },
        { name: 'Manage Groups', icon: UserPlus },
        { name: 'Attendance', icon: Calendar },
        { name: 'Payments', icon: CreditCard },
        { name: 'Office Bearers', icon: Shield },
        { name: 'Endorse Contributions', icon: CheckSquareAdmin },
        { name: 'Announcements', icon: Megaphone }, 
        { name: 'Queries', icon: MessageSquare },
    ];
    const handleItemClick = (screen) => { setActiveScreen(screen); setSidebarOpen(false); };
    return (
        <>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 sm:hidden" onClick={() => setSidebarOpen(false)}></div>}
            <aside className={`fixed sm:relative inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex-col flex-shrink-0 z-40 sm:flex transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
                <div className="h-16 flex items-center justify-center border-b border-slate-200 px-6 relative">
                    <img src={cstarLogo} alt="CSTAR Logo" className='h-12' />
                    <button onClick={() => setSidebarOpen(false)} className="sm:hidden p-1 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2"><X size={20} /></button>
                </div>
                <nav className="flex-1 px-4 py-4">
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Panel</p>
                    <ul>{navItems.map(item => (<li key={item.name}><a href="#" onClick={(e) => { e.preventDefault(); handleItemClick(item.name); }} className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${activeScreen === item.name ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}><item.icon className="w-4 h-4 mr-3" /><span>{item.name}</span></a></li>))}</ul>
                </nav>
                <div className="px-4 py-3 border-t border-slate-200">
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
            <h2 className="text-lg font-semibold text-slate-800">Welcome, {adminName}!</h2>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">{adminName.charAt(0)}</div>
    </header>
);

const TextButton = ({ children, onClick }) => {
    return (<button onClick={onClick} className="inline-flex items-center text-sky-600 hover:underline font-semibold text-xs cursor-pointer">{children} <ChevronRight className="w-4 h-4 ml-0.5" /></button>);
};

const InfoCard = ({ label, value, action, onClick }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
        <div>
            <p className="text-slate-500">{label}</p>
            <p className="text-slate-800 font-bold text-3xl mt-1">{value}</p>
        </div>
        {action && <div className="mt-4"><TextButton onClick={onClick}>{action}</TextButton></div>}
    </div>
);

const Modal = ({ show, onClose, title, children, size = 'md' }) => {
    if (!show) return null;
    const sizeClasses = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]}`} onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 flex justify-between items-center border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100"><X size={20} /></button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};


// ####################################################################
// #  PAGE COMPONENTS                                                 #
// ####################################################################

const AdminDashboardPage = ({ setActiveScreen }) => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Dashboard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard label="Total Students" value={dashboardStats.totalStudents} />
            <InfoCard label="Pending Endorsements" value={dashboardStats.pendingEndorsements} onClick={() => setActiveScreen('Endorse Contributions')} action="View Details" />
            <InfoCard label="Open Queries" value={dashboardStats.openQueries} onClick={() => setActiveScreen('Queries')} action="View Details" />
        </div>
    </div>
);

const ManageCoursesPage = () => {
    const [courses, setCourses] = useState(initialCoursesData);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Manage Courses</h3>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-semibold">
                    <PlusCircle size={16} /> New Course
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="space-y-3">
                    {courses.map(course => (
                        <div key={course.id} className="p-4 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-slate-800">{course.name}</p>
                                <p className="text-slate-500">{course.duration} years</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-500 hover:text-slate-800"><Edit size={16} /></button>
                                <button className="p-2 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} title="Create New Course">
                <div className="space-y-4">
                    <input type="text" placeholder="Course Name" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    <input type="number" placeholder="Duration (in years)" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    <div className="text-right">
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 font-semibold">Create Course</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

const ManageBatchesPage = () => {
    const [batches, setBatches] = useState(initialBatchesData);
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [managingBatch, setManagingBatch] = useState(null);

    const handleDeactivate = (batchId) => {
        setBatches(batches.map(b => b.id === batchId ? { ...b, status: 'Inactive' } : b));
    };
    
    const handleReactivate = (batchId) => {
        setBatches(batches.map(b => b.id === batchId ? { ...b, status: 'Active' } : b));
    };

    const openManageStudents = (batch) => {
        setManagingBatch(batch);
        setShowStudentModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Manage Batches</h3>
                <button onClick={() => setShowBatchModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-semibold">
                    <PlusCircle size={16} /> New Batch
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-700 mb-3">Active Batches</h4>
                {batches.filter(b => b.status === 'Active').map(batch => (
                    <div key={batch.id} className="p-4 bg-slate-50 rounded-md border border-slate-200 mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-slate-800">{initialCoursesData.find(c=>c.id === batch.courseId)?.name} {batch.academicYear}</p>
                                <p className="text-slate-500">{batch.students.length} Students</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => openManageStudents(batch)} className="flex items-center gap-1 px-3 py-1 bg-white text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100 text-xs font-semibold">
                                    <Edit size={14} /> Manage
                                </button>
                                <button onClick={() => handleDeactivate(batch.id)} className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs font-semibold">
                                    <Trash2 size={14} /> Deactivate
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 mt-6">
                <h4 className="font-semibold text-slate-700 mb-3">Inactive Batches</h4>
                {batches.filter(b => b.status === 'Inactive').map(batch => (
                     <div key={batch.id} className="p-4 bg-slate-50 rounded-md border border-slate-200 mb-4 opacity-60">
                         <div className="flex justify-between items-center">
                             <div>
                                 <p className="font-bold text-slate-800">{initialCoursesData.find(c=>c.id === batch.courseId)?.name} {batch.academicYear}</p>
                             </div>
                             <button onClick={() => handleReactivate(batch.id)} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-xs font-semibold">
                                 Reactivate
                             </button>
                         </div>
                     </div>
                ))}
            </div>

            <Modal show={showBatchModal} onClose={() => setShowBatchModal(false)} title="Create New Batch">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                        <select className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                            <option value="" disabled>Select a course</option>
                            {initialCoursesData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
                        <input type="text" placeholder="e.g., 2024-2026" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    </div>
                    <div className="text-right">
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 font-semibold">Create Batch</button>
                    </div>
                </div>
            </Modal>
            
            <Modal show={showStudentModal} onClose={() => setShowStudentModal(false)} title={`Manage Students: ${initialCoursesData.find(c=>c.id === managingBatch?.courseId)?.name} ${managingBatch?.academicYear}`} size="lg">
                <div className="space-y-4">
                     <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-semibold">
                           <UserPlus size={16} /> Add Student
                        </button>
                        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-semibold cursor-pointer">
                           <Upload size={16} /> Import Excel
                           <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                        </label>
                     </div>
                     <div className="max-h-80 overflow-y-auto pr-2 -mr-2">
                        {managingBatch?.students.map(student => (
                            <div key={student.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 mb-2">
                                <div className="flex justify-between items-center">
                                    <p className="font-medium text-slate-700">{student.name} <span className="text-slate-500 font-normal">({student.rollNo})</span></p>
                                    <button className="p-1 text-slate-500 hover:text-slate-800"><Edit size={14} /></button>
                                </div>
                                <div className="text-xs text-slate-500 mt-1 grid grid-cols-2 gap-x-4">
                                    <p>Email: {student.email}</p>
                                    <p>Phone: {student.phone}</p>
                                    <p>Gender: {student.gender}</p>
                                    <p>Group: {student.group || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </Modal>
        </div>
    );
};

const ManageGroupsPage = () => {
    const [selectedBatchId, setSelectedBatchId] = useState(initialBatchesData[0].id);
    const activeBatches = initialBatchesData.filter(b => b.status === 'Active');
    const selectedBatch = activeBatches.find(b => b.id === selectedBatchId);

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Manage Groups</h3>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="mb-4">
                    <label htmlFor="batch-select" className="block text-sm font-medium text-slate-700 mb-1">Select Batch</label>
                    <select id="batch-select" value={selectedBatchId} onChange={(e) => setSelectedBatchId(Number(e.target.value))} className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                        {activeBatches.map(b => <option key={b.id} value={b.id}>{initialCoursesData.find(c=>c.id === b.courseId)?.name} {b.academicYear}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    {selectedBatch?.students.map(student => (
                        <div key={student.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
                            <p className="font-medium text-slate-800">{student.name}</p>
                            <div className="flex items-center gap-2">
                                <label htmlFor={`group-for-${student.id}`} className="text-xs font-semibold text-slate-500">GROUP</label>
                                <select id={`group-for-${student.id}`} defaultValue={student.group || ''} className="w-20 bg-white rounded-md p-1 text-sm text-slate-700 border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                                    <option value="" disabled>None</option>
                                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AttendancePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedBatchIds, setSelectedBatchIds] = useState([]);
    const activeBatches = initialBatchesData.filter(b => b.status === 'Active');
    
    const studentsForAttendance = initialBatchesData
        .filter(batch => selectedBatchIds.includes(batch.id))
        .flatMap(batch => batch.students.map(s => ({...s, batchName: `${initialCoursesData.find(c=>c.id === batch.courseId)?.name} ${batch.academicYear}`})));

    const handleBatchSelection = (batchId) => {
        setSelectedBatchIds(prev => prev.includes(batchId) ? prev.filter(id => id !== batchId) : [...prev, batchId]);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Take Attendance</h3>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                        <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-slate-50 rounded-md p-2 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Select Batches</label>
                        <div className="flex flex-wrap gap-2">
                            {activeBatches.map(batch => (
                                <button key={batch.id} onClick={() => handleBatchSelection(batch.id)} className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${selectedBatchIds.includes(batch.id) ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-300'}`}>
                                    {initialCoursesData.find(c=>c.id === batch.courseId)?.name} {batch.academicYear}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {selectedBatchIds.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Mark Attendance</h4>
                        <div className="space-y-2">
                           {studentsForAttendance.map(student => (
                                <AttendanceRow key={student.id} student={student} />
                           ))}
                        </div>
                         <div className="text-right mt-6">
                            <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 font-semibold">Submit Attendance</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AttendanceRow = ({ student }) => {
    const [isPresent, setIsPresent] = useState(true);
    return (
         <div className="p-2 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
            <div>
                <p className="font-medium text-slate-800">{student.name}</p>
                <p className="text-xs text-slate-500">{student.batchName}</p>
            </div>
            <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isPresent} onChange={() => setIsPresent(!isPresent)} className="h-5 w-5 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                    <span className={`text-xs font-bold ${isPresent ? 'text-green-600' : 'text-red-600'}`}>
                        {isPresent ? 'PRESENT' : 'ABSENT'}
                    </span>
                </label>
            </div>
        </div>
    );
};

const AdminPaymentsPage = () => {
    const [collections, setCollections] = useState([
        { id: 'c1', title: 'T-Shirt Fee', amount: 350 },
        { id: 'c2', title: 'CSTAR Dec Fee', amount: 500 },
    ]);
    const [showModal, setShowModal] = useState(false);
    const students = initialBatchesData.filter(b => b.status === 'Active').flatMap(b => b.students);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Manage Payments</h3>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-semibold">
                    <PlusCircle size={16} /> New Payment Column
                </button>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left font-semibold p-3 sticky left-0 bg-slate-50">Student Name</th>
                            {collections.map(pc => <th key={pc.id} className="text-left font-semibold p-3">{pc.title} (₹{pc.amount})</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="border-t border-slate-200">
                                <td className="p-3 font-medium sticky left-0 bg-white">{student.name}</td>
                                {collections.map(pc => (
                                    <td key={pc.id} className="p-3">
                                        <select className="w-24 bg-slate-50 rounded-md p-1 text-sm border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none">
                                            <option value="paid" className="text-green-700">Paid</option>
                                            <option value="not_paid" className="text-red-700">Not Paid</option>
                                            <option value="partial" className="text-amber-700">Partial</option>
                                        </select>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <Modal show={showModal} onClose={() => setShowModal(false)} title="New Payment Column">
                <div className="space-y-4">
                    <input type="text" placeholder="Column Title (e.g., Industrial Visit)" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    <input type="number" placeholder="Amount (₹)" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                    <div className="text-right">
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 font-semibold">Create Column</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

const OfficeBearersPage = () => {
    const [bearers, setBearers] = useState(initialOfficeBearers);
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Office Bearers</h3>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 text-sm font-semibold">
                    <PlusCircle size={16} /> New Bearer
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="space-y-3">
                    {bearers.map(bearer => (
                        <div key={bearer.id} className="p-4 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-slate-800">{bearer.name}</p>
                                <p className="text-slate-500">{bearer.position} - (Username: {bearer.username})</p>
                            </div>
                             <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-500 hover:text-slate-800"><Edit size={16} /></button>
                                <button className="p-2 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} title="Create Office Bearer Account">
                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full bg-slate-50 rounded-md p-3 text-sm" />
                    <input type="text" placeholder="Position" className="w-full bg-slate-50 rounded-md p-3 text-sm" />
                    <input type="text" placeholder="Username" className="w-full bg-slate-50 rounded-md p-3 text-sm" />
                    <input type="password" placeholder="Password" className="w-full bg-slate-50 rounded-md p-3 text-sm" />
                    <div className="text-right">
                        <button className="px-4 py-1.5 bg-slate-800 text-white rounded-md hover:bg-slate-900 font-semibold">Create Account</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

const EndorseContributionsPage = () => {
    const [contributions, setContributions] = useState([
        { id: 3, studentName: 'George K Saji', text: 'Volunteered during the Freshers Welcome Event.' },
        { id: 4, studentName: 'Tejaa Tharshini', text: 'Designed the CSTAR logo.' },
    ]);
    const handleAction = (id) => setContributions(c => c.filter(item => item.id !== id));
    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Endorse Student Contributions</h3>
            <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="space-y-4">
                    {contributions.length > 0 ? contributions.map(item => (
                        <div key={item.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                            <p className="font-semibold text-slate-600">{item.studentName}</p>
                            <p className="text-slate-800 my-2">{item.text}</p>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleAction(item.id)} className="flex items-center px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 text-xs font-semibold rounded-md"><ThumbsUp size={14} className="mr-1.5" /> Endorse</button>
                                <button onClick={() => handleAction(item.id)} className="flex items-center px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-xs font-semibold rounded-md"><ThumbsDown size={14} className="mr-1.5" /> Reject</button>
                            </div>
                        </div>
                    )) : <p className="text-slate-500">No pending contributions.</p>}
                </div>
            </div>
        </div>
    );
};

const AdminAnnouncementsPage = () => (
     <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Post an Announcement</h3>
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="space-y-4">
                <input type="text" placeholder="Announcement Title" className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none border border-slate-200" />
                <textarea className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" placeholder="Write the announcement content here..." rows={5}></textarea>
                <div className="text-right">
                    <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200">Post Announcement</button>
                </div>
            </div>
        </div>
    </div>
);

const AdminQueriesPage = () => (
    <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Student Queries</h3>
        <div className="bg-white p-6 rounded-lg border border-slate-200">
            <div className="space-y-6">
                {[
                    { id: 1, studentName: 'Aadarsh V Venu', query: "When is the deadline for the next fee payment?", reply: "The deadline for the next semester's tuition fee is August 15, 2025.", status: 'Answered' },
                    { id: 2, studentName: 'Arjun C', query: "Is there a holiday for the upcoming festival?", reply: null, status: 'Open' },
                ].map(q => (
                    <div key={q.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                        <p className="font-semibold text-slate-600">{q.studentName}</p>
                        <p className="text-slate-800 my-2">Q: {q.query}</p>
                        {q.reply ? (
                            <p className="p-3 bg-green-50 border-l-4 border-green-300 rounded-r-md text-sm">A: {q.reply}</p>
                        ) : (
                            <div className="space-y-2">
                                <textarea className="w-full bg-white rounded-md p-2 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" placeholder="Type your reply here..." rows={2}></textarea>
                                <div className="text-right">
                                    <button className="px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md text-xs">Send Reply</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
);
