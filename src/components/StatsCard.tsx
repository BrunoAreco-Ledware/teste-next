"use client";
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

interface StatsCardProps {
    icon?: IconType;
    title: string;
    height?: number | string;
    width?: number | string;
    value: string | number;
    meta?: string | number;
    activeCount?: number;
    inactiveCount?: number;
}

export default function StatsCard({ icon: Icon, title, height, width, value, meta, activeCount, inactiveCount }: StatsCardProps) {
    const parseNumber = (v: string | number | undefined) => {
        if (v === undefined) return undefined;
        if (typeof v === 'number') return v;
        const s = String(v).replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
        const n = parseFloat(s);
        return Number.isFinite(n) ? n : undefined;
    };

    const numValue = parseNumber(value);
    const numMeta = parseNumber(meta as any);
    const percent = numValue !== undefined && numMeta !== undefined && numMeta > 0 ? Math.min(100, Math.max(0, (numValue / numMeta) * 100)) : 0;

    const radius = 60;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const raf = requestAnimationFrame(() => setProgress(percent));
        return () => cancelAnimationFrame(raf);
    }, [percent]);

    const [displayValue, setDisplayValue] = useState<number | null>(numValue !== undefined ? 0 : null);
    useEffect(() => {
        if (numValue === undefined) {
            setDisplayValue(null);
            return;
        }
        let start: number | null = null;
        const duration = 800;
        let rafId = 0;
        const animate = (ts: number) => {
            if (start === null) start = ts;
            const elapsed = ts - start;
            const t = Math.min(1, elapsed / duration);
            const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
            const current = Math.round((numValue ?? 0) * ease);
            setDisplayValue(current);
            if (t < 1) {
                rafId = requestAnimationFrame(animate);
            }
        };
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [numValue]);

    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="stats-card" style={{
            padding: 18,
            borderRadius: 12,
            background: 'var(--card-background)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            minWidth: 100,
            height: height,
            width: width,
            boxSizing: 'border-box'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {Icon ? <Icon size={16} /> : null}
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--stats-title)' }}>{title}</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
                    <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
                        <defs>
                            <linearGradient id="stats-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--stats-grad-start)" />
                                <stop offset="50%" stopColor="var(--stats-grad-mid)" />
                                <stop offset="100%" stopColor="var(--stats-grad-end)" />
                            </linearGradient>
                        </defs>
                        <circle
                            stroke="var(--stats-track)"
                            fill="transparent"
                            strokeWidth={stroke}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke="url(#stats-grad)"
                            fill="transparent"
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            strokeDasharray={`${circumference} ${circumference}`}
                            style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 800ms ease' }}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--stats-value)', lineHeight: 1 }}>
                            {displayValue !== null ? displayValue.toLocaleString() : (typeof numValue === 'number' ? numValue.toLocaleString() : String(value))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 8 }}>
                {numMeta !== undefined ? <div style={{ fontSize: 13, color: 'var(--stats-meta)' }}>Meta: {numMeta.toLocaleString()} ({Math.round(percent)}%)</div> : (meta ? <div style={{ fontSize: 13, color: 'var(--stats-meta)' }}>{meta}</div> : null)}
            </div>

            <div style={{ height: 1, background: 'var(--stats-divider)', margin: '12px 0', borderRadius: 1 }} />

            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, alignItems: 'center' }}>
                {typeof activeCount !== 'undefined' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 13, color: 'var(--card-foreground)', fontWeight: 600 }}>Ativo:</div>
                        <span style={{ width: 10, height: 10, borderRadius: 10, background: 'var(--stats-accent-active)', display: 'inline-block' }} />
                        <div style={{ fontSize: 13, color: 'var(--card-foreground)' }}>{activeCount}</div>
                    </div>
                )}
                {typeof inactiveCount !== 'undefined' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 13, color: 'var(--card-foreground)', fontWeight: 600 }}>Inativo:</div>
                        <span style={{ width: 10, height: 10, borderRadius: 10, background: 'var(--stats-accent-inactive)', display: 'inline-block' }} />
                        <div style={{ fontSize: 13, color: 'var(--card-foreground)' }}>{inactiveCount}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
