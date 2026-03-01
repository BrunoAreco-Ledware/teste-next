"use client";
import { MdPerson } from 'react-icons/md';

export default function ClientesPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-foreground)', padding: '24px', boxSizing: 'border-box' }}>
      <h1
        style={{
          margin: 0,
          marginBottom: 18,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 700,
          fontSize: 32,
          lineHeight: 1,
          letterSpacing: 0.2,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, transform: 'translateY(-5px)' }}>
          <MdPerson size={26} aria-hidden />
        </span>
        <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, lineHeight: 1.05 }}>
          <span>Clientes</span>
          <span className="page-title-underline" aria-hidden />
        </span>
      </h1>
    </div>
  );
}
