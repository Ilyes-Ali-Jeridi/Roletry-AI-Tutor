import React, { useState } from 'react';
import { 
  Home, 
  BarChart2, 
  Compass, 
  Settings, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Activity, 
  ShoppingCart, 
  Info,
  Search,
  Plus,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const GA4Simulator: React.FC = () => {
  const [activeNav, setActiveNav] = useState<'home' | 'reports' | 'explore' | 'admin'>('reports');
  const [activeReport, setActiveReport] = useState<'snapshot' | 'realtime' | 'acquisition' | 'engagement'>('acquisition');

  // --- MOCK DATA ---
  const acquisitionData = [
    { channel: 'Organic Search', users: '12,405', sessions: '15,200', engaged: '65%', conversions: '420' },
    { channel: 'Direct', users: '5,200', sessions: '6,100', engaged: '52%', conversions: '180' },
    { channel: 'Paid Search', users: '3,150', sessions: '3,800', engaged: '48%', conversions: '110' },
    { channel: 'Organic Social', users: '2,800', sessions: '3,200', engaged: '70%', conversions: '95' },
    { channel: 'Email', users: '1,500', sessions: '1,900', engaged: '85%', conversions: '240' },
  ];

  const eventData = [
    { name: 'page_view', count: '45,200', users: '18,500' },
    { name: 'session_start', count: '22,100', users: '18,500' },
    { name: 'view_item', count: '12,500', users: '8,200' },
    { name: 'add_to_cart', count: '3,200', users: '2,100' },
    { name: 'begin_checkout', count: '1,800', users: '1,500' },
    { name: 'purchase', count: '850', users: '820' },
  ];

  return (
    <div className="flex h-full w-full bg-[#f8f9fa] font-sans text-slate-800 overflow-hidden">
      
      {/* 1. PRIMARY NAVIGATION RAIL (Leftmost) */}
      <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 z-20 shadow-sm">
        <div className="mb-6">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
            G
          </div>
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          <NavIcon icon={Home} label="Home" active={activeNav === 'home'} onClick={() => setActiveNav('home')} />
          <NavIcon icon={BarChart2} label="Reports" active={activeNav === 'reports'} onClick={() => setActiveNav('reports')} />
          <NavIcon icon={Compass} label="Explore" active={activeNav === 'explore'} onClick={() => setActiveNav('explore')} />
          <div className="h-px w-8 bg-slate-200 mx-auto my-2" />
          <NavIcon icon={Settings} label="Admin" active={activeNav === 'admin'} onClick={() => setActiveNav('admin')} />
        </div>
      </div>

      {/* 2. SECONDARY NAVIGATION (Sub-menu) - Only for Reports */}
      {activeNav === 'reports' && (
        <div className="w-60 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Reports</span>
              <Settings className="w-3 h-3" />
            </div>
            <div className="relative">
              <Search className="w-3 h-3 absolute left-2 top-2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reports" 
                className="w-full bg-slate-50 border border-slate-200 rounded pl-7 pr-2 py-1 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 py-2">
            <ReportMenuItem label="Reports snapshot" active={activeReport === 'snapshot'} onClick={() => setActiveReport('snapshot')} />
            <ReportMenuItem label="Realtime" active={activeReport === 'realtime'} onClick={() => setActiveReport('realtime')} icon={<Activity className="w-3 h-3 text-blue-500" />} />
            
            <div className="mt-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Life cycle</div>
            <ReportGroup label="Acquisition" open={true}>
              <ReportMenuItem label="Overview" indent />
              <ReportMenuItem label="User acquisition" indent />
              <ReportMenuItem label="Traffic acquisition" indent active={activeReport === 'acquisition'} onClick={() => setActiveReport('acquisition')} />
            </ReportGroup>
            
            <ReportGroup label="Engagement" open={true}>
              <ReportMenuItem label="Overview" indent />
              <ReportMenuItem label="Events" indent active={activeReport === 'engagement'} onClick={() => setActiveReport('engagement')} />
              <ReportMenuItem label="Conversions" indent />
              <ReportMenuItem label="Pages and screens" indent />
            </ReportGroup>

            <ReportGroup label="Monetization" open={false}>
              <ReportMenuItem label="Overview" indent />
              <ReportMenuItem label="Ecommerce purchases" indent />
            </ReportGroup>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-medium text-lg text-slate-800">
              {activeNav === 'home' && 'Home'}
              {activeNav === 'admin' && 'Admin'}
              {activeNav === 'reports' && (
                activeReport === 'acquisition' ? 'Traffic acquisition' : 
                activeReport === 'engagement' ? 'Events' : 
                activeReport === 'realtime' ? 'Realtime' : 'Reports snapshot'
              )}
            </h2>
            {activeNav === 'reports' && activeReport !== 'realtime' && (
              <div className="ml-4 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 border border-slate-200 flex items-center gap-1 cursor-pointer hover:bg-slate-200">
                <span>Add comparison</span>
                <Plus className="w-3 h-3" />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Demo Link Banner */}
            <a 
              href="https://analytics.google.com/analytics/web/?utm_source=demoaccount&utm_medium=demoaccount&utm_campaign=demoaccount#/a54516992p213025502/reports/intelligenthome" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold hover:bg-blue-100 transition-colors border border-blue-100"
            >
              <span>Use Real Demo Account</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {activeNav === 'reports' && activeReport !== 'realtime' && (
               <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 shadow-sm cursor-pointer hover:border-slate-300">
                 <span>Last 28 days</span>
                 <ChevronDown className="w-3 h-3" />
               </div>
            )}
          </div>
        </div>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* VIEW: HOME */}
          {activeNav === 'home' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Realtime Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Users in last 30 minutes</h3>
                    <div className="text-4xl font-bold text-slate-800 mt-2">142</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium mt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>4.2%</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <div className="space-y-3 mt-6">
                  <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[65%]" />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>United States</span>
                    <span>65%</span>
                  </div>
                   <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[12%]" />
                  </div>
                   <div className="flex justify-between text-xs text-slate-500">
                    <span>India</span>
                    <span>12%</span>
                  </div>
                </div>
                <button 
                  onClick={() => { setActiveNav('reports'); setActiveReport('realtime'); }}
                  className="mt-6 text-xs text-blue-600 font-medium hover:underline flex items-center gap-1"
                >
                  View Realtime reports <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Suggested for you</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center mb-2 shadow-sm border border-slate-100">
                        <Users className="w-4 h-4 text-blue-500" />
                      </div>
                      <h4 className="text-sm font-medium text-slate-800">Where do your new users come from?</h4>
                      <p className="text-xs text-slate-500 mt-1">View traffic acquisition report</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 cursor-pointer transition-colors">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center mb-2 shadow-sm border border-slate-100">
                        <ShoppingCart className="w-4 h-4 text-green-500" />
                      </div>
                      <h4 className="text-sm font-medium text-slate-800">How much revenue are you generating?</h4>
                      <p className="text-xs text-slate-500 mt-1">View ecommerce purchases</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: REPORTS (Acquisition) */}
          {activeNav === 'reports' && activeReport === 'acquisition' && (
            <div className="space-y-6">
              {/* Chart Placeholder */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="text-sm font-medium text-slate-700 mb-6">Users by Session default channel group over time</h3>
                 <div className="h-48 flex items-end gap-2 px-4 border-b border-slate-100 pb-2">
                    {[40, 60, 45, 80, 55, 70, 90, 65, 50, 75, 85, 60].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                           Users: {h * 10}
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between text-xs text-slate-400 mt-2">
                   <span>Aug 1</span>
                   <span>Aug 15</span>
                   <span>Aug 28</span>
                 </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3 border-b border-slate-200">Session default channel group</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Users</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Sessions</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Engaged sessions</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Conversions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {acquisitionData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 text-blue-600 font-medium cursor-pointer hover:underline">{row.channel}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.users}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.sessions}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.engaged}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.conversions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: REPORTS (Engagement/Events) */}
          {activeNav === 'reports' && activeReport === 'engagement' && (
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                   <h3 className="text-sm font-medium text-slate-700">Event count by Event name</h3>
                   <Search className="w-4 h-4 text-slate-400" />
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3 border-b border-slate-200">Event name</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Event count</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">Total users</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {eventData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 text-blue-600 font-medium cursor-pointer hover:underline">{row.name}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.count}</td>
                        <td className="px-6 py-3 text-slate-700 text-right">{row.users}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          )}

           {/* VIEW: ADMIN */}
           {activeNav === 'admin' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Admin</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Property Settings */}
                 <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-700">
                       Property Settings
                    </div>
                    <div className="divide-y divide-slate-100">
                       <AdminItem label="Property details" />
                       <AdminItem label="Data streams" active />
                       <AdminItem label="Events" />
                       <AdminItem label="Conversions" />
                       <AdminItem label="Audiences" />
                    </div>
                 </div>

                 {/* Account Settings */}
                 <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden opacity-75">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 font-medium text-sm text-slate-700">
                       Account Settings
                    </div>
                    <div className="divide-y divide-slate-100">
                       <AdminItem label="Account details" />
                       <AdminItem label="User management" />
                       <AdminItem label="Filters" />
                       <AdminItem label="Change history" />
                    </div>
                 </div>
              </div>

              {/* Detail View Mock */}
              <div className="mt-8 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                 <h3 className="font-medium text-slate-800 mb-4">Data Streams</h3>
                 <div className="border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                          <Activity className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="font-medium text-sm text-slate-900">GA4 Micro-Tutor Web</div>
                          <div className="text-xs text-slate-500">Web • Stream ID: 29841029</div>
                       </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                 </div>
              </div>
            </div>
          )}

           {/* VIEW: NOT IMPLEMENTED PLACEHOLDER */}
           {(activeNav === 'explore' || activeReport === 'realtime' || activeReport === 'snapshot') && (
             <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <Info className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-700">Simulation View</h3>
                <p className="text-slate-500 max-w-sm mt-2">
                   This part of the interface is a simplified visual placeholder. Try clicking on <b>Reports &gt; Acquisition</b> or <b>Admin</b> for more interactive elements.
                </p>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const NavIcon = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-full py-2 relative group focus:outline-none ${active ? 'text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />}
    <Icon className={`w-5 h-5 ${active ? 'fill-blue-100' : ''}`} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const ReportMenuItem = ({ label, active, onClick, indent, icon }: { label: string, active?: boolean, onClick?: () => void, indent?: boolean, icon?: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left flex items-center gap-2 py-2 pr-4 text-xs font-medium transition-colors ${indent ? 'pl-8' : 'pl-4'} ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
  >
    {icon}
    {label}
  </button>
);

const ReportGroup = ({ label, children, open }: { label: string, children?: React.ReactNode, open: boolean }) => (
  <div className="mb-1">
    <div className={`flex items-center justify-between px-4 py-2 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-50`}>
      <span>{label}</span>
      <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-0' : '-rotate-90'}`} />
    </div>
    {open && <div>{children}</div>}
  </div>
);

const AdminItem = ({ label, active }: { label: string, active?: boolean }) => (
  <div className={`px-4 py-3 text-sm flex items-center justify-between cursor-pointer hover:bg-slate-50 ${active ? 'bg-blue-50/50 text-blue-700' : 'text-slate-600'}`}>
     <span>{label}</span>
     <ChevronRight className="w-3 h-3 text-slate-300" />
  </div>
);

export default GA4Simulator;