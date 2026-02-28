import React from "react";
import { MdMenu } from 'react-icons/md';

interface HamburgerButtonProps {
  minimized: boolean;
  onClick: () => void;
  dark: boolean;
}

export default function HamburgerButton({ minimized, onClick, dark }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={minimized ? 'Expandir sidebar' : 'Minimizar sidebar'}
      style={{
        position: 'fixed',
        left: minimized ? 64 - 15 : 220 - 15, // sidebar width - half do botão
        top: 15, // alinhado ao topo do sidebar
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        borderRadius: '50%',
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: minimized ? '0 0 6px 0 rgba(0,0,0,0.08)' : 'none',
        transition: 'left 0.2s, background 0.2s, box-shadow 0.2s',
        zIndex: 2000,
      }}
    >
      <MdMenu size={18} />
    </button>
  );
}
