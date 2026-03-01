"use client";
import StatsCard from "../components/StatsCard";
import { MdPeople, MdTrendingUp } from 'react-icons/md';

export default function Home() {
  return (
    <div className="page-content" style={{ width: '100%', minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-foreground)', padding: '24px', boxSizing: 'border-box' }}>
      <h1 style={{ margin: 0, marginBottom: 16 }}>Dashboard</h1>
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
