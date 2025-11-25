import React, { useMemo } from 'react';
import { Message, LessonResponse, ContentBlock, NextAction } from '../types';
import { Bot, User, LayoutTemplate, Activity, ArrowRightLeft, TrendingUp, Users, Clock, Filter, CheckCircle2, XCircle, Lightbulb, MousePointerClick, ListChecks, ArrowDown, Briefcase, Ruler, Wrench, PlayCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  onAction?: (action: NextAction) => void;
}

// --- VISUAL COMPONENTS ---

const EventVsSessionVisual = () => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 my-2 grid grid-cols-2 gap-4">
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col items-center text-center opacity-75">
      <h4 className="font-bold text-slate-500 text-[10px] uppercase tracking-wider mb-1">Universal Analytics</h4>
      <div className="flex gap-1 mb-2">
        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-xs font-bold text-blue-600">S1</div>
        <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-xs font-bold text-blue-600">S2</div>
      </div>
      <p className="text-[10px] text-slate-400">Session container</p>
    </div>
    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 flex flex-col items-center text-center relative">
      <div className="absolute -top-2 bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">GA4</div>
      <h4 className="font-bold text-orange-700 text-[10px] uppercase tracking-wider mb-1">Event Based</h4>
      <div className="flex gap-1 flex-wrap justify-center mb-2">
        <div className="w-6 h-6 bg-white border border-orange-200 rounded-full flex items-center justify-center shadow-sm">
           <Activity className="w-3 h-3 text-orange-500" />
        </div>
        <div className="w-6 h-6 bg-white border border-orange-200 rounded-full flex items-center justify-center shadow-sm">
           <MousePointerClick className="w-3 h-3 text-orange-500" />
        </div>
        <div className="w-6 h-6 bg-white border border-orange-200 rounded-full flex items-center justify-center shadow-sm">
           <Activity className="w-3 h-3 text-orange-500" />
        </div>
      </div>
      <p className="text-[10px] text-orange-600 font-medium">Stream of events</p>
    </div>
  </div>
);

const MetricComparisonVisual = ({ data }: { data: any }) => (
  <div className="my-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
    <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between">
      <span className="font-bold text-slate-700 text-xs uppercase tracking-wide">{data?.metric || 'Metric'}</span>
      <ArrowRightLeft className="w-3 h-3 text-slate-400" />
    </div>
    <div className="grid grid-cols-2 divide-x divide-slate-100">
      <div className="p-3 flex flex-col items-center text-center">
        <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">UA (Old)</span>
        <span className="text-sm font-semibold text-slate-600">{data?.ua || '-'}</span>
      </div>
      <div className="p-3 flex flex-col items-center text-center bg-orange-50/30">
        <span className="text-[9px] font-bold text-orange-500 uppercase mb-1">GA4 (New)</span>
        <span className="text-sm font-bold text-slate-900">{data?.ga4 || '-'}</span>
      </div>
    </div>
    {data?.insight && (
      <div className="bg-slate-800 p-2 text-center">
        <p className="text-[10px] text-slate-300">💡 {data.insight}</p>
      </div>
    )}
  </div>
);

