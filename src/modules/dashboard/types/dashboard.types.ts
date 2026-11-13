export interface RunRateMetrics {
  totalMonthlySpend: number;
  totalAnnualSpend: number;
  activeCount: number;
  nextBillName: string | null;
  nextBillDays: number | null;
}
