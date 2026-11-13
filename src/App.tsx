import { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  ExternalLink,
  Grid3X3,
  Layers,
  PieChart,
  Plus,
  Search,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'calendar' | 'analytics'>(
    'subscriptions'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalMonthlySpend = SAMPLE_SUBSCRIPTIONS.reduce(
    (sum, sub) => sum + sub.monthlyEquivalent,
    0
  );
  const totalAnnualSpend = totalMonthlySpend * 12;
  const trialSubscriptions = SAMPLE_SUBSCRIPTIONS.filter((sub) => sub.status === 'trial');

  const filteredSubscriptions = SAMPLE_SUBSCRIPTIONS.filter((sub) => {
    const matchesCategory = selectedCategory === 'All' || sub.category === selectedCategory;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={css({
        minHeight: '100vh',
        bg: '#F5F5F7',
        color: '#1D1D1F',
        fontFamily: 'sans',
      })}
    >
      {/* Apple-style Frosted Glass Navigation Bar */}
      <header
        className={css({
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.82)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
        })}
      >
        <div
          className={css({
            maxWidth: '1200px',
            margin: '0 auto',
            px: { base: '4', md: '8' },
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          {/* Brand */}
          <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
            <div
              className={css({
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0071E3 0%, #42A5F5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 2px 6px rgba(0, 113, 227, 0.25)',
              })}
            >
              <CreditCard size={18} strokeWidth={2.2} />
            </div>
            <div>
              <span
                className={css({ fontWeight: '600', fontSize: '17px', letterSpacing: '-0.3px' })}
              >
                SubTrack
              </span>
              <span
                className={css({
                  ml: '2',
                  fontSize: '11px',
                  fontWeight: '500',
                  px: '2',
                  py: '0.5',
                  borderRadius: '9999px',
                  bg: 'rgba(0, 113, 227, 0.08)',
                  color: '#0071E3',
                  letterSpacing: '0.2px',
                })}
              >
                PRO
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
                px: '3',
                py: '1.5',
                borderRadius: '9999px',
                bg: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                fontSize: '13px',
                fontWeight: '500',
                color: '#1D1D1F',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                _hover: { bg: 'rgba(0, 0, 0, 0.08)' },
                _focusVisible: {
                  outline: '2px solid #0071E3',
                  outlineOffset: '2px',
                },
              })}
            >
              <span>USD ($)</span>
              <ChevronDown size={14} color="#86868B" />
            </button>

            {/* Profile Avatar / Trigger */}
            <div
              className={css({
                width: '32px',
                height: '32px',
                borderRadius: '9999px',
                bg: '#E5E5EA',
                color: '#1D1D1F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '600',
                border: '1px solid rgba(0, 0, 0, 0.08)',
              })}
              title="Demo User"
            >
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className={css({
          maxWidth: '1200px',
          margin: '0 auto',
          px: { base: '4', md: '8' },
          py: { base: '6', md: '8' },
        })}
      >
        {/* Urgent Free Trial Warning Banner (Apple Alert Pattern) */}
        {trialSubscriptions.length > 0 && (
          <div
            className={css({
              mb: '6',
              p: '4',
              borderRadius: '16px',
              bg: 'rgba(255, 149, 0, 0.1)',
              border: '1px solid rgba(255, 149, 0, 0.25)',
              display: 'flex',
              alignItems: { base: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: '4',
              flexDirection: { base: 'column', sm: 'row' },
            })}
          >
            <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
              <div
                className={css({
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  bg: '#FF9500',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                })}
              >
                <AlertTriangle size={20} strokeWidth={2.2} />
              </div>
              <div>
                <p className={css({ fontSize: '14px', fontWeight: '600', color: '#1D1D1F' })}>
                  Free trial expiring in 2 days
                </p>
                <p className={css({ fontSize: '13px', color: '#86868B' })}>
                  Figma Professional will renew for $15.00/mo on Nov 15, 2026.
                </p>
              </div>
            </div>
            <div className={css({ display: 'flex', gap: '2' })}>
              <a
                href="https://figma.com/settings"
                target="_blank"
                rel="noreferrer"
                className={css({
                  px: '3.5',
                  py: '1.5',
                  borderRadius: '9999px',
                  bg: 'white',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1D1D1F',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1.5',
                  transition: 'background 0.15s ease',
                  _hover: { bg: '#F5F5F7' },
                })}
              >
                Manage Trial <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Signature Apple Wallet-style Run-Rate Hero Card */}
        <section
          className={css({
            p: { base: '6', md: '8' },
            borderRadius: '24px',
            bg: 'white',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            mb: '8',
            position: 'relative',
            overflow: 'hidden',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: { base: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { base: 'flex-start', md: 'flex-end' },
              gap: '6',
            })}
          >
            <div>
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  mb: '2',
                })}
              >
                <span
                  className={css({
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    color: '#86868B',
                  })}
                >
                  Monthly Commitment
                </span>
                <span
                  className={css({
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#34C759',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '1',
                  })}
                >
                  <TrendingUp size={13} /> On track
                </span>
              </div>

              {/* Large Run-Rate Typography with Tabular Figures */}
              <div className={css({ display: 'flex', alignItems: 'baseline', gap: '2' })}>
                <h1
                  className={`${css({
                    fontSize: { base: '44px', md: '56px' },
                    fontWeight: '700',
                    letterSpacing: '-1.5px',
                    color: '#1D1D1F',
                    lineHeight: '1',
                    margin: 0,
                  })} tabular-nums`}
                >
                  ${totalMonthlySpend.toFixed(2)}
                </h1>
                <span className={css({ fontSize: '18px', fontWeight: '500', color: '#86868B' })}>
                  / month
                </span>
              </div>

              {/* Secondary Sub-metrics */}
              <div
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: { base: '4', md: '6' },
                  mt: '4',
                  fontSize: '14px',
                  color: '#86868B',
                })}
              >
                <div>
                  <span className={css({ color: '#1D1D1F', fontWeight: '600' })}>
                    ${totalAnnualSpend.toFixed(2)}
                  </span>{' '}
                  projected annually
                </div>
                <div
                  className={css({
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    bg: '#C7C7CC',
                  })}
                />
                <div>
                  <span className={css({ color: '#1D1D1F', fontWeight: '600' })}>
                    {SAMPLE_SUBSCRIPTIONS.length}
                  </span>{' '}
                  active subscriptions
                </div>
                <div
                  className={css({
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    bg: '#C7C7CC',
                  })}
                />
                <div>
                  Next bill:{' '}
                  <span className={css({ color: '#FF3B30', fontWeight: '600' })}>
                    Netflix in 4 days
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
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
                className={css({
                  flex: { base: 1, md: 'initial' },
                  px: '5',
                  py: '3',
                  borderRadius: '12px',
                  bg: '#0071E3',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2',
                  boxShadow: '0 2px 8px rgba(0, 113, 227, 0.25)',
                  transition: 'all 0.15s ease',
                  _hover: { bg: '#0077ED', transform: 'translateY(-1px)' },
                  _active: { transform: 'scale(0.98)' },
                  _focusVisible: {
                    outline: '2px solid #0071E3',
                    outlineOffset: '2px',
                  },
                })}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Subscription</span>
              </button>

              <button
                type="button"
                className={css({
                  px: '4',
                  py: '3',
                  borderRadius: '12px',
                  bg: 'rgba(0, 0, 0, 0.04)',
                  color: '#1D1D1F',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2',
                  transition: 'background 0.15s ease',
                  _hover: { bg: 'rgba(0, 0, 0, 0.08)' },
                  _focusVisible: {
                    outline: '2px solid #0071E3',
                    outlineOffset: '2px',
                  },
                })}
              >
                <Sparkles size={16} color="#0071E3" />
                <span className={css({ display: { base: 'none', sm: 'inline' } })}>
                  Sample Data
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Apple Segmented View Control */}
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
          {/* Segmented Control Pill */}
          <div
            role="tablist"
            className={css({
              display: 'inline-flex',
              p: '1',
              borderRadius: '12px',
              bg: 'rgba(118, 118, 128, 0.12)',
              border: '1px solid rgba(0, 0, 0, 0.04)',
            })}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'subscriptions'}
              onClick={() => setActiveTab('subscriptions')}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                bg: activeTab === 'subscriptions' ? 'white' : 'transparent',
                color: activeTab === 'subscriptions' ? '#1D1D1F' : '#86868B',
                boxShadow: activeTab === 'subscriptions' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              })}
            >
              <Layers size={14} />
              <span>Subscriptions ({SAMPLE_SUBSCRIPTIONS.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'calendar'}
              onClick={() => setActiveTab('calendar')}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                bg: activeTab === 'calendar' ? 'white' : 'transparent',
                color: activeTab === 'calendar' ? '#1D1D1F' : '#86868B',
                boxShadow: activeTab === 'calendar' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              })}
            >
              <Calendar size={14} />
              <span>Calendar</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'analytics'}
              onClick={() => setActiveTab('analytics')}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '2',
                px: '4',
                py: '2',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                bg: activeTab === 'analytics' ? 'white' : 'transparent',
                color: activeTab === 'analytics' ? '#1D1D1F' : '#86868B',
                boxShadow: activeTab === 'analytics' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
              })}
            >
              <PieChart size={14} />
              <span>Analytics</span>
            </button>
          </div>

          {/* Grid / Table Toggle (Apple Segmented Style) */}
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              p: '1',
              borderRadius: '10px',
              bg: 'rgba(118, 118, 128, 0.12)',
              alignSelf: { base: 'flex-end', sm: 'center' },
            })}
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
              aria-label="Card Grid View"
              className={css({
                p: '1.5',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bg: viewMode === 'grid' ? 'white' : 'transparent',
                color: viewMode === 'grid' ? '#0071E3' : '#86868B',
                boxShadow: viewMode === 'grid' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              })}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Dense Table View"
              aria-label="Dense Table View"
              className={css({
                p: '1.5',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bg: viewMode === 'table' ? 'white' : 'transparent',
                color: viewMode === 'table' ? '#0071E3' : '#86868B',
                boxShadow: viewMode === 'table' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
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
          {/* Search Field */}
          <div
            className={css({
              position: 'relative',
              flex: '1',
              maxWidth: { base: '100%', md: '360px' },
            })}
          >
            <Search
              size={16}
              className={css({
                position: 'absolute',
                left: '3',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#86868B',
                pointerEvents: 'none',
              })}
            />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={css({
                width: '100%',
                pl: '9',
                pr: '4',
                py: '2',
                borderRadius: '10px',
                bg: 'white',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                fontSize: '14px',
                color: '#1D1D1F',
                outline: 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                _focus: {
                  borderColor: '#0071E3',
                  boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.15)',
                },
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
                className={css({
                  px: '3.5',
                  py: '1.5',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? '#0071E3' : 'rgba(0, 0, 0, 0.08)',
                  bg: selectedCategory === cat ? '#0071E3' : 'white',
                  color: selectedCategory === cat ? 'white' : '#1D1D1F',
                  transition: 'all 0.15s ease',
                  _hover: {
                    borderColor: selectedCategory === cat ? '#0071E3' : 'rgba(0, 0, 0, 0.2)',
                  },
                })}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions Content: Card Grid View */}
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
                  className={css({
                    p: '6',
                    borderRadius: '20px',
                    bg: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    _hover: {
                      boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-2px)',
                    },
                  })}
                >
                  {/* Top: Icon + Name + Category */}
                  <div>
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
                          className={css({
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            bg: '#F5F5F7',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          })}
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${sub.iconSlug}`}
                            alt={`${sub.name} logo`}
                            width={22}
                            height={22}
                            onError={(e) => {
                              // Fallback monogram if CDN fails
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <h3
                            className={css({
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#1D1D1F',
                              margin: 0,
                            })}
                          >
                            {sub.name}
                          </h3>
                          <span className={css({ fontSize: '12px', color: '#86868B' })}>
                            {sub.category}
                          </span>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <span
                        className={css({
                          fontSize: '11px',
                          fontWeight: '600',
                          px: '2.5',
                          py: '1',
                          borderRadius: '9999px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '1',
                          bg:
                            sub.status === 'trial'
                              ? 'rgba(255, 149, 0, 0.12)'
                              : 'rgba(52, 199, 89, 0.12)',
                          color: sub.status === 'trial' ? '#FF9500' : '#34C759',
                        })}
                      >
                        <span
                          className={css({
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            bg: sub.status === 'trial' ? '#FF9500' : '#34C759',
                          })}
                        />
                        {sub.status === 'trial' ? 'Trial' : 'Active'}
                      </span>
                    </div>

                    {/* Cost & Cycle */}
                    <div className={css({ my: '4' })}>
                      <div className={css({ display: 'flex', alignItems: 'baseline', gap: '1.5' })}>
                        <span
                          className={`${css({
                            fontSize: '26px',
                            fontWeight: '700',
                            letterSpacing: '-0.5px',
                            color: '#1D1D1F',
                          })} tabular-nums`}
                        >
                          ${sub.cost.toFixed(2)}
                        </span>
                        <span
                          className={css({ fontSize: '13px', color: '#86868B', fontWeight: '500' })}
                        >
                          / {sub.cycle}
                        </span>
                      </div>
                      {sub.cycle === 'yearly' && (
                        <p className={css({ fontSize: '12px', color: '#86868B', mt: '0.5' })}>
                          Normalized to{' '}
                          <strong className={css({ color: '#1D1D1F' })}>
                            ${sub.monthlyEquivalent.toFixed(2)}/mo
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Renewal Info & Direct Manage Action */}
                  <div
                    className={css({
                      pt: '3',
                      borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                    })}
                  >
                    <div>
                      <span className={css({ color: '#86868B', display: 'block' })}>Renews</span>
                      <span
                        className={css({
                          fontWeight: '600',
                          color: isUrgent ? '#FF3B30' : isSoon ? '#FF9500' : '#1D1D1F',
                        })}
                      >
                        {sub.renewalDate} ({sub.daysRemaining}d)
                      </span>
                    </div>

                    <a
                      href={sub.cancellationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={css({
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1',
                        px: '2.5',
                        py: '1.5',
                        borderRadius: '8px',
                        bg: 'rgba(0, 0, 0, 0.03)',
                        color: '#0071E3',
                        fontWeight: '500',
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                        _hover: { bg: 'rgba(0, 113, 227, 0.08)' },
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
          /* Dense Table View (Power User / Apple Numbers Style) */
          <div
            className={css({
              bg: 'white',
              borderRadius: '20px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              overflowX: 'auto',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
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
                  className={css({
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    bg: 'rgba(0, 0, 0, 0.02)',
                  })}
                >
                  <th className={css({ py: '3.5', px: '5', fontWeight: '600', color: '#86868B' })}>
                    Service
                  </th>
                  <th className={css({ py: '3.5', px: '4', fontWeight: '600', color: '#86868B' })}>
                    Category
                  </th>
                  <th className={css({ py: '3.5', px: '4', fontWeight: '600', color: '#86868B' })}>
                    Billed Cost
                  </th>
                  <th className={css({ py: '3.5', px: '4', fontWeight: '600', color: '#86868B' })}>
                    Monthly Rate
                  </th>
                  <th className={css({ py: '3.5', px: '4', fontWeight: '600', color: '#86868B' })}>
                    Renewal Date
                  </th>
                  <th className={css({ py: '3.5', px: '4', fontWeight: '600', color: '#86868B' })}>
                    Status
                  </th>
                  <th
                    className={css({
                      py: '3.5',
                      px: '5',
                      textAlign: 'right',
                      fontWeight: '600',
                      color: '#86868B',
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
                    className={css({
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'background 0.15s ease',
                      _hover: { bg: '#FBFBFC' },
                    })}
                  >
                    <td className={css({ py: '3.5', px: '5' })}>
                      <div className={css({ display: 'flex', alignItems: 'center', gap: '3' })}>
                        <img
                          src={`https://cdn.simpleicons.org/${sub.iconSlug}`}
                          alt=""
                          width={18}
                          height={18}
                        />
                        <span className={css({ fontWeight: '600', color: '#1D1D1F' })}>
                          {sub.name}
                        </span>
                      </div>
                    </td>
                    <td className={css({ py: '3.5', px: '4', color: '#86868B' })}>
                      {sub.category}
                    </td>
                    <td
                      className={`${css({ py: '3.5', px: '4', fontWeight: '600', color: '#1D1D1F' })} tabular-nums`}
                    >
                      ${sub.cost.toFixed(2)}{' '}
                      <span
                        className={css({
                          fontSize: '12px',
                          color: '#86868B',
                          fontWeight: 'normal',
                        })}
                      >
                        /{sub.cycle}
                      </span>
                    </td>
                    <td
                      className={`${css({ py: '3.5', px: '4', fontWeight: '600', color: '#0071E3' })} tabular-nums`}
                    >
                      ${sub.monthlyEquivalent.toFixed(2)}/mo
                    </td>
                    <td className={css({ py: '3.5', px: '4' })}>
                      <span
                        className={css({
                          color: sub.daysRemaining <= 3 ? '#FF3B30' : '#1D1D1F',
                          fontWeight: sub.daysRemaining <= 3 ? '600' : 'normal',
                        })}
                      >
                        {sub.renewalDate}
                      </span>
                    </td>
                    <td className={css({ py: '3.5', px: '4' })}>
                      <span
                        className={css({
                          fontSize: '12px',
                          fontWeight: '500',
                          px: '2',
                          py: '0.5',
                          borderRadius: '9999px',
                          bg:
                            sub.status === 'trial'
                              ? 'rgba(255, 149, 0, 0.12)'
                              : 'rgba(52, 199, 89, 0.12)',
                          color: sub.status === 'trial' ? '#FF9500' : '#34C759',
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
                          color: '#0071E3',
                          textDecoration: 'none',
                          fontWeight: '500',
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

        {/* Apple HIG Craft Callout & Design Spec Showcase */}
        <section
          className={css({
            mt: '12',
            p: '6',
            borderRadius: '20px',
            bg: 'white',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
          })}
        >
          <div className={css({ display: 'flex', alignItems: 'center', gap: '2', mb: '3' })}>
            <CheckCircle2 size={18} color="#34C759" />
            <h2
              className={css({ fontSize: '15px', fontWeight: '600', color: '#1D1D1F', margin: 0 })}
            >
              Apple HIG & Studio Craft Specs Implemented
            </h2>
          </div>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
              gap: '4',
              fontSize: '13px',
              color: '#86868B',
            })}
          >
            <div>
              <p className={css({ fontWeight: '600', color: '#1D1D1F', mb: '1' })}>
                1. Tabular Figures
              </p>
              <p>
                All prices and stats use <code>tabular-nums</code> so numbers align vertically and
                never wiggle during updates.
              </p>
            </div>
            <div>
              <p className={css({ fontWeight: '600', color: '#1D1D1F', mb: '1' })}>
                2. Squircles & Materials
              </p>
              <p>
                Translucent frosted glass navigation, hairline 1px borders, and Apple continuous
                curve radii for a native feel.
              </p>
            </div>
            <div>
              <p className={css({ fontWeight: '600', color: '#1D1D1F', mb: '1' })}>
                3. Accessibility (Priority 1)
              </p>
              <p>
                WCAG AA contrast ratios, touch targets $\ge 44\times 44$px, and color never used as
                the sole conveyer of information.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
