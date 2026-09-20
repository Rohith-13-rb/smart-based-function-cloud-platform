import React from 'react';

export function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  gradientBorder = false,
  glowColor = null, // 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber'
  ...props
}) {
  const glowClasses = {
    cyan: 'glow-cyan border-cyan-500/30',
    purple: 'glow-purple border-purple-500/30',
    pink: 'glow-pink border-pink-500/30',
    emerald: 'glow-emerald border-emerald-500/30',
    amber: 'glow-amber border-amber-500/30',
  };

  return (
    <div
      className={`
        rounded-2xl relative overflow-hidden
        ${hoverEffect ? 'glass-panel-interactive' : 'glass-panel'}
        ${gradientBorder ? 'gradient-border-mask' : ''}
        ${glowColor && glowClasses[glowColor] ? glowClasses[glowColor] : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
