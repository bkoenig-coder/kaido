import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  isAutoTime: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Day is between 06:00 and 18:59:59 local time
export const getDayOrNightTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19 ? 'light' : 'dark';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const sessionChoice = sessionStorage.getItem('kaido_theme_user_selected');
        if (sessionChoice === 'light' || sessionChoice === 'dark') {
          return sessionChoice;
        }
      } catch (e) {
        // Fallback
      }
      return getDayOrNightTheme();
    }
    return 'dark';
  });

  const [isAutoTime, setIsAutoTime] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return !sessionStorage.getItem('kaido_theme_user_selected');
      } catch (e) {
        return true;
      }
    }
    return true;
  });

  // Keep DOM attribute synchronized
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Periodic check to keep theme in sync with day/night if the user hasn't manually overridden it
  useEffect(() => {
    if (!isAutoTime) return;

    const checkTime = () => {
      const expectedTheme = getDayOrNightTheme();
      setThemeState(prev => (prev !== expectedTheme ? expectedTheme : prev));
    };

    const interval = setInterval(checkTime, 60000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkTime();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isAutoTime]);

  const toggleTheme = () => {
    setThemeState(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        sessionStorage.setItem('kaido_theme_user_selected', next);
      } catch (e) {}
      setIsAutoTime(false);
      return next;
    });
  };

  const setTheme = (newTheme: Theme) => {
    try {
      sessionStorage.setItem('kaido_theme_user_selected', newTheme);
    } catch (e) {}
    setIsAutoTime(false);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isAutoTime, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
