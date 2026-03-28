import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { backendInterface } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

type AvailStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export default function UsernameSetupScreen() {
  const { refreshProfile } = useAuth();
  const { actor: rawActor } = useActor();
  const actor = rawActor as backendInterface | null;
  const [value, setValue] = useState("");
  const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkAvailability = useCallback(
    async (name: string) => {
      if (!USERNAME_REGEX.test(name)) {
        setAvailStatus("invalid");
        return;
      }
      setAvailStatus("checking");
      try {
        const available = await actor?.isUsernameAvailable(name);
        setAvailStatus(available ? "available" : "taken");
      } catch {
        setAvailStatus("idle");
      }
    },
    [actor],
  );

  useEffect(() => {
    if (!value) {
      setAvailStatus("idle");
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void checkAvailability(value);
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, checkAvailability]);

  async function handleSubmit() {
    if (availStatus !== "available" || !actor) return;
    setIsSubmitting(true);
    try {
      const result = await actor.registerUser(value);
      if (result.ok) {
        toast.success(`Welcome to Crick Mind, @${value}!`);
        await refreshProfile();
      } else {
        const errMsg =
          result.error.__kind__ === "Some"
            ? result.error.value
            : "That username was just taken. Try another.";
        toast.error(errMsg);
        setAvailStatus("taken");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const statusIcon = () => {
    if (availStatus === "checking")
      return (
        <Loader2 size={16} className="animate-spin text-muted-foreground" />
      );
    if (availStatus === "available")
      return <CheckCircle2 size={16} className="text-green-500" />;
    if (availStatus === "taken" || availStatus === "invalid")
      return <XCircle size={16} className="text-destructive" />;
    return null;
  };

  const statusMsg = () => {
    if (availStatus === "available")
      return { text: "Username is available!", color: "text-green-600" };
    if (availStatus === "taken")
      return { text: "Username is already taken.", color: "text-destructive" };
    if (availStatus === "invalid")
      return {
        text: "3-20 chars, letters/numbers/underscores only.",
        color: "text-destructive",
      };
    return null;
  };

  const canSubmit = availStatus === "available" && !isSubmitting;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.52 0.24 292 / 0.12) 0%, oklch(1 0 0) 40%, oklch(0.96 0.05 292) 100%)",
      }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="rounded-3xl p-8 space-y-6"
          style={{
            background: "oklch(1 0 0)",
            boxShadow: "0 8px 40px oklch(0.52 0.24 292 / 0.15)",
            border: "1px solid oklch(0.52 0.24 292 / 0.15)",
          }}
        >
          <div className="text-center space-y-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "oklch(0.52 0.24 292 / 0.12)" }}
            >
              <span className="text-2xl">🏏</span>
            </div>
            <h2
              className="font-display font-bold text-2xl text-foreground"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Choose your username
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick a unique name to represent you on Crick Mind
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">
                @
              </span>
              <Input
                data-ocid="username_setup.input"
                className="pl-7 pr-9 h-12 bg-secondary/40 border-border focus:border-primary rounded-xl"
                placeholder="your_username"
                value={value}
                onChange={(e) =>
                  setValue(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                  )
                }
                maxLength={20}
                onKeyDown={(e) =>
                  e.key === "Enter" && canSubmit && void handleSubmit()
                }
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                {statusIcon()}
              </span>
            </div>

            {statusMsg() && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs ${statusMsg()!.color}`}
              >
                {statusMsg()!.text}
              </motion.p>
            )}

            <p className="text-xs text-muted-foreground">
              3–20 characters · letters, numbers, underscores
            </p>
          </div>

          <Button
            data-ocid="username_setup.submit_button"
            size="lg"
            className="w-full h-12 font-bold rounded-xl text-primary-foreground"
            style={{
              background: canSubmit ? "oklch(0.52 0.24 292)" : undefined,
              boxShadow: canSubmit
                ? "0 4px 16px oklch(0.52 0.24 292 / 0.3)"
                : undefined,
            }}
            disabled={!canSubmit}
            onClick={() => void handleSubmit()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Setting up...
              </>
            ) : (
              "Confirm Username"
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
