import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Info } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { LANGUAGES } from "../i18n";
import type { Lang } from "../i18n";
import { getProfile, saveProfile } from "../utils/storage";

export default function SettingsPage() {
  const { t, lang, setLang } = useLang();
  const [profile, setProfile] = useState(getProfile);

  function handleLangChange(code: Lang) {
    setLang(code);
    const updated = { ...profile, language: code };
    setProfile(updated);
    saveProfile(updated);
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <h1 className="font-display font-bold text-xl text-foreground">
          {t("settings")}
        </h1>
        <p className="text-xs text-muted-foreground">
          Customize your Crick Mind
        </p>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
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

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
                <span className="text-sm text-foreground">Purple & White</span>
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
