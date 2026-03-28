import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "info" | "success" | "warning";
  read: boolean;
  createdAt: number;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAllRead: () => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

const STORAGE_KEY = "crick_notifications";

const SEED_NOTIFICATIONS: Omit<Notification, "id" | "read" | "createdAt">[] = [
  {
    title: "Welcome to Crick Mind! 🏏",
    body: "Start predicting IPL matches and climb the leaderboard.",
    type: "info",
  },
  {
    title: "IPL 2026 Season Starts March 28",
    body: "RCB vs SRH kicks off the season. Predictions open 2 days before!",
    type: "info",
  },
  {
    title: "How Predictions Work",
    body: "Predictions open 2 days before each match and close 5 minutes before start.",
    type: "info",
  },
];

function loadFromStorage(): Notification[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Notification[];
  } catch {
    return null;
  }
}

function saveToStorage(notifications: Notification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // ignore
  }
}

export function NotificationProvider({
  children,
}: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = loadFromStorage();
    if (stored && stored.length > 0) return stored;
    // Seed
    return SEED_NOTIFICATIONS.map((n, i) => ({
      ...n,
      id: `seed-${i}`,
      read: false,
      createdAt: Date.now() - (SEED_NOTIFICATIONS.length - i) * 60000,
    }));
  });

  useEffect(() => {
    saveToStorage(notifications);
  }, [notifications]);

  const addNotification = useCallback(
    (n: Omit<Notification, "id" | "read" | "createdAt">) => {
      setNotifications((prev) => [
        { ...n, id: `notif-${Date.now()}`, read: false, createdAt: Date.now() },
        ...prev,
      ]);
    },
    [],
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllRead,
        dismissNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  return ctx;
}
