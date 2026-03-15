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

const now = Date.now();

export const MATCHES: Match[] = [
  {
    id: "m1",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    matchTime: now + 3600 * 1000 * 26,
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  {
    id: "m2",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Kolkata Knight Riders",
    matchTime: now + 3600 * 1000 * 50,
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  {
    id: "m3",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Punjab Kings",
    matchTime: now + 3600 * 1000 * 74,
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  {
    id: "m4",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Sunrisers Hyderabad",
    matchTime: now + 3600 * 1000 * 98,
    status: "upcoming",
    venue: "Sawai Mansingh Stadium, Jaipur",
  },
  {
    id: "m5",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Lucknow Super Giants",
    matchTime: now + 3600 * 1000 * 122,
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  {
    id: "m6",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Kolkata Knight Riders",
    matchTime: now - 3600 * 1000 * 2,
    status: "live",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  {
    id: "m7",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Rajasthan Royals",
    matchTime: now - 3600 * 1000 * 48,
    status: "completed",
    winningTeam: "Mumbai Indians",
    venue: "Wankhede Stadium, Mumbai",
  },
];

export function isPredictOpen(matchTime: number, status: string): boolean {
  if (status === "completed" || status === "live") return false;
  const hoursUntil = (matchTime - Date.now()) / (1000 * 3600);
  return hoursUntil > 24;
}

export function formatCountdown(matchTime: number): string {
  const diff = matchTime - Date.now();
  if (diff <= 0) return "Started";
  const h = Math.floor(diff / (1000 * 3600));
  const m = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
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
