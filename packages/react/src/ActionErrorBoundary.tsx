import { Component, createContext, useContext, type ReactNode } from "react";

type ActionErrorContextValue = {
  error: unknown;
  reset: () => void;
};

const ActionErrorContext = createContext<ActionErrorContextValue | null>(null);

export type ActionErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode | ((props: { error: unknown; reset: () => void }) => ReactNode);
  onError?: (error: unknown) => void;
};

type State = {
  hasError: boolean;
  error: unknown;
};

export class ActionErrorBoundary extends Component<ActionErrorBoundaryProps, State> {
  constructor(props: ActionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown): void {
    this.props.onError?.(error);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const ctx: ActionErrorContextValue = {
        error: this.state.error,
        reset: this.reset,
      };

      const { fallback } = this.props;

      return (
        <ActionErrorContext.Provider value={ctx}>
          {typeof fallback === "function" ? fallback({ error: this.state.error, reset: this.reset }) : fallback}
        </ActionErrorContext.Provider>
      );
    }

    return this.props.children;
  }
}

export function useActionErrorReset(): ActionErrorContextValue {
  const ctx = useContext(ActionErrorContext);

  if (!ctx) {
    throw new Error(
      "useActionErrorReset must be used within an ActionErrorBoundary fallback.",
    );
  }

  return ctx;
}
