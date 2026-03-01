"use client";
import StatsCard from "../components/StatsCard";
import { MdPeople, MdTrendingUp, MdDashboard } from 'react-icons/md';

export default function Home() {
  return (
    <div className="page-content" style={{ width: '100%', minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-foreground)', padding: '24px', boxSizing: 'border-box' }}>
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
          <MdDashboard size={26} aria-hidden />
        </span>
        <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 6, lineHeight: 1.05 }}>
          <span>Dashboard</span>
          <span className="page-title-underline" aria-hidden />
        </span>
      </h1>
      <div
        className="page-cards"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          width: '100%'
        }}
      >
        <StatsCard
          icon={MdPeople}
          title="Total de Clientes"
          height={260}
          width={260}
          value={5}
          meta={100}
          activeCount={4}
          inactiveCount={1}
        />
        <StatsCard
          icon={MdTrendingUp}
          title="Revenue"
          height={260}
          width={260}
          value={1245}
          meta={2000}
          activeCount={1200}
          inactiveCount={45}
        />
      </div>
    </div>
  );
}
