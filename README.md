# Mask Off - 面具透明計畫

<div align="center">

**一個為期 7 天的結構化自我覺察旅程**

*我們不「拿掉」面具,而是讓它變透明。*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## 📖 專案簡介

**Mask Off - 面具透明計畫**是一個基於心理學與自我覺察理論設計的互動式 Web 應用程式。透過七天的結構化任務,引導使用者逐步面對內心真實的自己,最終生成個人化的透明度洞察報告。

### 核心理念

> "透明不是裸露,是允許自己被看見。"

在現代社會中,我們常常戴著各種「面具」來應對不同的情境與人際關係。這個專案不是要求你「拿掉」面具,而是透過系統化的自我探索,讓面具逐漸變得透明,讓真實的自己能夠被自己與他人看見。

---

## ✨ 核心功能

### 🎯 七日結構化旅程

每一天都有精心設計的任務,遵循心理學的認知重構流程:

1. **Day 1 - 觀察 (Observation)**: 記錄使用「我覺得/我認為」的瞬間,培養自我觀察能力
2. **Day 2 - 定義 (Definition)**: 一句話總結「我害怕被看成...」,直面核心恐懼
3. **Day 3 - 拆解 (Deconstruction)**: 區分主觀感受與客觀事實,理性分析恐懼
4. **Day 4 - 驗證 (Verification)**: 使用「微誠實腳本」與他人互動,測試真實反應
5. **Day 5 - 修正 (Refinement)**: 將恐懼轉化為具體行動意願
6. **Day 6 - 生成 (Generation)**: 記錄說真話後的真實故事
7. **Day 7 - 整合 (Integration)**: 回顧整週旅程,總結最驚訝的發現

### 🎨 情緒色彩系統

選擇代表當下心情的顏色,整個旅程將以該色調為主題:

- **灰藍 (Gray Blue)**: 沉靜、理性、內斂
- **月白 (Moon White)**: 純淨、平和、中性
- **琥珀 (Amber)**: 溫暖、希望、積極
- **淺金 (Light Gold)**: 明亮、自信、開放

### 📊 AI 驅動的洞察報告

完成七天任務後,系統將使用 Google Gemini AI 分析你的旅程,生成:

- **一週總結**: 鼓勵性的進步回顧與關鍵突破點
- **關鍵詞**: 2-3 個核心情緒主題
- **透明度雷達圖**: 五個維度的視覺化評分
  - 觀察力 (Observe)
  - 驗證勇氣 (Verify)
  - 修正能力 (Refine)
  - 行動力 (Act)
  - 整合深度 (Integrate)

### 📝 個人日誌

所有記錄都會保存在本地,隨時回顧你的成長軌跡。

---

## 🛠️ 技術架構

### 技術棧

- **前端框架**: React 19 + TypeScript
- **樣式系統**: Tailwind CSS 4 + shadcn/ui
- **路由**: Wouter
- **圖表**: Recharts
- **AI 服務**: Google Gemini 2.5 Flash
- **建置工具**: Vite
- **資料儲存**: LocalStorage (純前端,無需後端)

### 專案結構

```
client/
├── src/
│   ├── components/          # UI 元件
│   │   ├── BottomNav.tsx   # 底部導航列
│   │   ├── DailyCard.tsx   # 每日任務卡片
│   │   └── RadarChart.tsx  # 雷達圖元件
│   ├── services/
│   │   └── geminiService.ts # AI 服務整合
│   ├── constants.ts         # 常數定義(任務、主題等)
│   ├── types.ts            # TypeScript 類型定義
│   ├── App.tsx             # 主應用程式
│   └── main.tsx            # 入口檔案
└── public/                 # 靜態資源
```

---

## 🚀 快速開始

### 前置需求

- Node.js 18+ 
- pnpm (推薦) 或 npm

### 安裝步驟

1. **Clone 專案**
   ```bash
   git clone https://github.com/Madison-de-Chao/8-dimensional-thinking.git
   cd 8-dimensional-thinking
   ```

2. **安裝依賴**
   ```bash
   pnpm install
   ```

3. **設定環境變數**
   
   建立 `.env.local` 檔案:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > 💡 如何取得 Gemini API Key: 前往 [Google AI Studio](https://aistudio.google.com/apikey) 申請免費 API 金鑰

4. **啟動開發伺服器**
   ```bash
   pnpm dev
   ```

5. **開啟瀏覽器**
   
   訪問 `http://localhost:3000`

### 建置生產版本

```bash
pnpm build
```

建置完成的檔案會在 `dist/` 目錄中。

---

## 📱 使用指南

### 開始你的旅程

1. **設定主題**: 輸入這週最想誠實面對的事
2. **選擇顏色**: 選擇代表當下心情的色調
3. **每日任務**: 每天完成一個引導式任務
4. **記錄想法**: 真誠地記錄你的觀察與感受
5. **生成報告**: 第七天完成後,生成專屬洞察報告

### 資料隱私

- ✅ 所有資料儲存在**本地瀏覽器** (LocalStorage)
- ✅ 僅在生成報告時將文字傳送至 Gemini AI 分析
- ✅ 不會上傳至任何伺服器或第三方服務
- ✅ 可隨時清除瀏覽器資料來刪除記錄

---

## 🎨 設計哲學

### 視覺設計原則

- **極簡主義**: 減少視覺干擾,專注於內容本身
- **情緒色彩**: 透過顏色系統建立情感連結
- **漸進式揭示**: 資訊逐步展開,避免認知負荷
- **溫暖友善**: 使用柔和的圓角、陰影與過渡動畫

### 互動設計原則

- **引導式體驗**: 每一步都有清晰的指引
- **即時回饋**: 操作後立即提供視覺與文字回饋
- **容錯設計**: 允許暫停、回顧與修改
- **儀式感**: 透過動畫與過渡營造專注的氛圍

---

## 🔮 未來規劃

### 短期目標

- [ ] 新增資料匯出功能 (JSON/PDF)
- [ ] 支援多語言 (英文、簡體中文)
- [ ] 每日提醒通知 (PWA 推送)
- [ ] 深色模式優化

### 長期願景

- [ ] 開發原生 App (iOS/Android)
- [ ] 社群分享功能 (匿名)
- [ ] 進階 AI 教練對話模式
- [ ] 與心理諮商師合作的專業版本

---

## 🤝 貢獻指南

我們歡迎任何形式的貢獻!

### 如何貢獻

1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 貢獻方向

- 🐛 回報 Bug
- 💡 提出新功能建議
- 📝 改善文件
- 🌍 翻譯成其他語言
- 🎨 優化 UI/UX 設計

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權。

---

## 🙏 致謝

### 靈感來源

- **心理學理論**: 認知行為療法 (CBT)、接納與承諾療法 (ACT)
- **設計靈感**: Headspace、Calm、Notion 等優秀產品

### 技術支援

- [React](https://reactjs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 樣式系統
- [Google Gemini](https://ai.google.dev/) - AI 分析引擎
- [shadcn/ui](https://ui.shadcn.com/) - UI 元件庫

---

## 📞 聯絡方式

如有任何問題或建議,歡迎透過以下方式聯繫:

- **GitHub Issues**: [提交問題](https://github.com/Madison-de-Chao/8-dimensional-thinking/issues)
- **Email**: [聯絡我們](mailto:your-email@example.com)

---

<div align="center">

**讓面具變透明,讓真實被看見。**

Made with ❤️ by the Mask Off Team

</div>

