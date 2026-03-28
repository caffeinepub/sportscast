import { Button } from "@/components/ui/button";
import { Loader2, Shield, Trophy, Users } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginScreen() {
  const { login } = useAuth();
  const { isLoggingIn } = useInternetIdentity();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between px-6 py-10"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.52 0.24 292 / 0.12) 0%, oklch(1 0 0) 40%, oklch(0.96 0.05 292) 100%)",
      }}
    >
      {/* Top branding */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/assets/generated/matchmind-logo-transparent.dim_200x60.png"
          alt="Crick Mind"
          className="h-14 w-auto object-contain"
        />
        <h1
          className="font-display font-bold text-3xl text-primary tracking-tight"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Crick Mind
        </h1>
        <p className="text-lg font-semibold text-foreground/80 tracking-wide">
          Predict. Compete. Win.
        </p>
      </motion.div>

      {/* Hero graphic / features */}
      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div
          className="w-full rounded-2xl p-6 space-y-4"
          style={{
            background: "oklch(1 0 0)",
            boxShadow: "0 4px 40px oklch(0.52 0.24 292 / 0.15)",
            border: "1px solid oklch(0.52 0.24 292 / 0.15)",
          }}
        >
          <p className="text-center text-sm text-muted-foreground">
            Join thousands of cricket fans predicting IPL match outcomes
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              {
                icon: <Trophy size={20} className="text-primary mx-auto" />,
                label: "Predict",
              },
              {
                icon: <Users size={20} className="text-primary mx-auto" />,
                label: "Compete",
              },
              {
                icon: <Shield size={20} className="text-primary mx-auto" />,
                label: "Secure",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1.5 bg-primary/5 rounded-xl p-3"
              >
                {item.icon}
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Login button area */}
      <motion.div
        className="flex flex-col items-center gap-4 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
      >
        <Button
          data-ocid="login.primary_button"
          size="lg"
          className="w-full h-14 text-base font-bold rounded-2xl text-primary-foreground"
          style={{
            background: "oklch(0.52 0.24 292)",
            boxShadow: "0 4px 20px oklch(0.52 0.24 292 / 0.4)",
          }}
          onClick={login}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Shield className="mr-2 h-5 w-5" />
          )}
          {isLoggingIn ? "Connecting..." : "Sign in with Internet Identity"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          🔒 Secure, private login — no password needed
        </p>

        <p className="text-center pb-2">
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            © {new Date().getFullYear()} Built with ❤️ using caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
