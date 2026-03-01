"use client";
import { useTheme } from "./ThemeProvider";
import { MdWbSunny, MdDarkMode } from 'react-icons/md';

export default function TopNav() {
  const { dark, setDark } = useTheme();
  return (
    <nav
      style={{
        width: '100%',
        height: '60px',
        background: 'linear-gradient(90deg, var(--stats-grad-start), var(--stats-grad-mid), var(--stats-grad-end))',
        color: 'var(--stats-value)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 56px 0 32px',
        justifyContent: 'flex-end',
        boxShadow: 'var(--card-shadow)',
        transition: 'background 0.2s, color 0.2s, box-shadow 0.2s'
      }}
    >
      <button
        className="theme-toggle"
        onClick={() => setDark(!dark)}
        style={{
          background: 'none',
          color: 'inherit',
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: 22,
          lineHeight: 1
        }}
        aria-label="Alternar tema"
      >
        <span className="icon icon-sun" aria-hidden><MdWbSunny size={20} /></span>
        <span className="icon icon-moon" aria-hidden><MdDarkMode size={20} /></span>
      </button>
    </nav>
  );
}
