
export enum MoodColor {
  GrayBlue = 'gray-blue',
  MoonWhite = 'moon-white',
  Amber = 'amber',
  LightGold = 'light-gold',
}

export interface Cycle {
  cycle_id: string;
  user_id: string;
  topic: string;
  mood_color: MoodColor;
  started_at: string;
  completed_at: string | null;
  current_day: number;
}

export interface DayEntry {
  entry_id: string;
  cycle_id: string;
  day_index: number;
  raw_input: Record<string, any>;
  created_at: string;
  ai_feedback?: string;
}

export interface RadarData {
  observe: number;
  verify: number;
  refine: number;
  act: number;
  integrate: number;
}

export interface Insight {
  cycle_id: string;
  radar: RadarData;
  keywords: string[];
  weekly_summary: string;
}

export type View = 'ONBOARDING' | 'HOME' | 'JOURNAL' | 'INSIGHTS' | 'SETTINGS';
