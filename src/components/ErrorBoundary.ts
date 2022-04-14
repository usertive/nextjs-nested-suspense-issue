import {Component, ErrorInfo, ReactNode} from 'react';

export interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: unknown;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {hasError: false, error: null};

  static getDerivedStateFromError(error: unknown) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    if(typeof window.reportError == 'function') {
      window.reportError(error !== undefined ? error : 'Unknown error');
      if(errorInfo) window.reportError(errorInfo);
    } else {
      console.error(error, errorInfo);
    }
  }

  render() {
    if(this.state.hasError) return this.props.fallback;
    else return this.props.children;
  }
}
