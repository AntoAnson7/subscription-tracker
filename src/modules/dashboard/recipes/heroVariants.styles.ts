export const heroVariants = {
  isCompact: {
    true: {
      root: {
        p: { base: '150', sm: '200' },
        mb: '200',
      },
      contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '150',
      },
      leftGroup: {
        gap: '2px',
      },
      topRow: {
        mb: '0',
      },
      amountRow: {
        mt: '0',
      },
      amount: {
        fontSize: { base: '20px', sm: '26px' },
        letterSpacing: '-0.8px',
      },
      perMonth: {
        fontSize: { base: '13px', sm: '15px' },
      },
      activePillWrapper: {
        opacity: 0,
        maxHeight: '0px',
        overflow: 'hidden',
        pointerEvents: 'none',
      },
      annualCollapsible: {
        display: 'grid',
        gridTemplateRows: '0fr',
        opacity: 0,
        mt: '0',
        pointerEvents: 'none',
      },
      actionsRow: {
        mt: '0',
        flexShrink: 0,
      },
      primaryBtn: {
        px: { base: '150', sm: '200' },
        py: { base: '75', sm: '100' },
        fontSize: { base: '13px', sm: '14px' },
      },
    },
    false: {
      root: {
        p: { base: '300', md: '400' },
        mb: '400',
      },
      contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      },
      leftGroup: {
        gap: '0',
      },
      topRow: {
        mb: '100',
      },
      amountRow: {
        mt: '50',
      },
      amount: {
        fontSize: { base: '44px', md: '58px' },
        letterSpacing: '-1.5px',
      },
      perMonth: {
        fontSize: '20px',
      },
      activePillWrapper: {
        opacity: 1,
        maxHeight: '40px',
      },
      annualCollapsible: {
        display: 'grid',
        gridTemplateRows: '1fr',
        opacity: 1,
        mt: '100',
      },
      actionsRow: {
        mt: '300',
        display: 'flex',
        alignItems: 'center',
        gap: '150',
        flexWrap: 'wrap',
      },
      primaryBtn: {
        px: '250',
        py: '100',
        fontSize: '14px',
      },
    },
  },
};
