import { skeletonStyles } from '@/modules/common/recipes/skeleton.recipe';
import { subscriptionTableStyles } from '@/modules/subscriptions/recipes/subscriptionTable.recipe';

interface SubscriptionTableSkeletonProps {
  rows?: number;
}

export function SubscriptionTableSkeleton({ rows = 5 }: SubscriptionTableSkeletonProps) {
  const tableClasses = subscriptionTableStyles();
  const skelClasses = skeletonStyles();
  const rowList = Array.from({ length: rows }, (_, i) => i);

  return (
    <div
      role="status"
      aria-label="Loading subscriptions table"
      aria-busy="true"
      className={tableClasses.root}
    >
      <table className={tableClasses.table}>
        <thead className={tableClasses.thead}>
          <tr>
            <th className={tableClasses.th}>Service</th>
            <th className={tableClasses.th}>Category</th>
            <th className={tableClasses.th}>Cost</th>
            <th className={tableClasses.th}>Cycle</th>
            <th className={tableClasses.th}>Monthly Equiv.</th>
            <th className={tableClasses.th}>Next Renewal</th>
            <th className={tableClasses.th}>Status</th>
            <th className={tableClasses.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rowList.map((key) => (
            <tr key={key} className={tableClasses.tr}>
              <td className={tableClasses.td}>
                <div className={tableClasses.brandCell}>
                  <div
                    className={`${skelClasses.circle} empty-set__skeleton`}
                    data-depth="0"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <div
                    className={`${skelClasses.bone} empty-set__skeleton`}
                    data-depth="1"
                    style={{ width: '90px', height: '16px' }}
                  />
                </div>
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="0"
                  style={{ width: '70px', height: '14px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="1"
                  style={{ width: '50px', height: '14px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="0"
                  style={{ width: '40px', height: '14px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="1"
                  style={{ width: '50px', height: '14px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="0"
                  style={{ width: '80px', height: '14px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.pill} empty-set__skeleton`}
                  data-depth="1"
                  style={{ width: '56px', height: '20px' }}
                />
              </td>
              <td className={tableClasses.td}>
                <div
                  className={`${skelClasses.bone} empty-set__skeleton`}
                  data-depth="0"
                  style={{ width: '45px', height: '14px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="sr-only">Loading subscriptions table...</span>
    </div>
  );
}
