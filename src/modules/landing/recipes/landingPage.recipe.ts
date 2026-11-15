import { sva } from 'styled-system/css';

export const landingPageStyles = sva({
  slots: ['root', 'content', 'ambientGlow'],
  base: {
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden',
    },
    content: {
      flex: '1',
      position: 'relative',
      zIndex: 1,
    },
    ambientGlow: {
      position: 'absolute',
      top: '-150px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '800px',
      height: '450px',
      bgGradient: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, rgba(217, 119, 6, 0) 70%)',
      pointerEvents: 'none',
      zIndex: 0,
      filter: 'blur(60px)',
    },
  },
});
