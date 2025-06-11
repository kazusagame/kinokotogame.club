"use client";

import { useState, useEffect, useId } from "react";
import { useTheme } from "next-themes";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const toggleTheme = () => {
    if (theme === "cupcake") {
      setTheme("dark");
    } else {
      setTheme("cupcake");
    }
  };
  const checkboxId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  /* テーマ設定と表示の不一致を避けるため、レンダー初回はスケルトンを出力 */
  if (!mounted) {
    return <div className="skeleton h-6 w-[104px]"></div>;
  }

  return (
    <label className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        type="checkbox"
        id={checkboxId}
        className="toggle"
        checked={theme === "cupcake" ? false : true}
        onChange={toggleTheme}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
}
