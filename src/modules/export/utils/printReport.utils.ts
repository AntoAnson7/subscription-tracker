import { toAnnualCost, toMonthlyCost } from '@/modules/subscriptions/utils/normalization.utils';
import { Subscription } from '@/modules/subscriptions/types/subscription.types';

export function printSubscriptionsReport(subscriptions: Subscription[], currency = 'USD'): void {
  if (typeof window === 'undefined') return;

  const totalMonthly = subscriptions.reduce((sum, s) => sum + toMonthlyCost(s.cost, s.cycle), 0);
  const totalAnnual = subscriptions.reduce((sum, s) => sum + toAnnualCost(s.cost, s.cycle), 0);

  const rowsHtml = subscriptions
    .map(
      (s) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;"><strong>${s.name}</strong></td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">${s.category}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">${s.cycle}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">${s.currency} ${s.cost.toFixed(2)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">${s.currency} ${toMonthlyCost(s.cost, s.cycle).toFixed(2)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e4e4e7;">${s.renewalDate}</td>
    </tr>`
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Subwise Subscription Expense Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 32px; color: #18181b; }
          h1 { margin: 0 0 4px 0; font-size: 24px; font-weight: 800; }
          p { margin: 0 0 24px 0; color: #71717a; font-size: 14px; }
          .summary { display: flex; gap: 32px; margin-bottom: 28px; background: #f4f4f5; padding: 16px 20px; border-radius: 12px; }
          .stat { display: flex; flex-direction: column; }
          .stat-label { font-size: 12px; color: #71717a; text-transform: uppercase; font-weight: 600; }
          .stat-val { font-size: 20px; font-weight: 700; color: #18181b; }
          table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
          th { background: #f4f4f5; padding: 10px 12px; font-weight: 700; border-bottom: 2px solid #d4d4d8; font-size: 12px; text-transform: uppercase; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <h1>Subwise Expense & Tax Report</h1>
            <p style="margin: 4px 0 0 0;">Generated on ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} • ${subscriptions.length} Subscriptions</p>
          </div>
          <div style="background: #18181b; padding: 4px 12px; border-radius: 9999px; display: inline-flex; align-items: center;">
            <img src="/subwise-full.png" alt="Subwise" style="height: 22px; width: auto;" />
          </div>
        </div>
        
        <div class="summary">
          <div class="stat">
            <span class="stat-label">Monthly Run-Rate</span>
            <span class="stat-val">${currency} ${totalMonthly.toFixed(2)}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Annual Projection</span>
            <span class="stat-val">${currency} ${totalAnnual.toFixed(2)}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Cycle</th>
              <th>Tracked Cost</th>
              <th>Monthly Equivalent</th>
              <th>Renewal Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
