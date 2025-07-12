import React, { useState } from 'react';
import { Home, Calendar, CreditCard, Megaphone, MessageSquare, LogOut, Menu, X, ChevronRight, CheckCircle, AlertTriangle, Clock, ArrowLeft, Users, Award, ExternalLink } from 'lucide-react';
// Assuming you have cstar.png in src/assets/
import cstarLogo from './assets/cstar.png'; 

// --- MOCK DATA ---
const studentData = {
    name: "George K Saji",
    studentId: "MCA2426",
    attendance: 88,
    group: 5,
};

const eventData = {
  '1': { id: 1, date: 'July 11, 2025', title: 'Tech Symposium "Innovate 2025"', photo: 'https://placehold.co/600x400/e2e8f0/475569?text=Innovate+2025', details: { fullDescription: "Innovate 2025 was a landmark event for our college...", organizers: ["Dr. Ramesh Kumar", "Student Tech Club"], attendanceSummary: "Overall attendance for the event was 92%." }},
  '2': { id: 2, date: 'July 07, 2025', title: 'GitHub & Git Workshop', photo: 'https://placehold.co/600x400/e2e8f0/475569?text=Git+Workshop', details: { fullDescription: "A hands-on session was conducted for all students...", organizers: ["CSTAR"], attendanceSummary: "Attendance was mandatory for all CS students." }},
};

const attendanceLogData = [
    { date: 'July 11, 2025', status: 'Present', eventId: 1, eventName: 'Tech Symposium "Innovate 2025"' },
    { date: 'July 10, 2025', status: 'Present', eventId: null, eventName: null },
    { date: 'July 09, 2025', status: 'Absent', eventId: null, eventName: null },
];

const groupMatesData = [
    { name: 'George K Saji', class: 'MCA', contact: '9876543210', gender: 'Male' },
    { name: 'Tejaa Tharshini', class: 'MCA', contact: '9876543211', gender: 'Female' },
    { name: 'Sivalakshmi P S', class: 'MCA', contact: '9876543212', gender: 'Female' },
    { name: 'Namdev P Prabhakar', class: 'BCA', contact: '9876543213', gender: 'Male' },
];

const myContributionsData = [
    { id: 1, text: 'Organized the technical quiz for the "Innovate 2025" symposium.', status: 'Endorsed' },
    { id: 2, text: 'Created the promotional poster for the GitHub & Git Workshop.', status: 'Endorsed' },
    { id: 3, text: 'Volunteered during the Freshers Welcome Event.', status: 'Pending' },
];

