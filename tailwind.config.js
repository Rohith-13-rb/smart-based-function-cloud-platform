/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloud: {
          dark: '#070B14',
          card: '#0F172A',
          border: '#1E293B',
          glow: '#38BDF8',
        },
        cyber: {
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          pink: '#EC4899',
          amber: '#F59E0B',
          emerald: '#10B981',
          blue: '#3B82F6',
          indigo: '#6366F1',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 50%, #EC4899 100%)',
        'purple-cyan': 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
        'amber-pink': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        'emerald-cyan': 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      }
    },
  },
  plugins: [],
}
