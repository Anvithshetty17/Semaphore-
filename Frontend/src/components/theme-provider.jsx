"use client";
import { useEffect } from 'react';

export default function ThemeProvider({ children }) {
  useEffect(() => {
    // Force dark mode on mount and whenever component renders
    const forceDarkMode = () => {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#000';
      document.body.style.color = '#fff';
    };

    forceDarkMode();

    // Also force dark mode on any dynamic content changes
    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('dark')) {
        forceDarkMode();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Override system theme changes
    const handleThemeChange = () => {
      forceDarkMode();
    };

    // Listen for system theme changes and override them
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      mediaQuery.addEventListener('change', handleThemeChange);
      
      return () => {
        observer.disconnect();
        mediaQuery.removeEventListener('change', handleThemeChange);
      };
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
