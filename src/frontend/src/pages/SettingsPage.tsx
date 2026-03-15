import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Info,
  KeyRound,
  Loader2,
  RefreshCw,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import { useActor } from "../hooks/useActor";
import { LANGUAGES } from "../i18n";
import type { Lang } from "../i18n";
import { getProfile, saveProfile } from "../utils/storage";

export default function SettingsPage() {
  const { t, lang, setLang } = useLang();
  const { actor, isFetching } = useActor();
  const [profile, setProfile] = useState(getProfile);
  const [username, setUsername] = useState(profile.username);

  // API Keys state
  const [cricketKey, setCricketKey] = useState("");
  const [footballKey, setFootballKey] = useState("");
  const [savingKeys, setSavingKeys] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [keysLoaded, setKeysLoaded] = useState(false);

  // Load existing keys on mount
  useEffect(() => {
    if (!actor || isFetching || keysLoaded) return;
    async function loadKeys() {
      try {
        const keys = await (actor as any).getApiKeys();
        if (keys) {
          setCricketKey(keys.cricket ?? "");
          setFootballKey(keys.football ?? "");
        }
      } catch {
        // Backend method not available yet
      } finally {
        setKeysLoaded(true);
      }
    }
    loadKeys();
  }, [actor, isFetching, keysLoaded]);

  function handleSaveUsername() {
    const trimmed = username.trim();
    if (!trimmed) {
      toast.error("Username cannot be empty");
      return;
    }
    const updated = { ...profile, username: trimmed };
    setProfile(updated);
    saveProfile(updated);
    toast.success("Username saved!");
  }

  function handleLangChange(code: Lang) {
    setLang(code);
    const updated = { ...profile, language: code };
    setProfile(updated);
    saveProfile(updated);
  }

  async function handleSaveApiKeys() {
    if (!actor) {
      toast.error("Not connected to backend");
      return;
    }
    setSavingKeys(true);
    try {
      await (actor as any).setApiKeys(cricketKey.trim(), footballKey.trim());
      // Trigger immediate cache refresh
      try {
        await (actor as any).fetchAndCacheMatches();
      } catch {
        // Non-critical
      }
      toast.success("API keys saved! Match data will refresh shortly.");
    } catch {
      toast.error("Failed to save API keys. Try again.");
    } finally {
      setSavingKeys(false);
    }
  }

  async function handleRefreshNow() {
    if (!actor) {
      toast.error("Not connected to backend");
      return;
    }
    setRefreshing(true);
    try {
      const success = await (actor as any).fetchAndCacheMatches();
      if (success) {
        toast.success("Match data refreshed successfully!");
      } else {
        toast.error("Refresh failed. Check your API keys in settings.");
      }
    } catch {
      toast.error("Refresh failed. Make sure API keys are set.");
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <h1 className="font-display font-bold text-xl text-foreground">
          {t("settings")}
        </h1>
        <p className="text-xs text-muted-foreground">
          Customize your SportsCast
        </p>
      </header>

      <main className="px-4 py-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <User size={16} className="text-primary" />
                {t("myProfile")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2.5 border border-primary/20">
                <Zap size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {t("totalPoints")}:
                </span>
                <span className="font-bold text-primary text-lg">
                  {profile.totalPoints}
                </span>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm text-foreground">
                  Username
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="username"
                    data-ocid="settings.username.input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="bg-secondary/50"
                    onKeyDown={(e) => e.key === "Enter" && handleSaveUsername()}
                  />
                  <Button
                    data-ocid="settings.username.save_button"
                    className="bg-primary text-primary-foreground shrink-0"
                    onClick={handleSaveUsername}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Keys Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <KeyRound size={16} className="text-primary" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="cricket-key"
                  className="text-sm text-foreground"
                >
                  Cricket API Key
                  <span className="ml-1.5 text-muted-foreground text-xs">
                    (CricAPI)
                  </span>
                </Label>
                <Input
                  id="cricket-key"
                  data-ocid="settings.cricket_key.input"
                  type="password"
                  value={cricketKey}
                  onChange={(e) => setCricketKey(e.target.value)}
                  placeholder="Enter CricAPI key"
                  className="bg-secondary/50 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="football-key"
                  className="text-sm text-foreground"
                >
                  Football API Key
                  <span className="ml-1.5 text-muted-foreground text-xs">
                    (API-Football)
                  </span>
                </Label>
                <Input
                  id="football-key"
                  data-ocid="settings.football_key.input"
                  type="password"
                  value={footballKey}
                  onChange={(e) => setFootballKey(e.target.value)}
                  placeholder="Enter API-Football key"
                  className="bg-secondary/50 font-mono text-sm"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  data-ocid="settings.api_keys.save_button"
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={handleSaveApiKeys}
                  disabled={savingKeys || !actor}
                >
                  {savingKeys ? (
                    <>
                      <Loader2 size={14} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save API Keys"
                  )}
                </Button>
                <Button
                  data-ocid="settings.api_keys.secondary_button"
                  variant="outline"
                  className="shrink-0"
                  onClick={handleRefreshNow}
                  disabled={refreshing || !actor}
                  title="Refresh match data now"
                >
                  {refreshing ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <RefreshCw size={14} />
                  )}
                </Button>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                🔒 Keys are stored securely on the ICP blockchain. Match data
                refreshes automatically every 24 hours. Use the refresh button
                to update immediately.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Globe size={16} className="text-primary" />
                {t("language")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    data-ocid="settings.language.toggle"
                    onClick={() => handleLangChange(language.code)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                      lang === language.code
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-foreground hover:border-primary/40"
                    }`}
                  >
                    <span className="font-medium text-sm">
                      {language.label}
                    </span>
                    <span className="text-sm opacity-70">
                      {language.native}
                    </span>
                    {lang === language.code && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Info size={16} className="text-primary" />
                {t("about")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {t("version")}
                </span>
                <span className="text-sm text-foreground font-mono">1.0.0</span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <span className="text-sm text-foreground">Dark Mode</span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Platform</span>
                <span className="text-sm text-foreground">Web (ICP)</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </main>
    </div>
  );
}
