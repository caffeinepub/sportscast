import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "pwa_install_dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if previously dismissed
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // Only show on mobile/tablet
    const isMobileOrTablet =
      /Mobi|Android|iPad|iPhone|Tablet/i.test(navigator.userAgent) ||
      window.innerWidth <= 1024;

    if (!isMobileOrTablet) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(DISMISSED_KEY, "1");
    }
    setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-ocid="pwa.banner"
      className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border"
      style={{ background: "#1a1a1a" }}
    >
      {/* Cricket ball icon */}
      <span className="text-xl flex-shrink-0">🏏</span>

      <p className="flex-1 text-sm font-medium text-foreground leading-tight">
        Add <span className="text-primary font-semibold">MatchMind</span> to
        your home screen
      </p>

      <button
        type="button"
        data-ocid="pwa.primary_button"
        onClick={handleInstall}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-background bg-primary hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
      >
        <Download size={12} />
        Install
      </button>

      <button
        type="button"
        data-ocid="pwa.close_button"
        onClick={handleDismiss}
        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1"
        aria-label="Dismiss install banner"
      >
        <X size={16} />
      </button>
    </div>
  );
}