const ComparisonTableVisual = ({ data }: { data: any }) => {
  // Determine headers: use provided headers or default to legacy UA/GA4 columns
  const headers = data?.headers || ["Feature", "Universal Analytics", "GA4"];
  // Check if rows are arrays (new format) or objects (legacy format)
  const rows = data?.rows || [];
  // Safety check if rows exists and has items
  const isArrayRow = rows.length > 0 && Array.isArray(rows[0]);

  return (
    <div className="my-2 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left min-w-[300px]">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              {headers.map((h: string, i: number) => (
                <th key={i} className={`px-3 py-2 ${i === headers.length - 1 ? 'font-bold text-orange-600' : 'font-bold'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {rows.map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                {isArrayRow ? (
                  row.map((cell: string, cIdx: number) => (
                    <td key={cIdx} className={`px-3 py-2 text-slate-700 ${cIdx === 0 ? 'font-medium' : ''}`}>
                      {cell}
                    </td>
                  ))
                ) : (
                  // Legacy fallback
                  <>
                    <td className="px-3 py-2 font-medium text-slate-700">{row.feature}</td>
                    <td className="px-3 py-2 text-slate-500">{row.ua}</td>
                    <td className="px-3 py-2 text-slate-800 font-medium bg-orange-50/10">{row.ga4}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GA4ReportVisual = ({ data }: { data: any }) => (
  <div className="my-2 bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden max-w-xs mx-auto">
    <div className="bg-white border-b border-slate-100 p-2 flex justify-between items-center">
       <div className="flex items-center gap-2">
         <span className="text-xs font-bold text-slate-700">{data?.title || 'Report'}</span>
       </div>
    </div>
    <div className="p-3 space-y-3">
      {data?.metrics?.map((m: any, i: number) => (
        <div key={i} className="flex justify-between items-center">
           <div className="flex items-center gap-2">
             <div className="p-1 rounded bg-slate-100 text-slate-500">
                {m.icon === 'users' ? <Users className="w-3 h-3" /> : 
                 m.icon === 'activity' ? <Activity className="w-3 h-3" /> :
                 <TrendingUp className="w-3 h-3" />}
             </div>
             <span className="text-xs text-slate-500">{m.name}</span>
           </div>
           <div className="text-right">
             <span className="block text-sm font-bold text-slate-800">{m.value}</span>
             {m.change && (
               <span className={`text-[9px] ${m.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                 {m.change}
               </span>
             )}
           </div>
        </div>
      ))}
    </div>
  </div>
);

const StatusListVisual = ({ data }: { data: any }) => (
  <div className="my-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    {data?.title && (
      <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 font-bold text-xs text-slate-600">
        {data.title}
      </div>
    )}
    <div className="divide-y divide-slate-100">
      {data?.items?.map((item: any, i: number) => (
        <div key={i} className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-700">{item.label}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {item.status === 'checked' ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : item.status === 'pending' ? (
              <Clock className="w-4 h-4 text-amber-500" />
            ) : item.status === 'key_event' ? (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                 ★ Key Event
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 font-medium">{item.status}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FunnelChartVisual = ({ data }: { data: any }) => (
  <div className="my-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-4">
    {data?.title && (
      <h4 className="font-bold text-xs text-slate-600 mb-3 text-center uppercase tracking-wide">{data.title}</h4>
    )}
    <div className="space-y-2">
      {data?.steps?.map((step: any, i: number) => {
         // Simple visual calculation for bar width based on value relative to max
         const maxVal = Math.max(...(data.steps || []).map((s:any) => s.value || 0)) || 100;
         const widthPerc = Math.max(15, ((step.value || 0) / maxVal) * 100);
         
         return (
           <div key={i} className="relative">
              <div className="flex justify-between text-xs mb-1 px-1">
                <span className="font-medium text-slate-700">{step.label}</span>
                <span className="font-bold text-slate-900">{step.value}</span>
              </div>
              <div className="h-6 bg-slate-100 rounded-md overflow-hidden flex items-center">
                 <div 
                   className={`h-full ${step.highlight ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-slate-300'} transition-all duration-700`} 
                   style={{ width: `${widthPerc}%` }}
                 />
              </div>
              {i < (data.steps?.length || 0) - 1 && (
                 <div className="flex justify-center -mb-2 mt-1 opacity-20">
                    <ArrowDown className="w-3 h-3 text-slate-400" />
                 </div>
              )}
           </div>
         )
      })}
    </div>
  </div>
);

const RoleDetailsVisual = ({ data }: { data: any }) => (
  <div className="my-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="bg-slate-50 border-b border-slate-100 p-4">
      <div className="flex items-center gap-2 mb-1">
        <Briefcase className="w-5 h-5 text-purple-600" />
        <h3 className="font-bold text-slate-800">{data?.role || 'Role Details'}</h3>
      </div>
      <p className="text-xs text-slate-500">Role Deep Dive</p>
    </div>
    
    <div className="p-4 space-y-4">
      {/* Responsibilities */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ListChecks className="w-4 h-4 text-slate-400" />
          <h4 className="text-xs font-bold text-slate-700 uppercase">Responsibilities</h4>
        </div>
        <ul className="text-sm text-slate-600 space-y-1 pl-1">
          {data?.responsibilities?.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-slate-300 text-[10px] mt-1.5">•</span>
              {item}
            </li>
          ))}
          {!data?.responsibilities && <li className="text-xs text-slate-400 italic">No details available</li>}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Metrics */}
        <div className="bg-purple-50 rounded-lg p-3">
           <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-purple-500" />
            <h4 className="text-xs font-bold text-purple-700 uppercase">Metrics</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {data?.metrics?.map((item: string, i: number) => (
              <span key={i} className="text-[10px] bg-white border border-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        {/* Tools */}
        <div className="bg-slate-100 rounded-lg p-3">
           <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-4 h-4 text-slate-500" />
            <h4 className="text-xs font-bold text-slate-700 uppercase">Tools</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {data?.tools?.map((item: string, i: number) => (
              <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario */}
      {data?.scenario && (
        <div className="mt-2 pt-2 border-t border-slate-100">
           <div className="flex items-center gap-2 mb-1.5">
            <PlayCircle className="w-4 h-4 text-blue-500" />
            <h4 className="text-xs font-bold text-blue-600 uppercase">Day in the life</h4>
          </div>
          <p className="text-sm text-slate-600 italic leading-relaxed bg-blue-50/50 p-2 rounded-md border border-blue-100">
            "{data.scenario}"
          </p>
        </div>
      )}
    </div>
  </div>
);

// --- CONTENT BLOCK RENDERER ---

const BlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'lesson':
      return (
        <div className="mb-4 text-sm text-slate-700 leading-relaxed">
           {block.title && <h3 className="font-bold text-slate-900 mb-1">{block.title}</h3>}
           <p>{block.text}</p>
        </div>
      );
    case 'example':
      return (
        <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-blue-700 text-xs uppercase">Example</span>
          </div>
          <p className="text-slate-700 whitespace-pre-wrap">{block.text}</p>
        </div>
      );
    case 'practice':
    case 'check_question':
      return (
        <div className="mb-4 bg-slate-900 p-4 rounded-xl text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
             <CheckCircle2 className="w-4 h-4 text-green-400" />
             <span className="text-xs font-bold text-slate-300 uppercase">{block.title || 'Check your knowledge'}</span>
          </div>
          <p className="font-medium text-sm mb-2">{block.text}</p>
        </div>
      );
    case 'visual':
      return (
        <div className="mb-4">
          {block.visualType === 'event_vs_session' && <EventVsSessionVisual />}
          {block.visualType === 'metric_comparison' && <MetricComparisonVisual data={block.data || {}} />}
          {block.visualType === 'comparison_table' && <ComparisonTableVisual data={block.data || {}} />}
          {block.visualType === 'ga4_report' && <GA4ReportVisual data={block.data || {}} />}
          {block.visualType === 'status_list' && <StatusListVisual data={block.data || {}} />}
          {block.visualType === 'funnel_chart' && <FunnelChartVisual data={block.data || {}} />}
          {block.visualType === 'role_details' && <RoleDetailsVisual data={block.data || {}} />}
        </div>
      );
    default:
      return null;
  }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onAction }) => {
  const isUser = message.role === 'user';
  
  // Attempt to parse JSON response
  const lessonData: LessonResponse | null = useMemo(() => {
    if (isUser) return null;
    try {
      // Find the first '{' and last '}' to handle potential cleanup issues
      const start = message.text.indexOf('{');
      const end = message.text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
         return JSON.parse(message.text.substring(start, end + 1));
      }
      return null;
    } catch (e) {
      // JSON parse error - silently fail to fallback text
      return null;
    }
  }, [message.text, isUser]);

  // Fallback for simple text messages (Bot Q&A mode or errors)
  if (!lessonData && !isUser) {
    return (
      <div className="flex w-full justify-start mb-6">
        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
           {message.text.length > 0 ? message.text : <span className="italic text-slate-400">Thinking...</span>}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex w-full justify-end mb-6">
        <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-none shadow-sm text-sm font-medium max-w-[80%] whitespace-pre-wrap">
          {message.text}
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center ml-3 flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  // Render JSON Lesson Card (Interactive Mode)
  return (
    <div className="flex w-full justify-start mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-xl">
        
        {/* Header Info */}
        <div className="flex items-center gap-2 mb-2 ml-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-sm">
             <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {lessonData?.ui_state.screen_title || 'Learning Module'}
          </span>
          {lessonData?.progress?.last_user_answer_correct === true && (
             <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Correct!</span>
          )}
           {lessonData?.progress?.last_user_answer_correct === false && (
             <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">Try Again</span>
          )}
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-50">
            <div 
              className="h-full bg-orange-500 transition-all duration-1000" 
              style={{ width: `${lessonData?.progress.overall_completion || 5}%` }}
            />
          </div>

          <div className="p-6">
            {/* Render Blocks */}
            {lessonData?.content_blocks?.map((block, idx) => (
              <BlockRenderer key={idx} block={block} />
            ))}

            {/* Action Buttons */}
            {lessonData?.next_actions && lessonData.next_actions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 grid gap-2 sm:grid-cols-2">
                {lessonData.next_actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onAction?.(action)}
                    className={`
                      w-full py-3 px-4 rounded-xl text-sm font-bold transition-all
                      ${action.action_type === 'answer_choice' 
                        ? 'bg-slate-50 hover:bg-white border border-slate-200 hover:border-orange-500 hover:text-orange-600 hover:shadow-md text-slate-600' 
                        : action.action_type === 'switch_mode'
                        ? 'bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 hover:shadow-md'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 active:scale-95 sm:col-span-2'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;