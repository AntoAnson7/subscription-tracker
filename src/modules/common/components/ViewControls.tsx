import { Calendar, Grid3X3, PieChart, Table as TableIcon } from 'lucide-react';
import { css } from 'styled-system/css';
import { segmentedControlStyles } from '@/modules/common/recipes/segmentedControl.recipe';

interface ViewControlsProps {
  activeTab: 'subscriptions' | 'calendar' | 'analytics';
  viewMode: 'grid' | 'table';
  subscriptionsCount: number;
  onTabChange: (tab: 'subscriptions' | 'calendar' | 'analytics') => void;
  onViewModeChange: (mode: 'grid' | 'table') => void;
}

const activeTabStyle = css({
  background: '#FFFFFF !important',
  color: '#18181B !important',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  _dark: {
    background: '#27272A !important',
    color: '#FFFFFF !important',
  },
});

const activeToggleStyle = css({
  background: '#FFFFFF !important',
  color: '#D97706 !important',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  _dark: {
    background: '#27272A !important',
    color: '#F59E0B !important',
  },
});

export function ViewControls({
  activeTab,
  viewMode,
  subscriptionsCount,
  onTabChange,
  onViewModeChange,
}: ViewControlsProps) {
  const classes = segmentedControlStyles();

  return (
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
      <div className={classes.root}>
        <button
          type="button"
          onClick={() => onTabChange('subscriptions')}
          className={`${classes.tab} ${activeTab === 'subscriptions' ? activeTabStyle : ''}`}
        >
          <span>Subscriptions ({subscriptionsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('calendar')}
          className={`${classes.tab} ${activeTab === 'calendar' ? activeTabStyle : ''}`}
        >
          <Calendar size={14} />
          <span>Calendar</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange('analytics')}
          className={`${classes.tab} ${activeTab === 'analytics' ? activeTabStyle : ''}`}
        >
          <PieChart size={14} />
          <span>Analytics</span>
        </button>
      </div>

      <div className={classes.viewToggleWrapper}>
        <button
          type="button"
          onClick={() => onViewModeChange('grid')}
          aria-label="Grid view"
          className={`${classes.viewToggleBtn} ${viewMode === 'grid' ? activeToggleStyle : ''}`}
        >
          <Grid3X3 size={16} />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange('table')}
          aria-label="Table view"
          className={`${classes.viewToggleBtn} ${viewMode === 'table' ? activeToggleStyle : ''}`}
        >
          <TableIcon size={16} />
        </button>
      </div>
    </div>
  );
}
