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
    labelKey: "home" | "stats" | "groups" | "friends" | "shop" | "settings";
  }[] = [
    { id: "home", icon: <Home size={22} />, labelKey: "home" },
    { id: "stats", icon: <BarChart2 size={22} />, labelKey: "stats" },
    { id: "groups", icon: <Users size={22} />, labelKey: "groups" },
    { id: "friends", icon: <UserPlus size={22} />, labelKey: "friends" },
    { id: "shop", icon: <ShoppingBag size={22} />, labelKey: "shop" },
    { id: "settings", icon: <Settings size={22} />, labelKey: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* PWA Install Banner */}
      <PWAInstallBanner />

      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <HomePage />}
        {activeTab === "stats" && <StatsPage />}
        {activeTab === "groups" && <GroupsPage />}
        {activeTab === "friends" && <FriendsPage />}
        {activeTab === "shop" && <ShopPage />}
        {activeTab === "settings" && <SettingsPage />}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-bottom z-50">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                data-ocid={`nav.${tab.id}.tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-2 transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={isActive ? "neon-text-glow" : ""}>
                  {tab.icon}
                </span>
                <span className="text-[9px] font-medium tracking-wide">
                  {t(tab.labelKey)}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
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
      <AppInner />
    </LangProvider>
  );
}
