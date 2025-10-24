
import { GoogleGenAI, Type } from "@google/genai";
import type { DayEntry, Insight, RadarData } from '../types';

// FIX: Refactored to align with API key guidelines. The API key must be sourced directly from process.env.API_KEY.
const getAIClient = () => {
    const apiKey = process.env.API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';
    return new GoogleGenAI({ apiKey });
};


export const getDailyAIFeedback = async (dayIndex: number, userInput: string): Promise<string> => {
  if (!userInput.trim()) return "請先輸入你的想法，我才能提供回饋。";
  
  const ai = getAIClient();
  const prompt = `
    系統：你是「地藏語氣」的理性教練。輸出需短、具體、可執行，每次不超過 80 字，並對應八階步驟的語氣。
    使用者的本日任務 index: ${dayIndex}
    使用者的輸入: "${userInput}"
    
    根據對應的八階步驟語氣，生成你的回饋。
    
    八階步驟語氣參考:
    D1（觀察）: 「我看到你在＿＿＿情境會用『我覺得…』打頭，這通常在保護自己。今天先記錄，不要評價。」
    D2（定義）: 「把害怕說成一句話就好：『我害怕被看成＿＿＿。』簡短、誠實、不要包裝。」
    D3（拆解）: 「問自己三次：會真的發生嗎？失去什麼？那個損失是想像嗎？在空格後簡答三行。」
    D4（驗證）: 「選一個安全的人，用以下句子 A/B/C 任一，請對方回 1 句感受。截圖或抄錄下來。」
    D5（修正）: 「把『我害怕＿＿』改寫成行動句：『我願意今天在＿＿情境，說＿＿＿。』只要一句。」
    D6（生成）: 「寫 100–200 字：今天我說了真話，然後＿＿＿。不求完美，求真實。」
    D7（整合）: 「你一週裡最驚訝的發現是＿＿＿。我會幫你整理摘要與雷達。」
  `;
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text || '感謝你的分享,請繼續保持真誠。';
  } catch (error) {
    console.error("Error getting daily AI feedback:", error);
    return "抱歉，分析時發生錯誤。請稍後再試。";
  }
};


export const generateWeeklyInsight = async (cycleId: string, entries: DayEntry[]): Promise<Insight> => {
    const ai = getAIClient();
    const formattedEntries = entries.map(e => `Day ${e.day_index}: ${JSON.stringify(e.raw_input)}`).join('\n');

    const prompt = `
        You are a compassionate and insightful psychoanalyst named 'Ksitigarbha Coach'. Your tone is rational, supportive, and concise.
        A user has completed a 7-day self-awareness journey. Their entries are provided below.
        Your task is to analyze these entries and generate a final insight report in JSON format.
        
        User's 7-Day Entries:
        ${formattedEntries}

        Based on the user's journey, perform the following actions:
        1.  **Generate a 'weekly_summary'**: A brief, encouraging summary (max 120 words in Traditional Chinese) of their progress, acknowledging their courage and key breakthrough.
        2.  **Extract 'keywords'**: Identify 2-3 key emotional themes or recurring concepts (in Traditional Chinese) from their entries.
        3.  **Create 'radar' scores**: Rate the user's engagement on a scale of 0 to 100 for each of the five dimensions:
            - observe: How well did they notice their internal thoughts and external triggers (Day 1, 3)?
            - verify: How much courage did they show in testing their fears with others (Day 4)?
            - refine: How effectively did they transform a fear into a positive action (Day 5)?
            - act: How well did they follow through with their intended action (Day 6)?
            - integrate: How profound was their final reflection and overall self-awareness gain (Day 7)?
            Base your scores on the depth, honesty, and effort reflected in their writing. Be realistic; not everyone gets 100. A typical range is 40-85.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        weekly_summary: { type: Type.STRING },
                        keywords: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        radar: {
                            type: Type.OBJECT,
                            properties: {
                                observe: { type: Type.INTEGER },
                                verify: { type: Type.INTEGER },
                                refine: { type: Type.INTEGER },
                                act: { type: Type.INTEGER },
                                integrate: { type: Type.INTEGER }
                            },
                             required: ["observe", "verify", "refine", "act", "integrate"]
                        }
                    },
                    required: ["weekly_summary", "keywords", "radar"]
                }
            }
        });
        
        const jsonText = response.text?.trim() || '{}';
        const parsedJson = JSON.parse(jsonText);

        return {
            cycle_id: cycleId,
            ...parsedJson
        };
    } catch (error) {
        console.error("Error generating weekly insight:", error);
        // Return a fallback insight object on error
        return {
            cycle_id: cycleId,
            weekly_summary: "在這次的旅程中，你勇敢地探索了內心。即使過程充滿挑戰，你的每一次記錄都算數。這份報告是個開始，真正的改變發生在每天的微小選擇中。",
            keywords: ["自我覺察", "勇氣"],
            radar: { observe: 65, verify: 50, refine: 55, act: 45, integrate: 60 },
        };
    }
};