import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, List, Target, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useLang } from "../context/LangContext";
import { getPredictions, getProfile } from "../utils/storage";

function DonutChart({
  correct,
  incorrect,
}: { correct: number; incorrect: number }) {
  const total = correct + incorrect;
  if (total === 0) {
    return (
      <div className="flex items-center justify-center w-40 h-40">
        <div className="w-32 h-32 rounded-full border-4 border-dashed border-border flex items-center justify-center">
          <span className="text-muted-foreground text-xs">No data</span>
        </div>
      </div>
    );
  }
  const size = 160;
  const strokeWidth = 22;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const correctDash = (correct / total) * circ;
  const incorrectDash = (incorrect / total) * circ;
  const cx = size / 2;
  const cy = size / 2;
  const accuracy = Math.round((correct / total) * 100);

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        role="img"
        aria-label="Prediction accuracy donut chart"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(0.22 0 0)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(0.88 0.29 145)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${correctDash} ${circ - correctDash}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(0.55 0.22 25)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${incorrectDash} ${circ - incorrectDash}`}
          strokeDashoffset={-correctDash}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-2xl text-foreground">
          {accuracy}%
        </span>
        <span className="text-xs text-muted-foreground">accuracy</span>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const { t } = useLang();
  const profile = getProfile();
  const predictions = getPredictions();

  const correct = predictions.filter((p) => p.isCorrect === true).length;
  const incorrect = predictions.filter((p) => p.isCorrect === false).length;
  const pending = predictions.filter((p) => p.isCorrect === undefined).length;
  const total = predictions.length;
  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 0;

  const statCards = [
    {
      label: t("totalPoints"),
      value: profile.totalPoints,
      icon: <Award size={18} className="text-primary" />,
      color: "text-primary",
    },
    {
      label: t("totalPredictions"),
      value: total,
      icon: <List size={18} className="text-blue-400" />,
      color: "text-blue-400",
    },
    {
      label: t("correctPredictions"),
      value: correct,
      icon: <Target size={18} className="text-green-400" />,
      color: "text-green-400",
    },
    {
      label: t("accuracy"),
      value: `${accuracy}%`,
      icon: <TrendingUp size={18} className="text-yellow-400" />,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <h1 className="font-display font-bold text-xl text-foreground">
          My Stats
        </h1>
        <p className="text-xs text-muted-foreground">
          Your prediction performance
        </p>
      </header>

      <main className="px-4 py-4 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                  </div>
                  <p
                    className={`font-display font-bold text-2xl ${card.color}`}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {card.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base text-foreground">
              Prediction Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around">
              <DonutChart correct={correct} incorrect={incorrect} />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("correctPredictions")}
                    </p>
                    <p className="font-bold text-foreground">{correct}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("incorrectPredictions")}
                    </p>
                    <p className="font-bold text-foreground">{incorrect}</p>
                  </div>
                </div>
                {pending > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="font-bold text-foreground">{pending}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base text-foreground">
              Recent Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {predictions.length === 0 ? (
              <div
                data-ocid="stats.empty_state"
                className="py-8 text-center text-muted-foreground"
              >
                <p className="text-3xl mb-2">🎯</p>
                <p className="text-sm">No predictions yet</p>
                <p className="text-xs mt-1">
                  Head to Home to start predicting!
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {predictions.slice(0, 10).map((pred, i) => (
                  <li
                    key={`${pred.matchId}-${pred.submittedAt}`}
                    data-ocid={`stats.prediction.item.${i + 1}`}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {pred.sport === "cricket" ? "🏏" : "⚽"}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {pred.matchTeamA} vs {pred.matchTeamB}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Pick: {pred.predictedTeam}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        pred.isCorrect === true
                          ? "border-primary/30 text-primary bg-primary/10"
                          : pred.isCorrect === false
                            ? "border-destructive/30 text-destructive bg-destructive/10"
                            : "border-border text-muted-foreground"
                      }
                    >
                      {pred.isCorrect === true
                        ? "+10 pts"
                        : pred.isCorrect === false
                          ? "Wrong"
                          : "Pending"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
