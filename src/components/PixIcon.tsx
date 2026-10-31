import type { CSSProperties } from 'react';

interface PixIconProps {
  glyph: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Hand-drawn pixel-style SVG icons for the OS.
 * Each glyph is a small 32×32 viewBox illustration.
 */
export function PixIcon({ glyph, size = 32, className = '', style }: PixIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    className,
    style,
    shapeRendering: 'crispEdges' as const,
  };
  switch (glyph) {
    // ---------- App / desktop icons ----------
    case 'discovery':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="26" height="22" rx="1" fill="#e8e0c9" stroke="#10251a" strokeWidth="2" />
          <rect x="3" y="4" width="26" height="4" fill="#91a987" />
          <circle cx="11" cy="18" r="4" fill="none" stroke="#183a28" strokeWidth="2" />
          <path d="M11 12 L11 10 M11 24 L11 26 M5 18 L3 18 M19 18 L21 18" stroke="#183a28" strokeWidth="2" />
          <circle cx="22" cy="14" r="3" fill="#75c66a" />
          <rect x="14" y="20" width="10" height="2" fill="#5a6e50" />
        </svg>
      );
    case 'archives':
      return (
        <svg {...common}>
          <rect x="5" y="6" width="22" height="20" fill="#e8e0c9" stroke="#10251a" strokeWidth="2" />
          <rect x="5" y="6" width="22" height="3" fill="#6f8a62" />
          <rect x="8" y="12" width="16" height="2" fill="#5a6e50" />
          <rect x="8" y="16" width="16" height="2" fill="#5a6e50" />
          <rect x="8" y="20" width="10" height="2" fill="#5a6e50" />
          <circle cx="22" cy="21" r="2" fill="#d97742" />
        </svg>
      );
    case 'lab':
      return (
        <svg {...common}>
          <rect x="8" y="4" width="16" height="24" fill="#c8d5c0" stroke="#10251a" strokeWidth="2" />
          <path d="M16 4 L16 18 L10 26 L22 26 L16 18" fill="none" stroke="#183a28" strokeWidth="2" />
          <circle cx="16" cy="11" r="2" fill="#75c66a" />
          <rect x="8" y="4" width="16" height="2" fill="#91a987" />
        </svg>
      );
    case 'simulation':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" fill="none" stroke="#10251a" strokeWidth="2" />
          <g stroke="#183a28" strokeWidth="2">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={16 + 11 * Math.cos(a)}
                  y1={16 + 11 * Math.sin(a)}
                  x2={16 + 14 * Math.cos(a)}
                  y2={16 + 14 * Math.sin(a)}
                />
              );
            })}
          </g>
          <circle cx="16" cy="16" r="3" fill="#10251a" />
          <circle cx="24" cy="10" r="4" fill="none" stroke="#75c66a" strokeWidth="2" />
        </svg>
      );
    case 'gemma':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="20" rx="1" fill="#06140d" stroke="#10251a" strokeWidth="2" />
          <rect x="4" y="6" width="24" height="3" fill="#10251a" />
          <text x="7" y="20" fontFamily="monospace" fontSize="9" fill="#75c66a" fontWeight="bold">
            {'>_'}
          </text>
          <rect x="4" y="23" width="24" height="3" fill="#10251a" />
        </svg>
      );
    case 'cases':
      return (
        <svg {...common}>
          <rect x="4" y="8" width="24" height="18" rx="1" fill="#b08a5a" stroke="#10251a" strokeWidth="2" />
          <rect x="4" y="8" width="24" height="4" fill="#8a6a40" />
          <rect x="12" y="6" width="8" height="4" fill="none" stroke="#10251a" strokeWidth="2" />
          <rect x="8" y="14" width="16" height="2" fill="#5a3e20" />
          <rect x="8" y="18" width="10" height="2" fill="#5a3e20" />
        </svg>
      );
    // ---------- Discovery glyph illustrations ----------
    case 'antikythera':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="13" fill="none" stroke="#10251a" strokeWidth="2" />
          <g stroke="#183a28" strokeWidth="1.5">
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return <line key={i} x1={16 + 11 * Math.cos(a)} y1={16 + 11 * Math.sin(a)} x2={16 + 13 * Math.cos(a)} y2={16 + 13 * Math.sin(a)} />;
            })}
          </g>
          <circle cx="16" cy="16" r="8" fill="none" stroke="#5a6e50" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="#10251a" />
          <circle cx="24" cy="12" r="4" fill="none" stroke="#75c66a" strokeWidth="1.5" />
        </svg>
      );
    case 'battery':
      return (
        <svg {...common}>
          <rect x="10" y="3" width="12" height="26" rx="1" fill="#b08a5a" stroke="#10251a" strokeWidth="2" />
          <rect x="13" y="7" width="6" height="18" fill="#c98b6a" stroke="#10251a" strokeWidth="1.5" />
          <line x1="16" y1="3" x2="16" y2="0" stroke="#10251a" strokeWidth="2" />
          <line x1="19" y1="3" x2="19" y2="0" stroke="#10251a" strokeWidth="2" />
          <circle cx="16" cy="16" r="2" fill="#75c66a" />
        </svg>
      );
    case 'concrete':
      return (
        <svg {...common}>
          <rect x="3" y="8" width="26" height="18" fill="#a89880" stroke="#10251a" strokeWidth="2" />
          <rect x="3" y="8" width="26" height="3" fill="#8a7860" />
          <circle cx="9" cy="15" r="2" fill="#5a5040" />
          <circle cx="18" cy="19" r="2.5" fill="#5a5040" />
          <circle cx="24" cy="13" r="1.5" fill="#5a5040" />
          <rect x="3" y="22" width="26" height="4" fill="#8a7860" />
        </svg>
      );
    case 'aeolipile':
      return (
        <svg {...common}>
          <rect x="12" y="24" width="8" height="5" fill="#5a3e20" stroke="#10251a" strokeWidth="1.5" />
          <circle cx="16" cy="14" r="7" fill="#c98b6a" stroke="#10251a" strokeWidth="2" />
          <path d="M9 14 L4 11 M23 14 L28 11" stroke="#10251a" strokeWidth="2" fill="none" />
          <path d="M4 11 L2 14 M28 11 L30 14" stroke="#10251a" strokeWidth="2" />
          <circle cx="16" cy="14" r="2" fill="#10251a" />
        </svg>
      );
    case 'sword':
      return (
        <svg {...common}>
          <path d="M22 4 L22 22 L16 28 L10 22 L10 4 Z" fill="#9aa6ab" stroke="#10251a" strokeWidth="2" />
          <path d="M8 6 L24 6" stroke="#5a3e20" strokeWidth="3" />
          <path d="M16 6 L16 22" stroke="#5a6e50" strokeWidth="1" />
          <rect x="14" y="2" width="4" height="4" fill="#5a3e20" stroke="#10251a" strokeWidth="1.5" />
        </svg>
      );
    case 'seismoscope':
      return (
        <svg {...common}>
          <ellipse cx="16" cy="18" rx="12" ry="9" fill="#c79b5a" stroke="#10251a" strokeWidth="2" />
          <ellipse cx="16" cy="14" rx="12" ry="5" fill="#d8ad6a" stroke="#10251a" strokeWidth="2" />
          <circle cx="16" cy="13" r="2" fill="#10251a" />
          <circle cx="6" cy="20" r="2" fill="#5a6e50" stroke="#10251a" strokeWidth="1" />
          <circle cx="26" cy="20" r="2" fill="#5a6e50" stroke="#10251a" strokeWidth="1" />
        </svg>
      );
    case 'flame':
      return (
        <svg {...common}>
          <path d="M16 2 C20 8 24 12 24 18 C24 24 20 28 16 28 C12 28 8 24 8 18 C8 14 12 10 14 6 C14 10 16 12 16 14 C16 10 16 6 16 2 Z" fill="#d97742" stroke="#10251a" strokeWidth="2" />
          <path d="M16 12 C18 16 20 18 20 22 C20 25 18 27 16 27 C14 27 12 25 12 22 C12 19 14 17 16 12 Z" fill="#e8e0c9" />
        </svg>
      );
    case 'screw':
      return (
        <svg {...common}>
          <rect x="8" y="4" width="16" height="24" rx="2" fill="#c8d5c0" stroke="#10251a" strokeWidth="2" />
          <path d="M10 9 Q16 6 22 9 M10 14 Q16 11 22 14 M10 19 Q16 16 22 19 M10 24 Q16 21 22 24" stroke="#183a28" strokeWidth="2" fill="none" />
          <line x1="16" y1="4" x2="16" y2="28" stroke="#5a6e50" strokeWidth="1" />
        </svg>
      );
    // ---------- Archive doc glyphs ----------
    case 'scroll':
      return (
        <svg {...common}>
          <rect x="6" y="5" width="20" height="22" fill="#e8e0c9" stroke="#10251a" strokeWidth="2" />
          <rect x="6" y="5" width="20" height="3" fill="#b6ac88" />
          <rect x="9" y="11" width="14" height="1.5" fill="#5a3e20" />
          <rect x="9" y="14" width="14" height="1.5" fill="#5a3e20" />
          <rect x="9" y="17" width="10" height="1.5" fill="#5a3e20" />
          <rect x="9" y="20" width="14" height="1.5" fill="#5a3e20" />
        </svg>
      );
    case 'beaker':
      return (
        <svg {...common}>
          <path d="M11 5 L11 13 L7 26 L25 26 L21 13 L21 5 Z" fill="#c8d5c0" stroke="#10251a" strokeWidth="2" />
          <path d="M9 18 L23 18 L25 26 L7 26 Z" fill="#75c66a" opacity="0.5" />
          <line x1="10" y1="5" x2="22" y2="5" stroke="#10251a" strokeWidth="2" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="9" fill="#aab8a1" stroke="#10251a" strokeWidth="2" />
          <g stroke="#10251a" strokeWidth="2" fill="#aab8a1">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return (
                <rect
                  key={i}
                  x={16 + 9 * Math.cos(a) - 2}
                  y={16 + 9 * Math.sin(a) - 2}
                  width="4"
                  height="4"
                  transform={`rotate(${(a * 180) / Math.PI} ${16 + 9 * Math.cos(a)} ${16 + 9 * Math.sin(a)})`}
                />
              );
            })}
          </g>
          <circle cx="16" cy="16" r="3" fill="#10251a" />
        </svg>
      );
    case 'crucible':
      return (
        <svg {...common}>
          <path d="M8 10 L12 26 L20 26 L24 10 Z" fill="#5a3e20" stroke="#10251a" strokeWidth="2" />
          <ellipse cx="16" cy="10" rx="8" ry="3" fill="#8a6a40" stroke="#10251a" strokeWidth="2" />
          <circle cx="16" cy="9" r="2" fill="#d97742" />
        </svg>
      );
    case 'patent':
      return (
        <svg {...common}>
          <rect x="5" y="4" width="22" height="24" fill="#e8e0c9" stroke="#10251a" strokeWidth="2" />
          <rect x="5" y="4" width="22" height="4" fill="#6f8a62" />
          <circle cx="16" cy="18" r="5" fill="none" stroke="#183a28" strokeWidth="2" />
          <path d="M16 13 L16 23 M11 18 L21 18" stroke="#183a28" strokeWidth="1.5" />
          <rect x="8" y="23" width="16" height="1.5" fill="#5a6e50" />
        </svg>
      );
    case 'blueprint':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="24" height="22" fill="#7a9a8b" stroke="#10251a" strokeWidth="2" />
          <rect x="8" y="9" width="16" height="10" fill="none" stroke="#e8e0c9" strokeWidth="1.5" />
          <line x1="8" y1="14" x2="24" y2="14" stroke="#e8e0c9" strokeWidth="1.5" />
          <circle cx="16" cy="14" r="2" fill="none" stroke="#e8e0c9" strokeWidth="1.5" />
          <rect x="10" y="21" width="12" height="3" fill="none" stroke="#e8e0c9" strokeWidth="1.5" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="24" height="22" fill="#06140d" stroke="#10251a" strokeWidth="2" />
          {[
            [8, 10],
            [16, 8],
            [24, 12],
            [12, 18],
            [20, 22],
            [10, 24],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.5" fill="#75c66a" />
          ))}
          <circle cx="16" cy="16" r="3" fill="none" stroke="#75c66a" strokeWidth="1.5" />
        </svg>
      );
    // ---------- misc ----------
    case 'logo':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="13" fill="none" stroke="#75c66a" strokeWidth="2.5" />
          <path d="M16 5 L18 14 L27 16 L18 18 L16 27 L14 18 L5 16 L14 14 Z" fill="#75c66a" />
          <circle cx="16" cy="16" r="2.5" fill="#06140d" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" fill="#c8d5c0" stroke="#10251a" strokeWidth="2" />
          <text x="16" y="20" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#183a28">
            ?
          </text>
        </svg>
      );
  }
}
