import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { chartCardStyles } from '@/modules/analytics/recipes/chartCard.recipe';
import { CategorySpend } from '@/modules/analytics/types/analytics.types';

interface CategorySpendCardProps {
  categories: CategorySpend[];
  prefersReducedMotion?: boolean;
}

export function CategorySpendCard({
  categories,
  prefersReducedMotion = false,
}: CategorySpendCardProps) {
  const { format } = useCurrency();
  const classes = chartCardStyles();

  if (categories.length === 0) {
    return (
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.titleGroup}>
            <h3 className={classes.title}>Spend by category</h3>
            <span className={classes.subtitle}>Monthly breakdown across domains</span>
          </div>
        </div>
        <div className={classes.emptyState}>No subscription categories found</div>
      </div>
    );
  }

  const chartData = categories.map((cat) => ({
    name: cat.category,
    value: cat.amount,
    color: cat.color,
    percentage: cat.percentage,
    count: cat.count,
  }));

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.titleGroup}>
          <h3 className={classes.title}>Spend by category</h3>
          <span className={classes.subtitle}>Monthly breakdown across domains</span>
        </div>
        <span className={classes.badge}>{categories.length} categories</span>
      </div>

      <div className={classes.chartArea} style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              isAnimationActive={!prefersReducedMotion}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: unknown) => [
                typeof value === 'number' ? format(value) : String(value),
                'Monthly spend',
              ]}
              contentStyle={{
                backgroundColor: 'rgba(24, 24, 27, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '12px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={classes.legendList}>
        {categories.map((cat) => (
          <div key={cat.category} className={classes.legendItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={classes.legendDot} style={{ backgroundColor: cat.color }} />
              <span className={classes.legendText}>{cat.category}</span>
              <span style={{ fontSize: '11px', color: '#A1A1AA' }}>
                ({cat.count} {cat.count === 1 ? 'sub' : 'subs'})
              </span>
            </div>
            <span className={classes.legendAmount}>
              {format(cat.amount)}{' '}
              <span style={{ fontSize: '11px', color: '#A1A1AA' }}>({cat.percentage}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
