import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  CreditCard,
  ExternalLink,
  Grid3X3,
  Moon,
  PieChart,
  Plus,
  Search,
  Sparkles,
  Sun,
  Table as TableIcon,
  TrendingUp,
} from 'lucide-react';
import { css } from 'styled-system/css';

interface SampleSubscription {
  id: string;
  name: string;
  category: string;
  cost: number;
  cycle: 'monthly' | 'yearly';
  monthlyEquivalent: number;
  renewalDate: string;
  daysRemaining: number;
  status: 'active' | 'trial';
  brandColor: string;
  iconSlug: string;
  cancellationUrl: string;
}

const SAMPLE_SUBSCRIPTIONS: SampleSubscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Entertainment',
    cost: 15.99,
    cycle: 'monthly',
    monthlyEquivalent: 15.99,
    renewalDate: 'Nov 17, 2026',
    daysRemaining: 4,
    status: 'active',
    brandColor: '#E50914',
    iconSlug: 'netflix',
    cancellationUrl: 'https://netflix.com/youraccount',
  },
  {
    id: '2',
    name: 'ChatGPT Plus',
    category: 'Productivity & AI',
    cost: 20.0,
    cycle: 'monthly',
    monthlyEquivalent: 20.0,
    renewalDate: 'Dec 01, 2026',
    daysRemaining: 18,
    status: 'active',
    brandColor: '#10A37F',
    iconSlug: 'openai',
    cancellationUrl: 'https://chatgpt.com/#settings/Account',
  },
  {
    id: '3',
    name: 'Apple One Premier',
    category: 'Bundled Services',
    cost: 37.95,
    cycle: 'monthly',
    monthlyEquivalent: 37.95,
    renewalDate: 'Dec 09, 2026',
    daysRemaining: 26,
    status: 'active',
    brandColor: '#000000',
    iconSlug: 'apple',
    cancellationUrl: 'https://support.apple.com/billing',
  },
  {
    id: '4',
    name: 'GitHub Pro',
    category: 'Developer Tools',
    cost: 48.0,
    cycle: 'yearly',
    monthlyEquivalent: 4.0,
    renewalDate: 'Mar 15, 2027',
    daysRemaining: 122,
    status: 'active',
    brandColor: '#24292E',
    iconSlug: 'github',
    cancellationUrl: 'https://github.com/settings/billing',
  },
  {
    id: '5',
    name: 'Figma Professional',
    category: 'Design & Craft',
    cost: 15.0,
    cycle: 'monthly',
    monthlyEquivalent: 15.0,
    renewalDate: 'Nov 15, 2026',
    daysRemaining: 2,
    status: 'trial',
    brandColor: '#F24E1E',
    iconSlug: 'figma',
    cancellationUrl: 'https://figma.com/settings',
  },
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subtrack-theme');
      if (saved) return saved === 'dark';
      return false; // Default to Light Mode as chosen
    }
    return false;
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'calendar' | 'analytics'>(
    'subscriptions'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('subtrack-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('subtrack-theme', 'light');
    }
  }, [isDarkMode]);

  const totalMonthlySpend = SAMPLE_SUBSCRIPTIONS.reduce(
    (sum, sub) => sum + sub.monthlyEquivalent,
    0
  );
  const totalAnnualSpend = totalMonthlySpend * 12;

  const filteredSubscriptions = SAMPLE_SUBSCRIPTIONS.filter((sub) => {
    const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Locked Design Theme: Apple Card & Titanium
  const theme = {
    lightGradient:
      'radial-gradient(at 10% 10%, rgba(255, 179, 138, 0.22) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(254, 218, 119, 0.22) 0px, transparent 55%), radial-gradient(at 50% 90%, rgba(247, 185, 235, 0.18) 0px, transparent 60%)',
    darkGradient:
      'radial-gradient(at 15% 15%, rgba(217, 119, 6, 0.15) 0px, transparent 50%), radial-gradient(at 85% 20%, rgba(219, 39, 119, 0.12) 0px, transparent 55%), radial-gradient(at 50% 90%, rgba(124, 58, 237, 0.1) 0px, transparent 60%)',
    accentColor: isDarkMode ? '#F59E0B' : '#D97706',
    accentBg: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(217, 119, 6, 0.1)',
    heroGradient: isDarkMode
      ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,250,245,0.85) 100%)',
    cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(217, 119, 6, 0.15)',
  };

  return (
    <div
      style={{
        background: isDarkMode ? '#08090C' : '#F6F6F9',
        color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
      }}
      className={css({
        minHeight: '100vh',
        position: 'relative',
        transition: 'all 0.3s ease',
      })}
    >
      {/* Dynamic Ambient Gradient Mesh Layer */}
      <div
        style={{
          backgroundImage: isDarkMode ? theme.darkGradient : theme.lightGradient,
        }}
        className={css({
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.9,
          transition: 'background-image 0.5s ease',
        })}
      />

      {/* Apple-style Frosted Glass Navigation Bar */}
      <header
        className={css({
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backdropFilter: 'blur(24px)',
          backgroundColor: isDarkMode ? 'rgba(8, 9, 12, 0.75)' : 'rgba(255, 255, 255, 0.75)',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease',
        })}
      >
        <div
          className={css({
            maxWidth: '1200px',
            margin: '0 auto',
            px: { base: '4', md: '8' },
            height: '62px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          {/* Brand */}
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
            <div
              style={{
                background: isDarkMode
                  ? `linear-gradient(135deg, ${theme.accentColor} 0%, #3B82F6 100%)`
                  : `linear-gradient(135deg, #1D1D1F 0%, #434344 100%)`,
              }}
              className={css({
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              })}
            >
              <CreditCard size={18} strokeWidth={2.2} />
            </div>
            <div>
              <span
                className={css({
                  fontWeight: '700',
                  fontSize: '18px',
                  letterSpacing: '-0.4px',
                })}
              >
                SubTrack
              </span>
              <span
                style={{
                  color: theme.accentColor,
                  background: theme.accentBg,
                }}
                className={css({
                  ml: '2',
                  fontSize: '11px',
                  fontWeight: '700',
                  px: '2',
                  py: '0.5',
                  borderRadius: '9999px',
                  letterSpacing: '0.4px',
                })}
              >
                TITANIUM
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
            {/* Currency Selector Pill */}
            <button
              type="button"
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '1.5',
                px: '3.5',
                py: '1.5',
                borderRadius: '9999px',
                bg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                fontSize: '13px',
                fontWeight: '600',
                color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              })}
            >
              <span className="tabular-nums">USD ($)</span>
            </button>

            {/* Light / Dark Mode Toggle Pill */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5',
                px: '3',
                py: '1.5',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                bg: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                transition: 'all 0.15s ease',
                _hover: { transform: 'scale(1.03)' },
              })}
            >
              {isDarkMode ? <Sun size={14} color="#FBBF24" /> : <Moon size={14} color="#6366F1" />}
            </button>

            {/* Account Avatar */}
            <div
              className={css({
                width: '34px',
                height: '34px',
                borderRadius: '9999px',
                bg: isDarkMode ? '#27272A' : '#E5E5EA',
                color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
              })}
            >
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main
        className={css({
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          px: { base: '4', md: '8' },
          py: { base: '6', md: '8' },
        })}
      >
        {/* Urgent Free Trial Warning Banner */}
        <div
          style={{
            borderColor: isDarkMode ? 'rgba(245, 158, 11, 0.3)' : 'rgba(245, 158, 11, 0.4)',
            background: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(254, 243, 199, 0.7)',
          }}
          className={css({
            mb: '6',
            p: '4',
            borderRadius: '18px',
            border: '1px solid',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: { base: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: '4',
            flexDirection: { base: 'column', sm: 'row' },
          })}
        >
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
            <div
              style={{ background: '#F59E0B' }}
              className={css({
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              })}
            >
              <AlertTriangle size={18} strokeWidth={2.4} />
            </div>
            <div>
              <p className={css({ fontSize: '14px', fontWeight: '700', letterSpacing: '-0.2px' })}>
                Free trial expiring in 2 days
              </p>
              <p
                style={{ color: isDarkMode ? '#D4D4D8' : '#71717A' }}
                className={css({ fontSize: '13px' })}
              >
                Figma Professional will renew for $15.00/mo on Nov 15, 2026.
              </p>
            </div>
          </div>
          <div>
            <a
              href="https://figma.com/settings"
              target="_blank"
              rel="noreferrer"
              style={{
                background: isDarkMode ? '#27272A' : '#FFFFFF',
                color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
              }}
              className={css({
                px: '3.5',
                py: '1.5',
                borderRadius: '9999px',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5',
                transition: 'all 0.15s ease',
              })}
            >
              Manage Trial <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Signature Apple Card / Titanium Hero Card */}
        <section
          style={{
            background: theme.heroGradient,
            borderColor: theme.cardBorder,
            boxShadow: isDarkMode
              ? '0 12px 40px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 12px 40px -8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
          className={css({
            p: { base: '6', md: '8' },
            borderRadius: '26px',
            border: '1px solid',
            backdropFilter: 'blur(30px)',
            mb: '8',
            position: 'relative',
            overflow: 'hidden',
          })}
        >
          {/* Subtle Ambient Specular Flare */}
          <div
            style={{
              background: `radial-gradient(circle at 100% 0%, ${theme.accentColor}25 0%, transparent 60%)`,
            }}
            className={css({
              position: 'absolute',
              top: 0,
              right: 0,
              width: '320px',
              height: '100%',
              pointerEvents: 'none',
            })}
          />

          <div
            className={css({
              display: 'flex',
              flexDirection: { base: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { base: 'flex-start', md: 'flex-end' },
              gap: '6',
              position: 'relative',
              zIndex: 1,
            })}
          >
            <div>
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  mb: '2.5',
                })}
              >
                <span
                  style={{ color: theme.accentColor }}
                  className={css({
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  })}
                >
                  Monthly Commitment
                </span>
                <span
                  style={{
                    color: isDarkMode ? '#34D399' : '#059669',
                    background: isDarkMode ? 'rgba(52, 211, 153, 0.12)' : 'rgba(5, 150, 105, 0.1)',
                  }}
                  className={css({
                    fontSize: '12px',
                    fontWeight: '600',
                    px: '2',
                    py: '0.5',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1',
                  })}
                >
                  <TrendingUp size={12} /> Normalized Run-Rate
                </span>
              </div>

              {/* Bold Tabular Numbers */}
              <div className={css({ display: 'flex', alignItems: 'baseline', gap: '2' })}>
                <h1
                  className={`${css({
                    fontSize: { base: '48px', md: '64px' },
                    fontWeight: '800',
                    letterSpacing: '-2px',
                    lineHeight: '1',
                    margin: 0,
                  })} tabular-nums`}
                >
                  ${totalMonthlySpend.toFixed(2)}
                </h1>
                <span
                  style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                  className={css({ fontSize: '18px', fontWeight: '500' })}
                >
                  / month
                </span>
              </div>

              {/* Secondary Breakdown */}
              <div
                style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: { base: '3', md: '5' },
                  mt: '4',
                  fontSize: '14px',
                })}
              >
                <div>
                  <span
                    className={`${css({ fontWeight: '700', color: isDarkMode ? '#FFFFFF' : '#1D1D1F' })} tabular-nums`}
                  >
                    ${totalAnnualSpend.toFixed(2)}
                  </span>{' '}
                  annual run-rate
                </div>
                <div
                  className={css({
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    bg: '#71717A',
                  })}
                />
                <div>
                  <span
                    className={css({
                      fontWeight: '700',
                      color: isDarkMode ? '#FFFFFF' : '#1D1D1F',
                    })}
                  >
                    {SAMPLE_SUBSCRIPTIONS.length}
                  </span>{' '}
                  active subscriptions
                </div>
                <div
                  className={css({
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    bg: '#71717A',
                  })}
                />
                <div>
                  Next bill:{' '}
                  <span style={{ color: '#EF4444' }} className={css({ fontWeight: '700' })}>
                    Netflix in 4 days
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Actions */}
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '3',
                width: { base: '100%', md: 'auto' },
              })}
            >
              <button
                type="button"
                style={{
                  background: isDarkMode ? '#FFFFFF' : '#18181B',
                  color: isDarkMode ? '#000000' : '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                }}
                className={css({
                  flex: { base: 1, md: 'initial' },
                  px: '5',
                  py: '3.5',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '-0.2px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2',
                  transition: 'all 0.15s ease',
                  _hover: { transform: 'translateY(-1px)', filter: 'brightness(1.05)' },
                  _active: { transform: 'scale(0.98)' },
                })}
              >
                <Plus size={16} strokeWidth={2.6} />
                <span>Add Subscription</span>
              </button>

              <button
                type="button"
                style={{
                  background: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                }}
                className={css({
                  px: '4',
                  py: '3.5',
                  borderRadius: '14px',
                  border: '1px solid',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  transition: 'background 0.15s ease',
                })}
              >
                <Sparkles size={16} color={theme.accentColor} />
                <span className={css({ display: { base: 'none', sm: 'inline' } })}>
                  Try Presets
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* View Segmented Switcher & Card/Table Toggle */}
        <div
          className={css({
            display: 'flex',
            flexDirection: { base: 'column', sm: 'row' },
            alignItems: { base: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            gap: '4',
            mb: '6',
          })}
        >
          {/* Segmented Pill */}
          <div
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            }}
            className={css({
              display: 'inline-flex',
              p: '1',
              borderRadius: '14px',
              border: '1px solid',
            })}
          >
            <button
              type="button"
              onClick={() => setActiveTab('subscriptions')}
              style={{
                background:
                  activeTab === 'subscriptions'
                    ? isDarkMode
                      ? '#27272A'
                      : '#FFFFFF'
                    : 'transparent',
                color:
                  activeTab === 'subscriptions'
                    ? isDarkMode
                      ? '#FFFFFF'
                      : '#18181B'
                    : isDarkMode
                      ? '#A1A1AA'
                      : '#71717A',
                boxShadow: activeTab === 'subscriptions' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              }}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              })}
            >
              <span>Subscriptions ({SAMPLE_SUBSCRIPTIONS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              style={{
                background:
                  activeTab === 'calendar' ? (isDarkMode ? '#27272A' : '#FFFFFF') : 'transparent',
                color:
                  activeTab === 'calendar'
                    ? isDarkMode
                      ? '#FFFFFF'
                      : '#18181B'
                    : isDarkMode
                      ? '#A1A1AA'
                      : '#71717A',
                boxShadow: activeTab === 'calendar' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              }}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              })}
            >
              <Calendar size={14} />
              <span>Calendar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              style={{
                background:
                  activeTab === 'analytics' ? (isDarkMode ? '#27272A' : '#FFFFFF') : 'transparent',
                color:
                  activeTab === 'analytics'
                    ? isDarkMode
                      ? '#FFFFFF'
                      : '#18181B'
                    : isDarkMode
                      ? '#A1A1AA'
                      : '#71717A',
                boxShadow: activeTab === 'analytics' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              }}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              })}
            >
              <PieChart size={14} />
              <span>Analytics</span>
            </button>
          </div>

          {/* Grid / Table Toggle */}
          <div
            style={{
              background: isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            }}
            className={css({
              display: 'flex',
              alignItems: 'center',
              p: '1',
              borderRadius: '12px',
              alignSelf: { base: 'flex-end', sm: 'center' },
            })}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                background:
                  viewMode === 'grid' ? (isDarkMode ? '#27272A' : '#FFFFFF') : 'transparent',
                color: viewMode === 'grid' ? theme.accentColor : isDarkMode ? '#A1A1AA' : '#71717A',
                boxShadow: viewMode === 'grid' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }}
              className={css({
                p: '1.5',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              style={{
                background:
                  viewMode === 'table' ? (isDarkMode ? '#27272A' : '#FFFFFF') : 'transparent',
                color:
                  viewMode === 'table' ? theme.accentColor : isDarkMode ? '#A1A1AA' : '#71717A',
                boxShadow: viewMode === 'table' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              }}
              className={css({
                p: '1.5',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <TableIcon size={16} />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          className={css({
            display: 'flex',
            flexDirection: { base: 'column', md: 'row' },
            alignItems: { base: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            gap: '4',
            mb: '6',
          })}
        >
          {/* Search Input */}
          <div
            className={css({
              position: 'relative',
              flex: '1',
              maxWidth: { base: '100%', md: '360px' },
            })}
          >
            <Search
              size={16}
              style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
              className={css({
                position: 'absolute',
                left: '3.5',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              })}
            />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                color: isDarkMode ? '#FFFFFF' : '#1D1D1F',
              }}
              className={css({
                width: '100%',
                pl: '10',
                pr: '4',
                py: '2.5',
                borderRadius: '12px',
                border: '1px solid',
                fontSize: '14px',
                outline: 'none',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.15s ease',
              })}
            />
          </div>

          {/* Category Filter Pills */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '2',
              overflowX: 'auto',
              pb: { base: '2', md: '0' },
            })}
          >
            {[
              'All',
              'Entertainment',
              'Productivity & AI',
              'Bundled Services',
              'Developer Tools',
              'Design & Craft',
            ].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background:
                    selectedCategory === cat
                      ? isDarkMode
                        ? '#FFFFFF'
                        : '#18181B'
                      : isDarkMode
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                  color:
                    selectedCategory === cat
                      ? isDarkMode
                        ? '#000000'
                        : '#FFFFFF'
                      : isDarkMode
                        ? '#D4D4D8'
                        : '#52525B',
                  borderColor:
                    selectedCategory === cat
                      ? 'transparent'
                      : isDarkMode
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.08)',
                }}
                className={css({
                  px: '3.5',
                  py: '1.5',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.15s ease',
                })}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid View */}
        {viewMode === 'grid' ? (
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: {
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: '5',
            })}
          >
            {filteredSubscriptions.map((sub) => {
              const isUrgent = sub.daysRemaining <= 3;
              const isSoon = sub.daysRemaining <= 7 && !isUrgent;

              return (
                <article
                  key={sub.id}
                  style={{
                    background: isDarkMode ? 'rgba(24, 24, 27, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    boxShadow: isDarkMode
                      ? '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                      : '0 8px 30px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                  }}
                  className={css({
                    p: '6',
                    borderRadius: '22px',
                    border: '1px solid',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    _hover: {
                      transform: 'translateY(-2px)',
                      boxShadow: isDarkMode
                        ? '0 14px 40px rgba(0, 0, 0, 0.6)'
                        : '0 14px 40px rgba(0, 0, 0, 0.08)',
                    },
                  })}
                >
                  <div>
                    {/* Header: Brand Icon + Title */}
                    <div
                      className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: '4',
                      })}
                    >
                      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
                        <div
                          style={{
                            background: isDarkMode
                              ? 'rgba(255, 255, 255, 0.08)'
                              : 'rgba(0, 0, 0, 0.03)',
                            borderColor: isDarkMode
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.08)',
                          }}
                          className={css({
                            width: '46px',
                            height: '46px',
                            borderRadius: '14px',
                            border: '1px solid',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          })}
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${sub.iconSlug}`}
                            alt=""
                            width={22}
                            height={22}
                            style={{
                              filter:
                                isDarkMode &&
                                (sub.iconSlug === 'apple' ||
                                  sub.iconSlug === 'openai' ||
                                  sub.iconSlug === 'github')
                                  ? 'invert(1)'
                                  : 'none',
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <h3
                            className={css({
                              fontSize: '17px',
                              fontWeight: '700',
                              letterSpacing: '-0.3px',
                              margin: 0,
                            })}
                          >
                            {sub.name}
                          </h3>
                          <span
                            style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                            className={css({ fontSize: '13px' })}
                          >
                            {sub.category}
                          </span>
                        </div>
                      </div>

                      {/* Status Pill */}
                      <span
                        style={{
                          background:
                            sub.status === 'trial'
                              ? isDarkMode
                                ? 'rgba(245, 158, 11, 0.2)'
                                : 'rgba(245, 158, 11, 0.15)'
                              : isDarkMode
                                ? 'rgba(16, 185, 129, 0.2)'
                                : 'rgba(16, 185, 129, 0.15)',
                          color:
                            sub.status === 'trial' ? '#F59E0B' : isDarkMode ? '#34D399' : '#059669',
                        }}
                        className={css({
                          fontSize: '11px',
                          fontWeight: '700',
                          px: '2.5',
                          py: '1',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '1.5',
                        })}
                      >
                        <span
                          style={{
                            background:
                              sub.status === 'trial'
                                ? '#F59E0B'
                                : isDarkMode
                                  ? '#34D399'
                                  : '#059669',
                          }}
                          className={css({ width: '6px', height: '6px', borderRadius: '50%' })}
                        />
                        {sub.status === 'trial' ? 'Trial' : 'Active'}
                      </span>
                    </div>

                    {/* Price and Cycle */}
                    <div className={css({ my: '4' })}>
                      <div className={css({ display: 'flex', alignItems: 'baseline', gap: '1.5' })}>
                        <span
                          className={`${css({
                            fontSize: '28px',
                            fontWeight: '800',
                            letterSpacing: '-0.8px',
                          })} tabular-nums`}
                        >
                          ${sub.cost.toFixed(2)}
                        </span>
                        <span
                          style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                          className={css({ fontSize: '14px', fontWeight: '500' })}
                        >
                          /{sub.cycle}
                        </span>
                      </div>
                      {sub.cycle === 'yearly' && (
                        <p
                          style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                          className={css({ fontSize: '13px', mt: '0.5' })}
                        >
                          Normalized to{' '}
                          <strong
                            className={`${css({ color: isDarkMode ? '#FFFFFF' : '#1D1D1F' })} tabular-nums`}
                          >
                            ${sub.monthlyEquivalent.toFixed(2)}/mo
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer: Renewal Countdown & Manage Button */}
                  <div
                    style={{
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    }}
                    className={css({
                      pt: '3.5',
                      borderTop: '1px solid',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                    })}
                  >
                    <div>
                      <span
                        style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                        className={css({
                          fontSize: '11px',
                          display: 'block',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        })}
                      >
                        Renewal
                      </span>
                      <span
                        className={`${css({
                          fontWeight: '700',
                          color: isUrgent
                            ? '#EF4444'
                            : isSoon
                              ? '#F59E0B'
                              : isDarkMode
                                ? '#E4E4E7'
                                : '#27272A',
                        })} tabular-nums`}
                      >
                        {sub.renewalDate} ({sub.daysRemaining}d)
                      </span>
                    </div>

                    <a
                      href={sub.cancellationUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: isDarkMode
                          ? 'rgba(255, 255, 255, 0.08)'
                          : 'rgba(0, 0, 0, 0.04)',
                        color: isDarkMode ? '#FFFFFF' : '#1D1D1F',
                      }}
                      className={css({
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1',
                        px: '3',
                        py: '1.5',
                        borderRadius: '9999px',
                        fontWeight: '600',
                        fontSize: '12px',
                        textDecoration: 'none',
                        transition: 'all 0.15s ease',
                      })}
                    >
                      <span>Manage</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Dense Table View */
          <div
            style={{
              background: isDarkMode ? 'rgba(24, 24, 27, 0.75)' : 'rgba(255, 255, 255, 0.85)',
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
            }}
            className={css({
              borderRadius: '22px',
              border: '1px solid',
              overflowX: 'auto',
              backdropFilter: 'blur(20px)',
            })}
          >
            <table
              className={css({
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: '14px',
              })}
            >
              <thead>
                <tr
                  style={{
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  }}
                  className={css({ borderBottom: '1px solid' })}
                >
                  <th className={css({ py: '4', px: '5', fontWeight: '700' })}>Service</th>
                  <th className={css({ py: '4', px: '4', fontWeight: '700' })}>Category</th>
                  <th className={css({ py: '4', px: '4', fontWeight: '700' })}>Billed Cost</th>
                  <th className={css({ py: '4', px: '4', fontWeight: '700' })}>Monthly Rate</th>
                  <th className={css({ py: '4', px: '4', fontWeight: '700' })}>Renewal</th>
                  <th className={css({ py: '4', px: '4', fontWeight: '700' })}>Status</th>
                  <th
                    className={css({
                      py: '4',
                      px: '5',
                      textAlign: 'right',
                      fontWeight: '700',
                    })}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    style={{
                      borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                    }}
                    className={css({
                      borderBottom: '1px solid',
                      transition: 'background 0.15s ease',
                      _hover: {
                        bg: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                      },
                    })}
                  >
                    <td className={css({ py: '3.5', px: '5' })}>
                      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
                        <img
                          src={`https://cdn.simpleicons.org/${sub.iconSlug}`}
                          alt=""
                          width={18}
                          height={18}
                          style={{
                            filter:
                              isDarkMode &&
                              (sub.iconSlug === 'apple' ||
                                sub.iconSlug === 'openai' ||
                                sub.iconSlug === 'github')
                                ? 'invert(1)'
                                : 'none',
                          }}
                        />
                        <span className={css({ fontWeight: '700' })}>{sub.name}</span>
                      </div>
                    </td>
                    <td
                      style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                      className={css({ py: '3.5', px: '4' })}
                    >
                      {sub.category}
                    </td>
                    <td
                      className={`${css({ py: '3.5', px: '4', fontWeight: '700' })} tabular-nums`}
                    >
                      ${sub.cost.toFixed(2)}{' '}
                      <span
                        style={{ color: isDarkMode ? '#A1A1AA' : '#71717A' }}
                        className={css({ fontSize: '12px', fontWeight: 'normal' })}
                      >
                        /{sub.cycle}
                      </span>
                    </td>
                    <td
                      style={{ color: theme.accentColor }}
                      className={`${css({ py: '3.5', px: '4', fontWeight: '700' })} tabular-nums`}
                    >
                      ${sub.monthlyEquivalent.toFixed(2)}/mo
                    </td>
                    <td className={`${css({ py: '3.5', px: '4' })} tabular-nums`}>
                      <span
                        style={{
                          color:
                            sub.daysRemaining <= 3 ? '#EF4444' : isDarkMode ? '#E4E4E7' : '#27272A',
                          fontWeight: sub.daysRemaining <= 3 ? '700' : 'normal',
                        }}
                      >
                        {sub.renewalDate}
                      </span>
                    </td>
                    <td className={css({ py: '3.5', px: '4' })}>
                      <span
                        style={{
                          background:
                            sub.status === 'trial'
                              ? isDarkMode
                                ? 'rgba(245, 158, 11, 0.2)'
                                : 'rgba(245, 158, 11, 0.15)'
                              : isDarkMode
                                ? 'rgba(16, 185, 129, 0.2)'
                                : 'rgba(16, 185, 129, 0.15)',
                          color:
                            sub.status === 'trial' ? '#F59E0B' : isDarkMode ? '#34D399' : '#059669',
                        }}
                        className={css({
                          fontSize: '12px',
                          fontWeight: '700',
                          px: '2.5',
                          py: '0.5',
                          borderRadius: '9999px',
                        })}
                      >
                        {sub.status === 'trial' ? 'Trial' : 'Active'}
                      </span>
                    </td>
                    <td className={css({ py: '3.5', px: '5', textAlign: 'right' })}>
                      <a
                        href={sub.cancellationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={css({
                          fontSize: '13px',
                          color: theme.accentColor,
                          textDecoration: 'none',
                          fontWeight: '600',
                          _hover: { textDecoration: 'underline' },
                        })}
                      >
                        Manage ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
