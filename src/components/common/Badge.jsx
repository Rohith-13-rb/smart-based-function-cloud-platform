import React from 'react';

export function Badge({
  children,
  variant = 'cyan', // 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber' | 'blue' | 'slate'
  size = 'md',      // 'sm' | 'md' | 'lg'
  icon: Icon = null,
  className = '',
  ...props
}) {
  const variantStyles = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    pink: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium transition-colors ${variantStyles[variant] || variantStyles.cyan} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      {children}
    </span>
  );
}
