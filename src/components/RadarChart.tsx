
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import type { RadarData } from '../types';

interface InsightRadarChartProps {
  data: RadarData;
  color: string;
}

const InsightRadarChart: React.FC<InsightRadarChartProps> = ({ data, color }) => {
  const chartData = [
    { subject: '觀察\nObserve', value: data.observe, fullMark: 100 },
    { subject: '驗證\nVerify', value: data.verify, fullMark: 100 },
    { subject: '修正\nRefine', value: data.refine, fullMark: 100 },
    { subject: '行動\nAct', value: data.act, fullMark: 100 },
    { subject: '整合\nIntegrate', value: data.integrate, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F5B6A', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="透明度" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default InsightRadarChart;
