export interface Match {
  id: string;
  sport: "cricket";
  teamA: string;
  teamB: string;
  matchTime: number;
  status: "upcoming" | "live" | "completed";
  winningTeam?: string;
  venue?: string;
}

const toUtcMs = (dateStr: string, istHour: number, istMin: number): number => {
  const totalIstMins = istHour * 60 + istMin;
  const totalUtcMins = totalIstMins - 330; // IST is UTC+5:30
  const utcHour = Math.floor(totalUtcMins / 60);
  const utcMin = totalUtcMins % 60;
  return new Date(
    `${dateStr}T${String(utcHour).padStart(2, "0")}:${String(utcMin).padStart(2, "0")}:00Z`,
  ).getTime();
};

export const IPL_2026_MATCHES: Match[] = [
  {
    id: "ipl2026_01",
    sport: "cricket" as const,
    teamA: "Royal Challengers Bengaluru",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-03-28", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  {
    id: "ipl2026_02",
    sport: "cricket" as const,
    teamA: "Mumbai Indians",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-03-29", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  {
    id: "ipl2026_03",
    sport: "cricket" as const,
    teamA: "Rajasthan Royals",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-03-30", 19, 30),
    status: "upcoming",
    venue: "Barsapara Stadium, Guwahati",
  },
  {
    id: "ipl2026_04",
    sport: "cricket" as const,
    teamA: "Punjab Kings",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-03-31", 19, 30),
    status: "upcoming",
    venue:
      "Maharaja Yadavindra Singh International Cricket Stadium, New Chandigarh",
  },
  {
    id: "ipl2026_05",
    sport: "cricket" as const,
    teamA: "Lucknow Super Giants",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-04-01", 19, 30),
    status: "upcoming",
    venue: "BRSABV Ekana Cricket Stadium, Lucknow",
  },
  {
    id: "ipl2026_06",
    sport: "cricket" as const,
    teamA: "Kolkata Knight Riders",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-04-02", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  {
    id: "ipl2026_07",
    sport: "cricket" as const,
    teamA: "Chennai Super Kings",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-04-03", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  {
    id: "ipl2026_08",
    sport: "cricket" as const,
    teamA: "Delhi Capitals",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-04-04", 15, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  {
    id: "ipl2026_09",
    sport: "cricket" as const,
    teamA: "Gujarat Titans",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-04", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  {
    id: "ipl2026_10",
    sport: "cricket" as const,
    teamA: "Sunrisers Hyderabad",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-04-05", 15, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
];

// Backward compat — no static/fake matches
export const MATCHES: Match[] = [];

export function isPredictOpen(matchTime: number, status: string): boolean {
  if (status === "completed" || status === "live") return false;
  const hoursUntil = (matchTime - Date.now()) / (1000 * 3600);
  return hoursUntil > 24;
}

export function formatCountdown(matchTime: number): string {
  const diff = matchTime - Date.now();
  if (diff <= 0) return "Starting soon";
  const days = Math.floor(diff / (1000 * 3600 * 24));
  const h = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
  const m = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  if (days > 0) return `${days}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export function formatMatchTime(matchTime: number): string {
  return new Date(matchTime).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function parseEspnCricketFixtures(json: string): Match[] {
  try {
    const data = JSON.parse(json);
    const events: any[] = data?.events ?? [];
    return events
      .map((event: any, idx: number) => {
        const competitors: any[] = event.competitions?.[0]?.competitors ?? [];
        const home = competitors.find((c: any) => c.homeAway === "home");
        const away = competitors.find((c: any) => c.homeAway === "away");
        const teamA =
          home?.team?.displayName ??
          event.name?.split(" vs ")?.[0]?.trim() ??
          "TBD";
        const teamB =
          away?.team?.displayName ??
          event.name?.split(" vs ")?.[1]?.trim() ??
          "TBD";
        const stateType = event.status?.type?.name ?? "STATUS_SCHEDULED";
        const completed: boolean = event.status?.type?.completed ?? false;
        let status: Match["status"] = "upcoming";
        if (stateType === "STATUS_IN_PROGRESS" || stateType === "STATUS_LIVE")
          status = "live";
        else if (completed || stateType === "STATUS_FINAL")
          status = "completed";
        let winningTeam: string | undefined;
        if (status === "completed") {
          const winner = competitors.find((c: any) => c.winner === true);
          if (winner) winningTeam = winner.team?.displayName;
        }
        return {
          id: `ipl_${event.id ?? idx}`,
          sport: "cricket" as const,
          teamA,
          teamB,
          matchTime: new Date(event.date ?? Date.now()).getTime(),
          status,
          winningTeam,
          venue: event.competitions?.[0]?.venue?.fullName,
        };
      })
      .filter((m) => m.teamA !== "TBD" && m.teamB !== "TBD");
  } catch {
    return [];
  }
}

export function parseCricketFixtures(json: string): Match[] {
  try {
    const data = JSON.parse(json);
    const matches = data?.data ?? [];
    return matches.map((item: any, idx: number) => {
      const name: string = item.name ?? "Team A vs Team B";
      const parts = name.split(" vs ");
      const teamA = parts[0]?.trim() ?? "Team A";
      const teamB = parts[1]?.split(",")[0]?.trim() ?? "Team B";
      const cricStatus: string = item.status ?? "";
      let status: Match["status"] = "upcoming";
      if (
        cricStatus.toLowerCase().includes("started") ||
        cricStatus.toLowerCase().includes("live")
      )
        status = "live";
      else if (
        cricStatus.toLowerCase().includes("won") ||
        cricStatus.toLowerCase().includes("tied") ||
        cricStatus.toLowerCase().includes("drawn") ||
        cricStatus.toLowerCase().includes("no result")
      )
        status = "completed";
      let winningTeam: string | undefined;
      if (status === "completed") {
        const wonMatch = cricStatus.match(/^([^w]+)\s+won/);
        if (wonMatch) winningTeam = wonMatch[1].trim();
      }
      return {
        id: `cricket_${item.id ?? idx}`,
        sport: "cricket" as const,
        teamA,
        teamB,
        matchTime: new Date(
          item.date ?? item.dateTimeGMT ?? Date.now(),
        ).getTime(),
        status,
        winningTeam,
      };
    });
  } catch {
    return [];
  }
}
