import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useCurrency } from '@/modules/common/hooks/useCurrency';
import { chartCardStyles } from '@/modules/analytics/recipes/chartCard.recipe';
import { MonthlyCashflow } from '@/modules/analytics/types/analytics.types';

interface CashflowProjectionCardProps {
  cashflow: MonthlyCashflow[];
  prefersReducedMotion?: boolean;
}

export function CashflowProjectionCard({
  cashflow,
  prefersReducedMotion = false,
}: CashflowProjectionCardProps) {
  const { format } = useCurrency();
  const classes = chartCardStyles();

  const total12MonthSpend = cashflow.reduce((acc, c) => acc + c.totalSpend, 0);

  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <div className={classes.titleGroup}>
          <h3 className={classes.title}>12-month cashflow projection</h3>
          <span className={classes.subtitle}>Forecasted subscription charges by month</span>
        </div>
        <span className={classes.badge}>12-mo total: {format(total12MonthSpend)}</span>
      </div>

      <div className={classes.chartArea} style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height={260} minWidth={0} minHeight={0} debounce={50}>
          <BarChart data={cashflow} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="label"
              stroke="#A1A1AA"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#A1A1AA"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
            />
            <Tooltip
              formatter={(value: unknown) => [
                typeof value === 'number' ? format(value) : String(value),
                'Projected spend',
              ]}
              labelFormatter={(_label, payload) => {
                const item = payload?.[0]?.payload as MonthlyCashflow | undefined;
                return item ? `${item.fullLabel} (${item.count} renewals)` : '';
              }}
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
            <Bar
              dataKey="totalSpend"
              fill="#D97706"
              radius={[6, 6, 0, 0]}
              isAnimationActive={!prefersReducedMotion}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
