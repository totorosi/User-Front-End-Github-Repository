import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  removing?: boolean;
}

interface ConfirmState {
  message: string;
  resolve: (value: boolean) => void;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
  confirmDialog: (message: string) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}

const ICON_MAP = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const COLOR_MAP = {
  success: {
    bg: 'bg-green-50 border-green-300',
    icon: 'text-green-500',
    text: 'text-green-800',
  },
  error: {
    bg: 'bg-red-50 border-red-300',
    icon: 'text-red-500',
    text: 'text-red-800',
  },
  info: {
    bg: 'bg-blue-50 border-blue-300',
    icon: 'text-blue-500',
    text: 'text-blue-800',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-300',
    icon: 'text-yellow-500',
    text: 'text-yellow-800',
  },
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, removing: true } : n)));
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300);
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = 'info') => {
      const id = nextId.current++;
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 3000);
    },
    [dismiss],
  );

  const confirmDialog = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirm({ message, resolve });
    });
  }, []);

  const handleConfirmResult = (result: boolean) => {
    confirm?.resolve(result);
    setConfirm(null);
  };

  return (
    <NotificationContext.Provider value={{ notify, confirmDialog }}>
      {children}

      {/* ── Notification Toasts ── */}
      <div
        style={{ pointerEvents: 'none' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 w-full max-w-sm px-4"
      >
        {notifications.map((n) => {
          const Icon = ICON_MAP[n.type];
          const color = COLOR_MAP[n.type];
          return (
            <div
              key={n.id}
              style={{
                pointerEvents: 'auto',
                animation: n.removing
                  ? 'notif-slide-up 0.3s ease-in forwards'
                  : 'notif-slide-down 0.3s ease-out',
              }}
              className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${color.bg}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color.icon}`} />
              <p className={`text-sm font-medium flex-1 break-words ${color.text}`}>{n.message}</p>
              <button onClick={() => dismiss(n.id)} className="flex-shrink-0">
                <X className={`w-4 h-4 ${color.icon}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── Confirm Dialog ── */}
      {confirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div
            style={{ animation: 'notif-fade-in 0.2s ease-out' }}
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6"
          >
            <div className="flex items-start gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-base text-gray-800 whitespace-pre-line">{confirm.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleConfirmResult(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                취소
              </button>
              <button
                onClick={() => handleConfirmResult(true)}
                className="flex-1 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes notif-slide-down {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes notif-slide-up {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }
        @keyframes notif-fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </NotificationContext.Provider>
  );
}
