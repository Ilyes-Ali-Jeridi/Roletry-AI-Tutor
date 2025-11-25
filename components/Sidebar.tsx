import React from 'react';
import { LEARNING_MODULES } from '../constants';
import { BarChart3, BookOpen, GraduationCap, LayoutDashboard, MessageCircleQuestion, TestTube2, Briefcase } from 'lucide-react';

interface SidebarProps {
  currentMode: 'lesson' | 'qa' | 'simulation';
  onModeChange: (mode: 'lesson' | 'qa' | 'simulation') => void;
  onModuleSelect: (moduleId: number | string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange, onModuleSelect }) => {
  return (
    <div className="hidden md:flex flex-col w-80 bg-slate-900 text-slate-100 h-screen border-r border-slate-800 shadow-xl font-sans">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-900/50">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-xl shadow-lg shadow-orange-900/20">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">GA4 Micro-Tutor</h1>
          <p className="text-xs text-slate-400 font-medium">Interactive Agent</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700">
        
        {/* MODE SELECTION */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
             <LayoutDashboard className="w-4 h-4 text-orange-500" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
               Learning Mode
             </h3>
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => onModeChange('lesson')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentMode === 'lesson' 
                  ? 'bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-500 border border-orange-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
               <BookOpen className="w-4 h-4" />
               Interactive Lessons
            </button>
            <button 
              onClick={() => onModeChange('qa')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentMode === 'qa' 
                  ? 'bg-gradient-to-r from-blue-500/20 to-blue-500/5 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
               <MessageCircleQuestion className="w-4 h-4" />
               Ask AI Tutor
            </button>
          </div>
        </div>

        {/* SIMULATION LAB */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-2">
             <TestTube2 className="w-4 h-4 text-green-500" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
               Practice Lab
             </h3>
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => onModeChange('simulation')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentMode === 'simulation' 
                  ? 'bg-gradient-to-r from-green-500/20 to-green-500/5 text-green-400 border border-green-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
               <BarChart3 className="w-4 h-4" />
               GA4 Simulator
            </button>
            <button 
              onClick={() => onModuleSelect('interview_prep')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-slate-400 hover:text-purple-300 hover:bg-slate-800 border border-transparent`}
            >
               <Briefcase className="w-4 h-4 text-purple-500" />
               Interview Prep
            </button>
          </div>
        </div>

        {/* MODULES LIST */}
        <div className={currentMode !== 'lesson' ? 'opacity-50 pointer-events-none grayscale transition-all' : 'transition-all'}>
          <div className="flex items-center gap-2 mb-4 px-2">
             <GraduationCap className="w-4 h-4 text-orange-500" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
               Learning Path
             </h3>
          </div>
          
          <div className="space-y-3">
            {LEARNING_MODULES.map((module) => (
              <button 
                key={module.id} 
                onClick={() => onModuleSelect(module.id)}
                className="w-full text-left group relative pl-4 border-l-2 border-slate-700 hover:border-orange-500 transition-all cursor-pointer focus:outline-none"
              >
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-orange-500 transition-colors opacity-0 group-hover:opacity-100" />
                
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono text-orange-500/80 bg-orange-500/10 px-1.5 rounded">MOD {module.id}</span>
                  <h4 className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">{module.title}</h4>
                </div>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors mb-2 leading-relaxed">{module.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-800/50 border-t border-slate-800">
        <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
          <BookOpen className="w-4 h-4 text-orange-500" />
          <span>Self-Paced Learning</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;