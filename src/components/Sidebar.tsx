import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import HamburgerButton from "./HamburgerButton";
import { MdHome, MdPerson, MdSettings } from 'react-icons/md';
import Tooltip from "./Tooltip";

const SIDEBAR_MINIMIZED_KEY = 'sidebar:minimized';

interface SidebarProps {
  initialMinimized?: boolean;
}

export default function Sidebar({ initialMinimized = false }: SidebarProps) {
  const { dark } = useTheme();
  const [minimized, setMinimized] = useState(initialMinimized);

  const menuItems = [
    { Icon: MdHome, label: 'Sidebar Item 1' },
    { Icon: MdPerson, label: 'Sidebar Item 2' },
    { Icon: MdSettings, label: 'Sidebar Item 3' },
  ];

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_MINIMIZED_KEY, String(minimized));
    } catch {}
    try {
      document.cookie = `sidebar_minimized=${minimized}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
  }, [minimized]);

  return (
    <>
      <HamburgerButton minimized={minimized} onClick={() => setMinimized((m) => !m)} />
      <aside
        className={"sidebar" + (minimized ? ' minimized' : '')}
        style={{
          height: '100vh',
          background: 'var(--color-background)',
          color: 'var(--color-foreground)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 380ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease, color 200ms ease',
          alignItems: 'stretch',
          overflow: minimized ? 'visible' : 'hidden',
          borderRight: '1px solid var(--color-border)',
          zIndex: 1200,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--color-border)' }}>
          {/* Logo centralizado sem divisor lateral */}
          <span style={{ fontWeight: 'bold', fontSize: 20 }}>Logo</span>
        </div>
        <ul className="sidebar-list" style={{ listStyle: 'none', padding: 0, marginTop: 24, flex: 1, width: '100%' }}>
          {menuItems.map(({ Icon, label }, index) => (
            <li key={label} className="sidebar-item" style={{ ['--item-index' as any]: index }}>
              <Tooltip content={label} show={minimized}>
                <div className="sidebar-item-inner">
                  <span className="sidebar-icon" aria-hidden><Icon size={20} /></span>
                  <span className="sidebar-label">{label}</span>
                </div>
              </Tooltip>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
