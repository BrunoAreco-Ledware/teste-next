"use client";


import ThemeProvider from "../components/ThemeProvider";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../components/ThemeProvider";
import React from "react";

interface ThemeLayoutProps {
  children: React.ReactNode;
  initialSidebarMinimized: boolean;
}

export default function ThemeLayout({ children, initialSidebarMinimized }: ThemeLayoutProps) {
  return (
    <ThemeProvider>
      <ThemeContent initialSidebarMinimized={initialSidebarMinimized}>{children}</ThemeContent>
    </ThemeProvider>
  );
}
function ThemeContent({ children, initialSidebarMinimized }: { children: React.ReactNode; initialSidebarMinimized: boolean }) {
  const { dark } = useTheme();
  return (
    <div
      className="theme-shell"
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        background: 'var(--color-background)',
        color: 'var(--color-foreground)',
        transition: 'background 0.2s, color 0.2s',
      }}
    >
        <Sidebar initialMinimized={initialSidebarMinimized} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '100vh', width: '100%' }}>
          <TopNav />
          <main className="theme-main" style={{ flex: 1, padding: 24, minHeight: 0, width: '100%' }}>
            {children}
          </main>
        </div>
    </div>
  );
}
