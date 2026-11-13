import { sva } from 'styled-system/css';

export const backgroundStyles = sva({
  slots: ['shell', 'ambientMesh'],
  base: {
    shell: {
      minHeight: '100vh',
      position: 'relative',
      background: 'bg.canvas',
      color: 'text.primary',
      transition: 'all 0.3s ease',
    },
    ambientMesh: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.9,
      transition: 'background-image 0.5s ease',
      bgGradient: 'ambientMesh',
    },
  },
});
