import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import HamburgerButton from "./HamburgerButton";
import { MdHome, MdPerson, MdSettings } from 'react-icons/md';

export default function Sidebar() {
  const { dark } = useTheme();
  const [minimized, setMinimized] = useState(false);
  return (
    <>
      <HamburgerButton minimized={minimized} onClick={() => setMinimized((m) => !m)} dark={dark} />
      <aside
        className={"sidebar" + (minimized ? ' minimized' : '')}
        style={{
          width: minimized ? 64 : 220,
          height: '100vh',
          background: 'var(--color-background)',
          color: 'var(--color-foreground)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s, background 0.2s, color 0.2s',
          alignItems: 'stretch',
          overflow: 'hidden',
          borderRight: '1px solid var(--color-border)',
          position: 'relative',
          zIndex: 1100,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--color-border)' }}>
          {/* Logo centralizado sem divisor lateral */}
          <span style={{ fontWeight: 'bold', fontSize: 20 }}>Logo</span>
        </div>
        <ul className="sidebar-list" style={{ listStyle: 'none', padding: 0, marginTop: 24, flex: 1, width: '100%' }}>
          <li className="sidebar-item">
            <div className="sidebar-item-inner">
              <span className="sidebar-icon" aria-hidden><MdHome size={20} /></span>
              <span className="sidebar-label">Sidebar Item 1</span>
            </div>
          </li>
          <li className="sidebar-item">
            <div className="sidebar-item-inner">
              <span className="sidebar-icon" aria-hidden><MdPerson size={20} /></span>
              <span className="sidebar-label">Sidebar Item 2</span>
            </div>
          </li>
          <li className="sidebar-item">
            <div className="sidebar-item-inner">
              <span className="sidebar-icon" aria-hidden><MdSettings size={20} /></span>
              <span className="sidebar-label">Sidebar Item 3</span>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
