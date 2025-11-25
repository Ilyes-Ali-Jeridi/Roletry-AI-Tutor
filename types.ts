export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string; // This now holds the JSON string
  timestamp: number;
}

export interface LearningModule {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

// --- NEW SCHEMA TYPES ---

export interface UIState {
  current_module_id: string;
  current_step: number;
  screen_title: string;
  show_sidebar: boolean;
  show_practice_panel: boolean;
}

export interface ContentBlock {
  type: 'lesson' | 'example' | 'practice' | 'check_question' | 'visual';
  title?: string;
  text?: string;
  choices?: string[]; // For check_question
  // For visual blocks
  visualType?: 'event_vs_session' | 'parameter_table' | 'ua_vs_ga4' | 'metric_comparison' | 'ga4_report' | 'comparison_table' | 'status_list' | 'funnel_chart' | 'role_details';
  data?: any;
}

export interface NextAction {
  id: string;
  label: string;
  action_type: 'answer_choice' | 'free_text_answer' | 'go_to_module' | 'retry' | 'next_step' | 'next_module' | 'switch_mode';
  payload?: any;
}

export interface Progress {
  module_completion: Record<string, number>;
  overall_completion: number;
  last_user_answer_correct: boolean | null;
}

export interface LessonResponse {
  ui_state: UIState;
  content_blocks: ContentBlock[];
  next_actions: NextAction[];
  progress: Progress;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}