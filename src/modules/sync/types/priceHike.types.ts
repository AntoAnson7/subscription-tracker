export interface PriceHikeAlert {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  currency: string;
  oldCost: number;
  newCost: number;
  percentageIncrease: number;
  monthlyDifference: number;
  annualDifference: number;
  sourceSubject?: string;
  detectedAt: string;
  status: 'pending' | 'applied' | 'dismissed';
}
