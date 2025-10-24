import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MOOD_THEMES, DAILY_TASKS, WEEKLY_REPORT_COVER_QUOTE } from './constants';
import { MoodColor, type View, type Cycle, type DayEntry, type Insight } from './types';
import DailyCard from './components/DailyCard';
import BottomNav from './components/BottomNav';
import InsightRadarChart from './components/RadarChart';
import { generateWeeklyInsight } from './services/geminiService';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const OnboardingView: React.FC<{ onStart: (topic: string, color: MoodColor) => void }> = ({ onStart }) => {
  const [topic, setTopic] = useState('');
  const [color, setColor] = useState<MoodColor | null>(null);

  const handleStart = () => {
    if (topic && color) {
      onStart(topic, color);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800 tracking-wide">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            Mask Off
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            一個為期 7 天的結構化自我覺察旅程<br/>
            我們不「拿掉」面具,而是讓它變透明。
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          <p className="text-lg font-medium text-gray-700">這週,你最想誠實面對的事是什麼?</p>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-center focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
            placeholder="一句話就好"
          />
        </div>

        <div className="space-y-4 pt-2">
          <p className="text-base text-gray-700">選一個最能代表此刻心情的顏色:</p>
          <div className="flex justify-center gap-4">
            {Object.entries(MOOD_THEMES).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setColor(key as MoodColor)}
                className={`w-16 h-16 rounded-full transition-all duration-300 transform hover:scale-110 ${theme.accent} ${
                  color === key ? 'ring-4 ring-offset-2 ring-amber-400 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                aria-label={`選擇 ${key} 色調`}
              />
            ))}
          </div>
        </div>

        <blockquote className="text-sm text-gray-500 italic pt-4 border-l-4 border-amber-300 pl-4 text-left">
          "透明不是裸露,是允許自己被看見。"
        </blockquote>

        <button
          onClick={handleStart}
          disabled={!topic || !color}
          className="w-full p-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-bold rounded-lg shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          開啟 7 日旅程
        </button>
      </div>
    </div>
  );
};

const HomeView: React.FC<{ cycle: Cycle, entries: DayEntry[], completeDay: (entry: DayEntry) => void }> = ({ cycle, entries, completeDay }) => {
    const theme = MOOD_THEMES[cycle.mood_color];

    const handleComplete = (inputData: Record<string, any>) => {
        const newEntry: DayEntry = {
            entry_id: uuidv4(),
            cycle_id: cycle.cycle_id,
            day_index: cycle.current_day,
            raw_input: inputData,
            created_at: new Date().toISOString(),
        };
        completeDay(newEntry);
    };

    const day2Entry = entries.find(e => e.day_index === 2);
    const previousFear = day2Entry ? day2Entry.raw_input.fear : "你尚未定義害怕的事";

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{cycle.topic}</h1>
                    <p className="text-sm text-gray-500 mt-1">你的透明之旅</p>
                </div>
                <div className="text-right">
                    <p className="font-bold text-2xl text-amber-600">{`${Math.round((cycle.current_day - 1) / 7 * 100)}%`}</p>
                    <p className="text-sm text-gray-500">{`Day ${cycle.current_day} / 7`}</p>
                </div>
            </div>
            <DailyCard day={cycle.current_day} onComplete={handleComplete} theme={theme} previousFear={previousFear} />
        </div>
    );
};

const JournalView: React.FC<{ entries: DayEntry[], cycle: Cycle }> = ({ entries, cycle }) => {
    const theme = MOOD_THEMES[cycle.mood_color];
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">我的日誌</h1>
            <div className="space-y-4">
                {entries.sort((a, b) => a.day_index - b.day_index).map(entry => (
                    <div key={entry.entry_id} className={`p-5 rounded-xl shadow-md ${theme.bg} border-l-4 ${theme.border} transition-all hover:shadow-lg`}>
                        <h2 className={`font-bold text-lg ${theme.text} mb-2`}>
                            {`Day ${entry.day_index}: ${DAILY_TASKS[entry.day_index - 1].title}`}
                        </h2>
                        <div className={`mt-3 ${theme.text} space-y-2`}>
                            {Object.entries(entry.raw_input).map(([key, value]) => (
                                <p key={key} className="text-sm">
                                    <span className="font-semibold">{key}:</span> {String(value)}
                                </p>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-200">
                            {new Date(entry.created_at).toLocaleString('zh-TW', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const InsightsView: React.FC<{ cycle: Cycle | null; insight: Insight | null, onGenerate: () => void, isLoading: boolean }> = ({ cycle, insight, onGenerate, isLoading }) => {
    if (!cycle) return null;
    const theme = MOOD_THEMES[cycle.mood_color];

    if (cycle.completed_at === null) {
        return <div className="p-6 text-center max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
            <div className="space-y-4">
                <div className="text-6xl mb-4">🎯</div>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">洞察報告</h1>
                <p className="text-gray-600 leading-relaxed">
                    完成全部 7 天的旅程後,將會生成你的專屬透明度報告。
                </p>
                <div className="mt-6">
                    <div className="inline-block px-6 py-3 bg-amber-100 rounded-full">
                        <p className="text-amber-700 font-semibold">目前進度: Day {cycle.current_day}/7</p>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">透明週報</h1>
            {!insight ? (
                <div className="text-center py-12">
                    <button 
                        onClick={onGenerate} 
                        disabled={isLoading} 
                        className={`px-8 py-4 rounded-lg ${theme.accent} text-white font-bold disabled:bg-gray-400 transition-all hover:shadow-lg hover:scale-105 active:scale-95`}
                    >
                        {isLoading ? "生成報告中..." : "生成我的洞察報告"}
                    </button>
                </div>
            ) : (
                <div className={`p-8 rounded-2xl shadow-xl ${theme.bg} ${theme.text} space-y-6`}>
                    <blockquote className="text-center italic text-lg border-l-4 border-amber-400 pl-4 py-2">
                        "{WEEKLY_REPORT_COVER_QUOTE}"
                    </blockquote>
                    <div className="space-y-3">
                        <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
                            <span>📝</span> 一週總結
                        </h2>
                        <p className="leading-relaxed">{insight.weekly_summary}</p>
                    </div>
                    <div className="space-y-3">
                        <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
                            <span>🏷️</span> 關鍵詞
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {insight.keywords.map(kw => (
                                <span key={kw} className={`px-4 py-2 rounded-full text-sm ${theme.accent} text-white font-medium shadow-md`}>
                                    {kw}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="font-bold text-xl mb-3 text-center flex items-center justify-center gap-2">
                            <span>📊</span> 面具透明度雷達圖
                        </h2>
                        <InsightRadarChart data={insight.radar} color={theme.accent.replace('bg-', '#')} />
                    </div>
                </div>
            )}
        </div>
    );
};

const SettingsView: React.FC = () => {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">設定</h1>
            <div className="space-y-4">
                <div className="p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all">
                    <h3 className="font-semibold text-gray-700 mb-1">⏰ 提醒時間</h3>
                    <p className="text-gray-600">21:00 (Asia/Taipei)</p>
                </div>
                <div className="p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all">
                    <h3 className="font-semibold text-gray-700 mb-1">🌐 語言</h3>
                    <p className="text-gray-600">繁體中文</p>
                </div>
                <div className="p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all cursor-pointer">
                    <h3 className="font-semibold text-gray-700 mb-1">📥 資料匯出</h3>
                    <p className="text-sm text-gray-500">匯出你的旅程記錄</p>
                </div>
                <div className="p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-amber-300 transition-all cursor-pointer">
                    <h3 className="font-semibold text-gray-700 mb-1">🔒 隱私權政策</h3>
                    <p className="text-sm text-gray-500">了解我們如何保護你的資料</p>
                </div>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('ONBOARDING');
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [insight, setInsight] = useState<Insight | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedCycle = localStorage.getItem('maskoff_cycle');
      const savedEntries = localStorage.getItem('maskoff_entries');
      const savedInsight = localStorage.getItem('maskoff_insight');
      
      if (savedCycle) {
        const parsedCycle = JSON.parse(savedCycle);
        setCycle(parsedCycle);
        setEntries(savedEntries ? JSON.parse(savedEntries) : []);
        setInsight(savedInsight ? JSON.parse(savedInsight) : null);
        setCurrentView('HOME');
         if (parsedCycle.completed_at) {
            setCurrentView('INSIGHTS');
        }
      }
    } catch (error) {
        console.error("Failed to load data from localStorage", error);
        localStorage.clear();
    }
  }, []);

  const startCycle = (topic: string, color: MoodColor) => {
    const newCycle: Cycle = {
      cycle_id: uuidv4(),
      user_id: 'local_user',
      topic,
      mood_color: color,
      started_at: new Date().toISOString(),
      completed_at: null,
      current_day: 1,
    };
    setCycle(newCycle);
    setEntries([]);
    setInsight(null);
    localStorage.setItem('maskoff_cycle', JSON.stringify(newCycle));
    localStorage.removeItem('maskoff_entries');
    localStorage.removeItem('maskoff_insight');
    setCurrentView('HOME');
  };
  
  const completeDay = (entry: DayEntry) => {
    if (!cycle) return;
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    localStorage.setItem('maskoff_entries', JSON.stringify(newEntries));

    if (cycle.current_day < 7) {
      const updatedCycle = { ...cycle, current_day: cycle.current_day + 1 };
      setCycle(updatedCycle);
      localStorage.setItem('maskoff_cycle', JSON.stringify(updatedCycle));
    } else {
      const completedCycle = { ...cycle, completed_at: new Date().toISOString() };
      setCycle(completedCycle);
      localStorage.setItem('maskoff_cycle', JSON.stringify(completedCycle));
      setCurrentView('INSIGHTS');
    }
  };

  const handleGenerateInsight = useCallback(async () => {
    if (!cycle) return;
    setIsLoading(true);
    const generatedInsight = await generateWeeklyInsight(cycle.cycle_id, entries);
    setInsight(generatedInsight);
    localStorage.setItem('maskoff_insight', JSON.stringify(generatedInsight));
    setIsLoading(false);
  }, [cycle, entries]);

  const renderView = () => {
    if (!cycle) {
      return <OnboardingView onStart={startCycle} />;
    }

    switch (currentView) {
      case 'HOME':
        return cycle.completed_at 
          ? <InsightsView cycle={cycle} insight={insight} onGenerate={handleGenerateInsight} isLoading={isLoading} />
          : <HomeView cycle={cycle} entries={entries} completeDay={completeDay} />;
      case 'JOURNAL':
        return <JournalView entries={entries} cycle={cycle} />;
      case 'INSIGHTS':
        return <InsightsView cycle={cycle} insight={insight} onGenerate={handleGenerateInsight} isLoading={isLoading} />;
      case 'SETTINGS':
        return <SettingsView />;
      default:
        return <OnboardingView onStart={startCycle} />;
    }
  };
  
  const theme = cycle ? MOOD_THEMES[cycle.mood_color] : MOOD_THEMES[MoodColor.MoonWhite];

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className={`font-sans min-h-screen ${theme.bg} text-gray-800 pb-20`}>
            <main>
              {renderView()}
            </main>
            <BottomNav currentView={currentView} setView={setCurrentView} cycleStarted={!!cycle}/>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

