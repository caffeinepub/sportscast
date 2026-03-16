import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock, Timer, Trophy, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import { useActor } from "../hooks/useActor";
import {
  IPL_2026_MATCHES,
  type Match,
  formatCountdown,
  formatMatchTime,
  isPredictOpen,
  parseCricketFixtures,
  parseEspnCricketFixtures,
} from "../utils/matchData";
import {
  getPredictionForMatch,
  getProfile,
  savePrediction,
} from "../utils/storage";
import type { Prediction } from "../utils/storage";

function CountdownTimer({ matchTime }: { matchTime: number }) {
  const [, tick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const text = formatCountdown(matchTime);

  return (
    <div className="flex items-center gap-1 text-primary">
      <Timer size={11} className="shrink-0" />
      <span className="text-[11px] font-semibold tabular-nums">{text}</span>
      <span className="text-[10px] text-primary/70">to start</span>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const { t } = useLang();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [pred, setPred] = useState<Prediction | undefined>(() =>
    getPredictionForMatch(match.id),
  );

  const predictOpen = isPredictOpen(match.matchTime, match.status);
  const hoursUntil = (match.matchTime - Date.now()) / (1000 * 3600);

  function handleSubmit() {
    if (!selected) return;
    const newPred: Prediction = {
      matchId: match.id,
      predictedTeam: selected,
      matchTeamA: match.teamA,
      matchTeamB: match.teamB,
      sport: match.sport,
      submittedAt: Date.now(),
      isCorrect:
        match.status === "completed"
          ? selected === match.winningTeam
          : undefined,
    };
    savePrediction(newPred);
    setPred(newPred);
    setDialogOpen(false);
    toast.success(`Predicted: ${selected}!`);
  }

  const statusStyle: Record<string, string> = {
    live: "bg-red-500/20 text-red-400 border-red-500/30",
    upcoming: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-muted text-muted-foreground border-border",
  };

  return (
    <>
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          {/* Header row */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏏</span>
              <Badge
                variant="outline"
                className={`text-[10px] uppercase tracking-wider ${statusStyle[match.status]}`}
              >
                {match.status === "live" && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1" />
                )}
                {t(match.status as "live" | "upcoming" | "completed")}
              </Badge>
              <span className="text-[10px] text-primary/70 font-medium">
                IPL
              </span>
            </div>
            <div>
              {match.status === "upcoming" ? (
                <CountdownTimer matchTime={match.matchTime} />
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock size={11} />
                  <span>{formatMatchTime(match.matchTime)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Date row for upcoming matches */}
          {match.status === "upcoming" && (
            <div className="flex items-center gap-1 px-4 pt-2 text-muted-foreground">
              <CalendarDays size={10} />
              <span className="text-[10px]">
                {formatMatchTime(match.matchTime)}
              </span>
            </div>
          )}

          <div className="px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 text-center">
                <p className="font-display font-bold text-base text-foreground leading-tight">
                  {match.teamA}
                </p>
                {pred?.predictedTeam === match.teamA && (
                  <span className="text-[10px] text-primary font-medium">
                    ✓ Your pick
                  </span>
                )}
              </div>
              <span className="text-muted-foreground font-bold text-sm px-2">
                {t("vs")}
              </span>
              <div className="flex-1 text-center">
                <p className="font-display font-bold text-base text-foreground leading-tight">
                  {match.teamB}
                </p>
                {pred?.predictedTeam === match.teamB && (
                  <span className="text-[10px] text-primary font-medium">
                    ✓ Your pick
                  </span>
                )}
              </div>
            </div>
            {match.venue && (
              <p className="text-center text-[10px] text-muted-foreground mt-1">
                📍 {match.venue}
              </p>
            )}
            {match.status === "completed" && match.winningTeam && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-primary">
                <Trophy size={12} />
                <span className="font-medium">Winner: {match.winningTeam}</span>
                {pred?.isCorrect && (
                  <span className="ml-1 text-primary font-bold">+10 pts</span>
                )}
              </div>
            )}
          </div>

          <div className="px-4 pb-4">
            {pred && match.status !== "completed" ? (
              <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/10 border border-primary/20">
                <Zap size={13} className="text-primary" />
                <span className="text-primary text-xs font-semibold">
                  Predicted: {pred.predictedTeam}
                </span>
              </div>
            ) : match.status === "completed" ? (
              <div className="text-center text-xs text-muted-foreground py-1">
                {pred
                  ? pred.isCorrect
                    ? "✅ Correct prediction — +10 pts"
                    : "❌ Wrong prediction"
                  : "Match completed"}
              </div>
            ) : predictOpen ? (
              <Button
                data-ocid="match.predict.button"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-semibold"
                onClick={() => {
                  setSelected(null);
                  setDialogOpen(true);
                }}
              >
                {t("predict")}
              </Button>
            ) : (
              <div className="space-y-1">
                <Button
                  disabled
                  variant="outline"
                  className="w-full opacity-40 cursor-not-allowed"
                  data-ocid="match.predict.button"
                >
                  🔒 Predictions Closed
                </Button>
                {hoursUntil > 0 && hoursUntil <= 24 && (
                  <p className="text-center text-[10px] text-muted-foreground">
                    Opens {Math.floor(24 - hoursUntil)}h before match
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border max-w-sm mx-4"
          data-ocid="match.predict.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {t("predictMatch")}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {match.teamA} vs {match.teamB}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[match.teamA, match.teamB].map((team) => (
              <button
                key={team}
                type="button"
                data-ocid="match.predict.toggle"
                onClick={() => setSelected(team)}
                className={`p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  selected === team
                    ? "border-primary bg-primary/15 text-primary neon-glow"
                    : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
                }`}
              >
                {team}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setDialogOpen(false)}
              data-ocid="match.predict.cancel_button"
            >
              {t("cancel")}
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground"
              disabled={!selected}
              onClick={handleSubmit}
              data-ocid="match.predict.confirm_button"
            >
              {t("submit")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MatchSkeleton() {
  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-24 flex-1" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-5 w-24 flex-1" />
          </div>
        </div>
        <div className="px-4 pb-4">
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const { t } = useLang();
  const { actor, isFetching } = useActor();
  const profile = getProfile();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usingSchedule, setUsingSchedule] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    async function loadMatches() {
      setLoading(true);
      try {
        const result = await (actor as any).getMatches();
        const cricketJson: string = result?.cricket ?? "";
        const iplEspnJson: string = result?.iplEspn ?? "";
        const fetchTime: bigint = result?.fetchTime ?? BigInt(0);

        const liveMatches = cricketJson
          ? parseCricketFixtures(cricketJson)
          : iplEspnJson
            ? parseEspnCricketFixtures(iplEspnJson)
            : [];

        if (liveMatches.length > 0) {
          liveMatches.sort((a, b) => a.matchTime - b.matchTime);
          setMatches(liveMatches);
          setUsingSchedule(false);
          if (fetchTime > BigInt(0)) {
            setLastUpdated(new Date(Number(fetchTime / BigInt(1_000_000))));
          } else {
            setLastUpdated(new Date());
          }
        } else {
          // Fallback to IPL 2026 schedule
          setMatches(IPL_2026_MATCHES);
          setUsingSchedule(true);
          setLastUpdated(null);
        }
      } catch {
        setMatches(IPL_2026_MATCHES);
        setUsingSchedule(true);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, [actor, isFetching]);

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-foreground neon-text-glow">
              MatchMind
            </h1>
            <p className="text-xs text-muted-foreground">
              {usingSchedule
                ? "🗓 IPL 2026 Schedule"
                : lastUpdated
                  ? `🟢 Live · Updated ${lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                  : t("matchPredictions")}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
            <Zap size={13} className="text-primary" />
            <span className="text-primary font-bold text-sm">
              {profile.totalPoints}
            </span>
            <span className="text-primary/70 text-xs">{t("points")}</span>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-3">
        {loading ? (
          <>
            <MatchSkeleton />
            <MatchSkeleton />
            <MatchSkeleton />
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            {matches.map((match, i) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!loading && matches.length === 0 && (
          <div
            data-ocid="home.empty_state"
            className="text-center py-16 text-muted-foreground"
          >
            <p className="text-4xl mb-3">🏏</p>
            <p className="font-medium">No live IPL matches right now</p>
            <p className="text-sm mt-1">
              Check back when the IPL season starts
            </p>
          </div>
        )}

        {!loading && usingSchedule && matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground"
          >
            <CalendarDays size={14} className="text-primary shrink-0 mt-0.5" />
            <span>
              More matches will be added as the season schedule is released —{" "}
              <span className="text-primary font-medium">
                Season opens March 28, 2026
              </span>
            </span>
          </motion.div>
        )}
      </main>
    </div>
  );
}
