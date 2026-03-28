import { Toaster } from "@/components/ui/sonner";
import {
  BarChart2,
  Home,
  Settings,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import PWAInstallBanner from "./components/PWAInstallBanner";
import { LangProvider, useLang } from "./context/LangContext";
import { NotificationProvider } from "./context/NotificationContext";
import FriendsPage from "./pages/FriendsPage";
import GroupsPage from "./pages/GroupsPage";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import ShopPage from "./pages/ShopPage";
import StatsPage from "./pages/StatsPage";

type Tab = "home" | "stats" | "groups" | "friends" | "shop" | "settings";

function AppInner() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const { t } = useLang();

  const tabs: {
    id: Tab;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    labelKey: "home" | "stats" | "groups" | "friends" | "shop" | "settings";
  }[] = [
    {
      id: "home",
      icon: <Home size={20} />,
      activeIcon: <Home size={24} />,
      labelKey: "home",
    },
    {
      id: "stats",
      icon: <BarChart2 size={20} />,
      activeIcon: <BarChart2 size={24} />,
      labelKey: "stats",
    },
    {
      id: "groups",
      icon: <Users size={20} />,
      activeIcon: <Users size={24} />,
      labelKey: "groups",
    },
    {
      id: "friends",
      icon: <UserPlus size={20} />,
      activeIcon: <UserPlus size={24} />,
      labelKey: "friends",
    },
    {
      id: "shop",
      icon: <ShoppingBag size={20} />,
      activeIcon: <ShoppingBag size={24} />,
      labelKey: "shop",
    },
    {
      id: "settings",
      icon: <Settings size={20} />,
      activeIcon: <Settings size={24} />,
      labelKey: "settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PWAInstallBanner />

      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <HomePage />}
        {activeTab === "stats" && <StatsPage />}
        {activeTab === "groups" && <GroupsPage />}
        {activeTab === "friends" && <FriendsPage />}
        {activeTab === "shop" && <ShopPage />}
        {activeTab === "settings" && <SettingsPage />}
      </main>

      {/* Bottom Tab Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border safe-bottom z-50"
        style={{ boxShadow: "0 -4px 20px oklch(0.52 0.24 292 / 0.08)" }}
      >
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                data-ocid={`nav.${tab.id}.tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-1 transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive ? (
                  <span className="flex items-center justify-center rounded-xl bg-primary/10 px-3 py-1 neon-text-glow">
                    {tab.activeIcon}
                  </span>
                ) : (
                  <span>{tab.icon}</span>
                )}
                <span
                  className={`text-[9px] font-medium tracking-wide ${isActive ? "font-bold" : ""}`}
                >
                  {t(tab.labelKey)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <NotificationProvider>
        <AppInner />
      </NotificationProvider>
    </LangProvider>
  );
}
