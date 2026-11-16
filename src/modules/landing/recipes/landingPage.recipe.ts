import { sva } from 'styled-system/css';

export const landingPageStyles = sva({
  slots: ['root', 'content'],
  base: {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      bg: 'bg.canvas',
    },
    content: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
    },
  },
});
