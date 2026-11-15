import { appleSpecsStyles } from '@/modules/landing/recipes/appleSpecs.recipe';
import { APPLE_SPECS } from '@/modules/landing/utils/appleSpecs.data';

export function AppleSpecsTable() {
  const classes = appleSpecsStyles();

  return (
    <section id="specs" className={classes.section}>
      <div className={classes.header}>
        <span className={classes.eyebrow}>Comparison</span>
        <h2 className={classes.title}>Engineered specifically for subscriptions.</h2>
      </div>

      <div className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <th className={classes.th}>Capability</th>
              <th className={`${classes.th} ${classes.thActive}`}>SubTrack</th>
              <th className={classes.th}>Budget Apps</th>
              <th className={classes.th}>Spreadsheets</th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {APPLE_SPECS.map((spec) => (
              <tr key={spec.feature} className={classes.tr}>
                <td className={classes.tdFeature}>{spec.feature}</td>
                <td className={classes.tdSubtrack}>{String(spec.subtrack)}</td>
                <td className={classes.tdOther}>{String(spec.traditional)}</td>
                <td className={classes.tdOther}>{String(spec.spreadsheets)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
