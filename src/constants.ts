
import { MoodColor } from './types';

export const MOOD_THEMES: Record<MoodColor, { bg: string; text: string; accent: string, border: string }> = {
  [MoodColor.GrayBlue]: { bg: 'bg-gray-blue-light', text: 'text-gray-blue-dark', accent: 'bg-gray-blue', border: 'border-gray-blue' },
  [MoodColor.MoonWhite]: { bg: 'bg-moon-white', text: 'text-moon-white-text', accent: 'bg-moon-white-dark', border: 'border-moon-white-dark' },
  [MoodColor.Amber]: { bg: 'bg-amber-light', text: 'text-amber-text', accent: 'bg-amber', border: 'border-amber'},
  [MoodColor.LightGold]: { bg: 'bg-light-gold-light', text: 'text-light-gold-dark', accent: 'bg-light-gold', border: 'border-light-gold'},
};

export const DAILY_TASKS = [
  {
    day: 1,
    title: "観察｜Observation",
    prompt: "記錄 3 個讓你脫口而出「我覺得 / 我認為...」的瞬間。",
    instruction: "不用分析，只要像個記者般記下事實。",
    ai_prompt_prefix: "我看到你在＿＿＿情境會用『我覺得…』打頭，這通常在保護自己。今天先記錄，不要評價。",
  },
  {
    day: 2,
    title: "定義｜Definition",
    prompt: "寫一句話總結：「我害怕被看成...」",
    instruction: "一句話就好，越直接，力量越大。",
    ai_prompt_prefix: "把害怕說成一句話就好：『我害怕被看成＿＿＿。』簡短、誠實、不要包裝。",
  },
  {
    day: 3,
    title: "拆解｜Deconstruction",
    prompt: "針對昨天的害怕，誠實回答這三個問題：",
    instruction: "感受是主觀的，但事實是客觀的。我們來區分一下。",
    ai_prompt_prefix: "問自己三次：會真的發生嗎？失去什麼？那個損失是想像嗎？在空格後簡答三行。",
  },
  {
    day: 4,
    title: "驗證｜Verification",
    prompt: "選一位安全的對象（或自己），用下面的「微誠實腳本」開啟對話，並記錄對方的回應。",
    instruction: "透明不是獨白，而是互動。這是最勇敢的一步。",
    ai_prompt_prefix: "選一個安全的人，用以下句子 A/B/C 任一，請對方回 1 句感受。截圖或抄錄下來。",
  },
  {
    day: 5,
    title: "修正｜Refinement",
    prompt: "將 Day 2 的「我害怕...」改寫成一句具體的行動句。",
    instruction: "從恐懼到意願，是改變的開始。格式：我願意...",
    ai_prompt_prefix: "把『我害怕＿＿』改寫成行動句：『我願意今天在＿＿情境，說＿＿＿。』只要一句。",
  },
  {
    day: 6,
    title: "生成｜Generation",
    prompt: "寫下 200 字以內的故事：「今天我說了真話，然後...」",
    instruction: "無論結果如何，記錄本身就是一種勝利。",
    ai_prompt_prefix: "寫 100–200 字：今天我說了真話，然後＿＿＿。不求完美，求真實。",
  },
  {
    day: 7,
    title: "整合｜Integration",
    prompt: "回顧這一週，你最驚訝的發現是什麼？",
    instruction: "寫下來，然後讓我為你總結這一週的旅程。",
    ai_prompt_prefix: "你一週裡最驚訝的發現是＿＿＿。我會幫你整理摘要與雷達。",
  },
];

export const MICRO_HONESTY_SCRIPTS = [
  {
    id: 'script1',
    text: "我在試著讓自己更誠實。現在我其實在擔心＿＿＿，想跟你說真話看看。"
  },
  {
    id: 'script2',
    text: "我不確定怎麼表達，但我想先說：我在意＿＿＿。我需要你的 2 分鐘回應。"
  },
  {
    id: 'script3',
    text: "今天我練習透明，所以直接說：我怕被看成＿＿＿。你願意回我一個感受嗎？"
  }
];

export const WEEKLY_REPORT_COVER_QUOTE = "透明不是裸露，是允許自己被看見。";
