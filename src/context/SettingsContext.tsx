import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Settings {
  wordsPerMinute: number;
  fontSize: number;
  wordsAtOnce: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  theme: 'light' | 'dark';
  font: string;
  mode: 'normal' | 'sprint' | 'marathon';
  showFixationPoint: boolean;
}

interface SessionData {
  date: string;
  speed: number;
  accuracy: number;
}

interface Statistics {
  totalSessions: number;
  averageSpeed: number;
  totalWordsRead: number;
  lastSession: SessionData | null;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  statistics: Statistics;
  updateStatistics: (sessionData: { speed: number; accuracy: number }) => void;
}

const defaultSettings: Settings = {
  wordsPerMinute: 200,
  fontSize: 24,
  wordsAtOnce: 1,
  theme: 'light',
  font: 'Roboto',
  mode: 'normal',
  showFixationPoint: false,
};

const defaultStatistics: Statistics = {
  totalSessions: 0,
  averageSpeed: 0,
  totalWordsRead: 0,
  lastSession: null,
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [statistics, setStatistics] = useState<Statistics>(defaultStatistics);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateStatistics = (sessionData: { speed: number; accuracy: number }) => {
    setStatistics(prev => {
      const totalSessions = prev.totalSessions + 1;
      const newAverageSpeed = 
        (prev.averageSpeed * prev.totalSessions + sessionData.speed) / totalSessions;
      
      return {
        totalSessions,
        averageSpeed: Math.round(newAverageSpeed),
        totalWordsRead: prev.totalWordsRead + Math.round(sessionData.speed * (sessionData.accuracy / 100)),
        lastSession: {
          date: new Date().toISOString(),
          speed: sessionData.speed,
          accuracy: sessionData.accuracy,
        },
      };
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, statistics, updateStatistics }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
