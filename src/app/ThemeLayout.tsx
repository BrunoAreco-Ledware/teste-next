"use client";
import ThemeProvider from "../components/ThemeProvider";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";

import { useTheme } from "../components/ThemeProvider";

export default function ThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeContent>{children}</ThemeContent>
    </ThemeProvider>
  );
}

function ThemeContent({ children }: { children: React.ReactNode }) {
  const { dark } = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        background: 'var(--color-background)',
        color: 'var(--color-foreground)',
        transition: 'background 0.2s, color 0.2s'
      }}
    >
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh' }}>
        <TopNav />
        <main style={{ flex: 1, padding: 24, minHeight: 0, width: '100%' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
