import React, { useEffect } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  // 🔑 Apply the theme globally whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="h-screen container p-4 mx-auto pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">
            Themes
            <p className="text-sm text-base-content/70">
              Choose a theme for your chat interface
            </p>
          </h2>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              data-theme={t} // preview inside button
              onClick={() => setTheme(t)} // change global theme
              className={`rounded-lg border border-base-300 p-3 flex flex-col items-center justify-center gap-2 shadow-sm 
                hover:scale-105 transition-all duration-200 ${
                  theme === t ? "ring-2 ring-primary" : ""
                }`}
            >
              {/* Theme preview colors */}
              <div className="flex gap-1">
                <div className="w-5 h-5 bg-primary rounded"></div>
                <div className="w-5 h-5 bg-secondary rounded"></div>
                <div className="w-5 h-5 bg-accent rounded"></div>
              </div>
              <span className="text-xs capitalize">{t}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
