import { createContext, useCallback, useContext, useState } from 'react';
import { ErrorModal } from '../components/ErrorModal';

interface ErrorModalOptions {
  title?: string;
  message: string;
  actionLabel?: string;
}

interface ErrorModalContextValue {
  showError: (opts: ErrorModalOptions | string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextValue | null>(null);

export function ErrorModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ErrorModalOptions>({ message: '' });

  const showError = useCallback((opts: ErrorModalOptions | string) => {
    if (typeof opts === 'string') {
      setOptions({ message: opts });
    } else {
      setOptions(opts);
    }
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <ErrorModal
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        actionLabel={options.actionLabel}
        onClose={handleClose}
      />
    </ErrorModalContext.Provider>
  );
}

export function useErrorModal() {
  const ctx = useContext(ErrorModalContext);
  if (!ctx) {
    throw new Error('useErrorModal must be used within ErrorModalProvider');
  }
  return ctx;
}
