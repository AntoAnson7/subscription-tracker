import { ReactNode } from 'react';
import { backgroundStyles } from '@/modules/common/recipes/background.recipe';

interface AppBackgroundProps {
  children: ReactNode;
}

export function AppBackground({ children }: AppBackgroundProps) {
  const classes = backgroundStyles();

  return (
    <div className={classes.shell}>
      <div className={`${classes.ambientMesh} ambient-animated`} />
      {children}
    </div>
  );
}
