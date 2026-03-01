import React from "react";

interface HamburgerButtonProps {
  minimized: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ minimized, onClick }: HamburgerButtonProps) {
  const collapsedLeft = 46;
  const expandedOffset = 156;

  return (
    <button
      className={"hamburger-button" + (minimized ? "" : " is-open")}
      onClick={onClick}
      aria-label={minimized ? 'Expandir sidebar' : 'Minimizar sidebar'}
      style={{
        position: 'fixed',
        left: collapsedLeft,
        transform: `translateX(${minimized ? 0 : expandedOffset}px)`,
        top: 15,
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: '50%',
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-foreground)',
        boxShadow: minimized ? '0 4px 12px rgba(0,0,0,0.10)' : '0 2px 6px rgba(0,0,0,0.06)',
        transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        willChange: 'transform',
        zIndex: 2000,
      }}
    >
      <span className="hamburger-icon" aria-hidden>
        <span className="hamburger-line line-1" />
        <span className="hamburger-line line-2" />
        <span className="hamburger-line line-3" />
      </span>
    </button>
  );
}
