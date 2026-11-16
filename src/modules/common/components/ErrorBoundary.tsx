import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { errorBoundaryStyles } from '@/modules/common/recipes/errorBoundary.recipe';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // Error caught defensively by boundary
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const classes = errorBoundaryStyles();

      return (
        <div className={classes.root} role="alert" aria-live="assertive">
          <div className={classes.container}>
            <div className={classes.iconWrapper}>
              <AlertTriangle size={24} />
            </div>
            <h1 className={classes.title}>Something went wrong</h1>
            <p className={classes.description}>
              An unexpected error occurred while rendering this view. Your saved subscriptions and
              data remain secure.
            </p>
            <div className={classes.actions}>
              <button type="button" onClick={this.handleReset} className={classes.retryBtn}>
                Try again
              </button>
              <button
                type="button"
                onClick={this.handleReload}
                className={classes.reloadBtn}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <RefreshCw size={12} />
                <span>Reload app</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
