import { sva } from 'styled-system/css';

export const layoutStyles = sva({
  slots: ['mainContainer', 'contentSection'],
  base: {
    mainContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      px: { base: '200', md: '400' },
      py: { base: '300', md: '400' },
      position: 'relative',
      zIndex: 1,
    },
    contentSection: {
      mt: '300',
    },
  },
});
