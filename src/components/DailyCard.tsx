
import React, { useState, useEffect } from 'react';
import { DAILY_TASKS, MICRO_HONESTY_SCRIPTS } from '../constants';
import type { DayEntry } from '../types';
import { getDailyAIFeedback } from '../services/geminiService';

interface DailyCardProps {
  day: number;
  onComplete: (inputData: Record<string, any>) => void;
  theme: { bg: string; text: string; accent: string, border: string };
  previousFear: string; // From Day 2
}

const DailyCard: React.FC<DailyCardProps> = ({ day, onComplete, theme, previousFear }) => {
  const task = DAILY_TASKS[day - 1];
  const [input, setInput] = useState<Record<string, any>>({});
  const [aiFeedback, setAiFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset state when day changes
    setInput({});
    setAiFeedback('');
  }, [day]);

  const handleInputChange = (field: string, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const isComplete = () => {
    switch (day) {
      case 1: return input.thought1 && input.thought2 && input.thought3;
      case 2: return input.fear;
      case 3: return input.q1 && input.q2 && input.q3;
      case 4: return input.scriptResponse;
      case 5: return input.action;
      case 6: return input.story && input.story.length <= 200;
      case 7: return input.discovery;
      default: return false;
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    const feedbackInput = Object.values(input).join(' ');
    const feedback = await getDailyAIFeedback(day, feedbackInput);
    setAiFeedback(feedback);
    setIsLoading(false);
    // Wait for user to read feedback before completing
  };

  const renderInputs = () => {
    switch (day) {
      case 1:
        return (
          <>
            {[1, 2, 3].map(i => (
              <input key={i} type="text" placeholder={`片段 ${i}`} className={`w-full p-2 border ${theme.border} rounded-md mb-2 bg-white`} value={input[`thought${i}`] || ''} onChange={e => handleInputChange(`thought${i}`, e.target.value)} />
            ))}
            <div className="mt-2">
              <p className="text-sm">情境標籤：</p>
              {['工作', '關係', '創作'].map(tag => (
                <label key={tag} className="inline-flex items-center mr-4">
                  <input type="checkbox" className="form-checkbox" onChange={e => handleInputChange(tag, e.target.checked)} />
                  <span className="ml-2">{tag}</span>
                </label>
              ))}
            </div>
          </>
        );
      case 2:
        return <textarea placeholder="我害怕被看成..." className={`w-full p-2 border ${theme.border} rounded-md h-24 bg-white`} value={input.fear || ''} onChange={e => handleInputChange('fear', e.target.value)} />;
      case 3:
        return (
          <>
            <p className="font-bold">1. 我害怕的事，真的會發生嗎？</p>
            <input className={`w-full p-2 border ${theme.border} rounded-md mb-3 bg-white`} placeholder="簡答..." value={input.q1 || ''} onChange={e => handleInputChange('q1', e.target.value)} />
            <p className="font-bold">2. 如果發生了，我會失去什麼？</p>
            <input className={`w-full p-2 border ${theme.border} rounded-md mb-3 bg-white`} placeholder="簡答..." value={input.q2 || ''} onChange={e => handleInputChange('q2', e.target.value)} />
            <p className="font-bold">3. 這個失去，有多大程度是我的想像？</p>
            <input className={`w-full p-2 border ${theme.border} rounded-md mb-3 bg-white`} placeholder="簡答..." value={input.q3 || ''} onChange={e => handleInputChange('q3', e.target.value)} />
          </>
        );
      case 4:
        return (
          <>
            {MICRO_HONESTY_SCRIPTS.map(script => (
              <div key={script.id} className="mb-2 p-2 border border-dashed rounded-md bg-white/50">
                <p className="text-sm">{script.text}</p>
              </div>
            ))}
            <textarea placeholder="記錄對方的回應..." className={`w-full p-2 border ${theme.border} rounded-md mt-2 h-24 bg-white`} value={input.scriptResponse || ''} onChange={e => handleInputChange('scriptResponse', e.target.value)} />
          </>
        );
      case 5:
        return (
           <>
             <p className="text-sm text-gray-600 mb-2">你原本的害怕：「{previousFear}」</p>
             <textarea placeholder="我願意..." className={`w-full p-2 border ${theme.border} rounded-md h-24 bg-white`} value={input.action || ''} onChange={e => handleInputChange('action', e.target.value)} />
           </>
        );
       case 6:
        return (
            <>
                <textarea placeholder="今天我說了真話，然後..." className={`w-full p-2 border ${theme.border} rounded-md h-40 bg-white`} value={input.story || ''} onChange={e => handleInputChange('story', e.target.value)} />
                <p className={`text-right text-sm ${input.story?.length > 200 ? 'text-red-500' : ''}`}>{input.story?.length || 0}/200</p>
            </>
        );
      case 7:
        return <textarea placeholder="我最驚訝的發現是..." className={`w-full p-2 border ${theme.border} rounded-md h-24 bg-white`} value={input.discovery || ''} onChange={e => handleInputChange('discovery', e.target.value)} />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${theme.bg} ${theme.text} tracking-wide-plus`}>
      <h2 className="text-2xl font-bold">{`Day ${task.day}`}</h2>
      <h3 className="text-xl mb-4">{task.title}</h3>
      <div className={`w-16 h-1 ${theme.accent} mb-4`}></div>
      <p className="mb-2 font-semibold">{task.prompt}</p>
      <p className="text-sm mb-4 opacity-70">{task.instruction}</p>

      <div className="space-y-4">
        {renderInputs()}
      </div>

      {aiFeedback && (
        <div className="mt-4 p-3 bg-black/10 rounded-lg italic">
          <p className="font-semibold text-sm">教練的回饋：</p>
          <p>{aiFeedback}</p>
          <button onClick={() => onComplete(input)} className={`w-full mt-3 p-2 rounded-lg ${theme.accent} text-white font-bold hover:opacity-90 transition-opacity`}>
            完成本日任務
          </button>
        </div>
      )}
      
      {!aiFeedback && (
        <button
          onClick={handleComplete}
          disabled={!isComplete() || isLoading}
          className={`w-full mt-6 p-3 rounded-lg ${theme.accent} text-white font-bold hover:opacity-90 transition-opacity disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          {isLoading ? '分析中...' : `完成 Day ${day} 練習`}
        </button>
      )}
    </div>
  );
};

export default DailyCard;