const allStudentsConsolidatedPaymentsData = [
    { name: 'Dony Mullanil Binu', course: 'BCA', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
    { name: 'Geo Devassy', course: 'BCA', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
    { name: 'Anunay Brini', course: 'BSC', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
    { name: 'Aiswarya Nair', course: 'MSC', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
    { name: 'Aadarsh V Venu', course: 'IMCA', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Not Paid' },
    { name: 'Arjun C', course: 'MCA', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
    { name: 'Asin Rose O V', course: 'BSC', dec2025: 'Paid', jan2025: 'Paid', farewell: 'Paid' },
];


const announcementsData = [
    { id: 1, date: 'July 10, 2025', title: 'No CSTAR on July 14', content: 'Please note that there will be no CSTAR session on July 14th due to scheduling conflicts.' },
    { id: 2, date: 'July 08, 2025', title: 'Freshers Welcome Event', content: 'Join us for the Freshers Welcome Event on July 20th at 5 PM in the main auditorium.' },
];

const upcomingFestsData = [
    { id: 'fest1', college: "IIT Madras", fest: "Shaastra 2025", link: "https://shaastra.org/" },
    { id: 'fest2', college: "VIT Vellore", fest: "Riviera 2025", link: "https://vit.ac.in/riviera" },
];

const queriesData = [
    { id: 1, query: "When is the deadline for the next fee payment?", reply: "The deadline for the next semester's tuition fee is August 15, 2025. You can find more details under the Payments section." }
];

// --- MAIN APP COMPONENT ---
export default function App() {
    const [activeScreen, setActiveScreen] = useState('Home');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Home': return <Dashboard onEventClick={setSelectedEvent} setActiveScreen={setActiveScreen} />;
            case 'Attendance': return <AttendancePage />;
            case 'Payments': return <PaymentsPage setActiveScreen={setActiveScreen} />;
            case 'ConsolidatedPayments': return <ConsolidatedPaymentsPage setActiveScreen={setActiveScreen} />;
            case 'Announcements': return <AnnouncementsPage />;
            case 'Queries': return <QueriesPage />;
            case 'My Group': return <MyGroupPage />;
            case 'My Contributions': return <MyContributionsPage />;
            default: return <Dashboard onEventClick={setSelectedEvent} setActiveScreen={setActiveScreen} />;
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-sm">
            <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header studentName={studentData.name} onMenuClick={() => setSidebarOpen(true)} />
                
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {renderScreen()}
                </main>
            </div>
            {selectedEvent && <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
}

// --- LAYOUT COMPONENTS ---

const Sidebar = ({ activeScreen, setActiveScreen, isSidebarOpen, setSidebarOpen }) => {
    const navItems = [
        { name: 'Home', icon: Home },
        { name: 'Attendance', icon: Calendar },
        { name: 'Payments', icon: CreditCard },
        { name: 'Announcements', icon: Megaphone },
        { name: 'My Group', icon: Users },
        { name: 'My Contributions', icon: Award },
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
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Student Panel</p>
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
                    <a href="#" className="flex items-center px-4 py-2 rounded-md transition-colors duration-200 font-medium text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        </>
    );
};

const Header = ({ studentName, onMenuClick }) => (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center space-x-4">
            <button onClick={onMenuClick} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 sm:hidden"><Menu size={20} /></button>
            <h2 className="text-lg font-semibold text-slate-800">Welcome, {studentName.split(' ')[0]}!</h2>
        </div>
        <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-slate-600 font-bold">{studentName.charAt(0)}</div>
    </header>
);

const PageWrapper = ({ title, children }) => (
    <div className="w-full bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-base font-semibold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);

// --- PAGE COMPONENTS ---

const Dashboard = ({ setActiveScreen }) => (
  <PageWrapper title="Your Dashboard">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <InfoCard label="Attendance" value={`${studentData.attendance}%`} onClick={() => setActiveScreen('Attendance')} action="View Details" />
      <InfoCard label="Student ID" value={studentData.studentId} />
      <InfoCard label="My Group" value={`Group ${studentData.group}`} onClick={() => setActiveScreen('My Group')} action="View Details" />
    </div>
    <Section title="Upcoming Fests">
      <div className="space-y-4">
        {upcomingFestsData.map((fest) => ( <FestCard key={fest.id} fest={fest} /> ))}
      </div>
    </Section>
  </PageWrapper>
);

const AttendancePage = () => {
    const [viewingEventId, setViewingEventId] = useState(null);
    if (viewingEventId) return <EventReportDetail event={eventData[viewingEventId]} onBack={() => setViewingEventId(null)} />;
    
    const totalDays = attendanceLogData.length;
    const presentDays = attendanceLogData.filter(d => d.status === 'Present').length;
    const absentDays = totalDays - presentDays;
    const overallPercentage = Math.round((presentDays / totalDays) * 100);
    const statusStyles = { Present: 'bg-green-100 text-green-800', Absent: 'bg-red-100 text-red-800' };

    return (
        <PageWrapper title="Attendance Details">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <InfoBlock label="Overall" value={`${overallPercentage}%`} />
                <InfoBlock label="Total Days" value={totalDays} />
                <InfoBlock label="Present" value={presentDays} />
                <InfoBlock label="Absent" value={absentDays} />
            </div>
            <Section title="Daily Log">
                <div className="border border-slate-200 rounded-md">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left font-semibold p-3">Date</th>
                                <th className="text-left font-semibold p-3">Event/Activity</th>
                                <th className="text-left font-semibold p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceLogData.map((day, index) => (
                                <tr key={index} className={`border-t border-slate-200 ${day.eventId ? 'cursor-pointer hover:bg-slate-50' : ''}`} onClick={() => day.eventId && setViewingEventId(day.eventId)}>
                                    <td className="p-3 text-slate-700">{day.date}</td>
                                    <td className="p-3 text-slate-700 font-medium">{day.eventName || 'Regular Class'}</td>
                                    <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[day.status]}`}>{day.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-right">
                    <a href="https://odtracker.rajagiri.edu/site/login" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200 text-center">Apply for OD</a>
                </div>
            </Section>
        </PageWrapper>
    );
};

const PaymentsPage = ({ setActiveScreen }) => (
    <PageWrapper title="Payments">
        <Section title="Consolidated Payments">
            <p className="text-slate-600 mb-4">View the consolidated payment report for various events and months.</p>
            <div className="text-left">
                <button onClick={() => setActiveScreen('ConsolidatedPayments')} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200">View Report</button>
            </div>
        </Section>
    </PageWrapper>
);

const ConsolidatedPaymentsPage = ({ setActiveScreen }) => {
    const statusStyles = { Paid: 'bg-green-100 text-green-800', 'Not Paid': 'bg-red-100 text-red-800' };
    return (
        <PageWrapper title="Consolidated Payment Report">
             <button onClick={() => setActiveScreen('Payments')} className="flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Payments
            </button>
            <div className="overflow-x-auto border border-slate-200 rounded-md">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left font-semibold p-3">Name</th>
                            <th className="text-left font-semibold p-3">Course</th>
                            <th className="text-left font-semibold p-3">December 2025</th>
                            <th className="text-left font-semibold p-3">January 2025</th>
                            <th className="text-left font-semibold p-3">Farewell (₹100)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStudentsConsolidatedPaymentsData.map((student, index) => (
                            <tr key={index} className="border-t border-slate-200">
                                <td className="p-3 font-medium">{student.name}</td>
                                <td className="p-3">{student.course}</td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[student.dec2025]}`}>{student.dec2025}</span></td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[student.jan2025]}`}>{student.jan2025}</span></td>
                                <td className="p-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[student.farewell]}`}>{student.farewell}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageWrapper>
    );
};

const MyGroupPage = () => (
    <PageWrapper title={`My Group (Group ${studentData.group})`}>
        <div className="border border-slate-200 rounded-md">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="text-left font-semibold p-3">Name</th>
                        <th className="text-left font-semibold p-3">Class</th>
                        <th className="text-left font-semibold p-3">Contact</th>
                        <th className="text-left font-semibold p-3">Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {groupMatesData.map((mate, index) => (
                        <tr key={index} className="border-t border-slate-200">
                            <td className="p-3 font-medium">{mate.name}</td>
                            <td className="p-3">{mate.class}</td>
                            <td className="p-3">{mate.contact}</td>
                            <td className="p-3">{mate.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </PageWrapper>
);

const MyContributionsPage = () => {
    const statusStyles = { Endorsed: 'bg-green-100 text-green-800', Pending: 'bg-amber-100 text-amber-800' };
    return(
        <PageWrapper title="My Contributions">
            <Section title="Submit a New Contribution">
                <SuggestionsBox placeholder="Describe your contribution..." buttonText="Submit for Endorsement" />
            </Section>
            <div className="my-8 border-t border-slate-200"></div>
            <Section title="Contribution History">
                <div className="space-y-4">
                    {myContributionsData.map(item => (
                        <div key={item.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                            <p className="text-slate-700 mb-2">{item.text}</p>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[item.status]}`}>{item.status}</span>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrapper>
    )
};

const AnnouncementsPage = () => (
    <PageWrapper title="Announcements">
        <div className="space-y-6">
            {announcementsData.map(ann => (
                <div key={ann.id} className="pb-4 border-b border-slate-200 last:border-b-0">
                    <p className="text-xs text-slate-500 mb-1">{ann.date}</p>
                    <h4 className="font-semibold text-slate-800 mb-1">{ann.title}</h4>
                    <p className="text-slate-600">{ann.content}</p>
                </div>
            ))}
        </div>
    </PageWrapper>
);

const QueriesPage = () => (
    <PageWrapper title="Suggestions & Queries">
        <Section title="Submit a New Query">
            <SuggestionsBox placeholder="Have a question? Let us know here..." buttonText="Submit Query" />
        </Section>
        <div className="my-8 border-t border-slate-200"></div>
        <Section title="Past Queries">
            {queriesData.map(q => (
                <div key={q.id}>
                    <p className="font-semibold text-slate-700">Q: {q.query}</p>
                    <p className="mt-2 p-3 bg-slate-50 border-l-4 border-slate-300 rounded-r-md">A: {q.reply}</p>
                </div>
            ))}
        </Section>
    </PageWrapper>
);

// --- REUSABLE UI COMPONENTS ---

const Section = ({ title, children }) => (
    <div>
        <h4 className="text-base font-semibold text-slate-800 mb-3">{title}</h4>
        {children}
    </div>
);

const InfoCard = ({ label, value, action, onClick }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col">
        <div>
            <p className="text-slate-500">{label}</p>
            <p className="text-slate-800 font-semibold text-2xl mt-1">{value}</p>
        </div>
        {action && <div className="mt-4"><TextButton onClick={onClick}>{action}</TextButton></div>}
    </div>
);

const InfoBlock = ({ label, value }) => (
    <div className="bg-slate-100 p-4 rounded-md text-center">
        <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-slate-800 font-bold text-xl">{value}</p>
    </div>
);

const FestCard = ({ fest }) => {
    const [isInterested, setIsInterested] = useState(false);

    return (
        <div className="p-4 bg-slate-50 rounded-md border border-slate-200 flex items-center justify-between">
            <div>
                <p className="font-semibold text-slate-800">{fest.fest}</p>
                <p className="text-slate-500">{fest.college}</p>
            </div>
            <div className="flex items-center space-x-2">
                <a href={fest.link} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-md">
                    <ExternalLink size={16} />
                </a>
                {isInterested ? (
                    <div className="flex items-center space-x-2">
                        <span className="flex items-center text-green-600 font-semibold text-xs">
                            <CheckCircle size={16} className="mr-1" />
                            Interested
                        </span>
                        <button onClick={() => setIsInterested(false)} className="p-1 text-slate-400 hover:text-red-600">
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsInterested(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200 text-xs">
                        Mark Interested
                    </button>
                )}
            </div>
        </div>
    );
};

const TextButton = ({ children, onClick, href, isExternal }) => {
    const props = isExternal ? { href, target: "_blank", rel: "noopener noreferrer" } : { href: href || "#", onClick };
    return (
        <a {...props} className="flex items-center text-sky-600 hover:underline font-medium text-xs cursor-pointer">
            {children} <ChevronRight className="w-4 h-4 ml-0.5" />
        </a>
    );
};

const SuggestionsBox = ({ placeholder, buttonText }) => (
    <div>
        <textarea className="w-full bg-slate-50 rounded-md p-3 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none border border-slate-200" placeholder={placeholder} rows={4}></textarea>
        <div className="text-right mt-2">
            <button className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800">{buttonText}</button>
        </div>
    </div>
);

const EventReportDetail = ({ event, onBack }) => (
    <PageWrapper title="Event Report">
        <button onClick={onBack} className="flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 mb-4"><ArrowLeft className="w-4 h-4 mr-2" />Back to Attendance Log</button>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{event.title}</h2>
        <p className="text-sm text-slate-500 mb-4">{event.date}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <img src={event.photo} alt={event.title} className="w-full h-48 object-cover rounded-md bg-slate-200" />
            <img src={event.photo.replace('?text=', '-2?text=')} alt={event.title} className="w-full h-48 object-cover rounded-md bg-slate-200 hidden md:block" />
        </div>
        <Section title="Report"><p className="text-slate-600 mb-4 leading-relaxed">{event.details.fullDescription}</p></Section>
        <Section title="Attendance Summary"><p className="text-slate-600">{event.details.attendanceSummary}</p></Section>
    </PageWrapper>
);
