'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = '' }: LogoProps) {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size, 
        background: 'var(--foreground)', 
        borderRadius: size * 0.25, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--background)', 
        fontWeight: 900, 
        fontSize: size * 0.5,
        fontFamily: 'Inter, sans-serif',
        userSelect: 'none'
      }}
    >
      R
    </div>
  );
}
