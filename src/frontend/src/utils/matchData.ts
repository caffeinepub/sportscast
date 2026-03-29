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
  // ── MATCH 1 ── 28 March
  {
    id: "ipl2026_01",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-03-28", 19, 30),
    status: "completed",
    winningTeam: "Royal Challengers Bengaluru",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 2 ── 29 March
  {
    id: "ipl2026_02",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-03-29", 19, 30),
    status: "completed",
    winningTeam: "Mumbai Indians",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 3 ── 30 March
  {
    id: "ipl2026_03",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-03-30", 19, 30),
    status: "upcoming",
    venue: "ACA Cricket Stadium, Guwahati",
  },
  // ── MATCH 4 ── 31 March
  {
    id: "ipl2026_04",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-03-31", 19, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 5 ── 1 April
  {
    id: "ipl2026_05",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-04-01", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 6 ── 2 April
  {
    id: "ipl2026_06",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-04-02", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 7 ── 3 April
  {
    id: "ipl2026_07",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-04-03", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 8 ── 4 April (D/N)
  {
    id: "ipl2026_08",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-04-04", 15, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 9 ── 4 April
  {
    id: "ipl2026_09",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-04", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 10 ── 5 April (D/N)
  {
    id: "ipl2026_10",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-04-05", 15, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 11 ── 5 April
  {
    id: "ipl2026_11",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-04-05", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 12 ── 6 April
  {
    id: "ipl2026_12",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-04-06", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 13 ── 7 April
  {
    id: "ipl2026_13",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-04-07", 19, 30),
    status: "upcoming",
    venue: "ACA Cricket Stadium, Guwahati",
  },
  // ── MATCH 14 ── 8 April
  {
    id: "ipl2026_14",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-04-08", 19, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 15 ── 9 April
  {
    id: "ipl2026_15",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-04-09", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 16 ── 10 April
  {
    id: "ipl2026_16",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-04-10", 19, 30),
    status: "upcoming",
    venue: "ACA Cricket Stadium, Guwahati",
  },
  // ── MATCH 17 ── 11 April (D/N)
  {
    id: "ipl2026_17",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-04-11", 15, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 18 ── 11 April
  {
    id: "ipl2026_18",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-04-11", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 19 ── 12 April (D/N)
  {
    id: "ipl2026_19",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-04-12", 15, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 20 ── 12 April
  {
    id: "ipl2026_20",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-04-12", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 21 ── 13 April
  {
    id: "ipl2026_21",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-13", 19, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 22 ── 14 April
  {
    id: "ipl2026_22",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-04-14", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 23 ── 15 April
  {
    id: "ipl2026_23",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-04-15", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 24 ── 16 April
  {
    id: "ipl2026_24",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-04-16", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 25 ── 17 April
  {
    id: "ipl2026_25",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-04-17", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 26 ── 18 April (D/N)
  {
    id: "ipl2026_26",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-04-18", 15, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 27 ── 18 April
  {
    id: "ipl2026_27",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-04-18", 19, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 28 ── 19 April (D/N)
  {
    id: "ipl2026_28",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-19", 15, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 29 ── 19 April
  {
    id: "ipl2026_29",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-04-19", 19, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 30 ── 20 April
  {
    id: "ipl2026_30",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-04-20", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 31 ── 21 April
  {
    id: "ipl2026_31",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-04-21", 19, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 32 ── 22 April
  {
    id: "ipl2026_32",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-22", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 33 ── 23 April
  {
    id: "ipl2026_33",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-04-23", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 34 ── 24 April
  {
    id: "ipl2026_34",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-04-24", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 35 ── 25 April (D/N)
  {
    id: "ipl2026_35",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-04-25", 15, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 36 ── 25 April
  {
    id: "ipl2026_36",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-04-25", 19, 30),
    status: "upcoming",
    venue: "Sawai Mansingh Stadium, Jaipur",
  },
  // ── MATCH 37 ── 26 April (D/N)
  {
    id: "ipl2026_37",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-04-26", 15, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 38 ── 26 April
  {
    id: "ipl2026_38",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-04-26", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 39 ── 27 April
  {
    id: "ipl2026_39",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-04-27", 19, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 40 ── 28 April
  {
    id: "ipl2026_40",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-04-28", 19, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 41 ── 29 April
  {
    id: "ipl2026_41",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-04-29", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 42 ── 30 April
  {
    id: "ipl2026_42",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-04-30", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 43 ── 1 May
  {
    id: "ipl2026_43",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-05-01", 19, 30),
    status: "upcoming",
    venue: "Sawai Mansingh Stadium, Jaipur",
  },
  // ── MATCH 44 ── 2 May
  {
    id: "ipl2026_44",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-05-02", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 45 ── 3 May (D/N)
  {
    id: "ipl2026_45",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-05-03", 15, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 46 ── 3 May
  {
    id: "ipl2026_46",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-05-03", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 47 ── 4 May
  {
    id: "ipl2026_47",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-05-04", 19, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 48 ── 5 May
  {
    id: "ipl2026_48",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-05-05", 19, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 49 ── 6 May (D/N)
  {
    id: "ipl2026_49",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-05-06", 15, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 50 ── 7 May
  {
    id: "ipl2026_50",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-05-07", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 51 ── 8 May
  {
    id: "ipl2026_51",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-05-08", 19, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 52 ── 9 May
  {
    id: "ipl2026_52",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-05-09", 19, 30),
    status: "upcoming",
    venue: "Sawai Mansingh Stadium, Jaipur",
  },
  // ── MATCH 53 ── 10 May (D/N)
  {
    id: "ipl2026_53",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-05-10", 15, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 54 ── 10 May
  {
    id: "ipl2026_54",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-05-10", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 55 ── 11 May
  {
    id: "ipl2026_55",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-05-11", 19, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 56 ── 12 May
  {
    id: "ipl2026_56",
    sport: "cricket",
    teamA: "Gujarat Titans",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-05-12", 19, 30),
    status: "upcoming",
    venue: "Narendra Modi Stadium, Ahmedabad",
  },
  // ── MATCH 57 ── 13 May
  {
    id: "ipl2026_57",
    sport: "cricket",
    teamA: "Royal Challengers Bengaluru",
    teamB: "Kolkata Knight Riders",
    matchTime: toUtcMs("2026-05-13", 19, 30),
    status: "upcoming",
    venue: "M. Chinnaswamy Stadium, Bengaluru",
  },
  // ── MATCH 58 ── 14 May
  {
    id: "ipl2026_58",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-05-14", 19, 30),
    status: "upcoming",
    venue: "Maharaja Yadavindra Singh Stadium, Mullanpur",
  },
  // ── MATCH 59 ── 15 May
  {
    id: "ipl2026_59",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Chennai Super Kings",
    matchTime: toUtcMs("2026-05-15", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 60 ── 16 May
  {
    id: "ipl2026_60",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-05-16", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 61 ── 17 May (D/N)
  {
    id: "ipl2026_61",
    sport: "cricket",
    teamA: "Punjab Kings",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-05-17", 15, 30),
    status: "upcoming",
    venue: "HPCA Cricket Stadium, Dharamshala",
  },
  // ── MATCH 62 ── 17 May
  {
    id: "ipl2026_62",
    sport: "cricket",
    teamA: "Delhi Capitals",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-05-17", 19, 30),
    status: "upcoming",
    venue: "Arun Jaitley Stadium, Delhi",
  },
  // ── MATCH 63 ── 18 May
  {
    id: "ipl2026_63",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Sunrisers Hyderabad",
    matchTime: toUtcMs("2026-05-18", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 64 ── 19 May
  {
    id: "ipl2026_64",
    sport: "cricket",
    teamA: "Rajasthan Royals",
    teamB: "Lucknow Super Giants",
    matchTime: toUtcMs("2026-05-19", 19, 30),
    status: "upcoming",
    venue: "Sawai Mansingh Stadium, Jaipur",
  },
  // ── MATCH 65 ── 20 May
  {
    id: "ipl2026_65",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Mumbai Indians",
    matchTime: toUtcMs("2026-05-20", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
  // ── MATCH 66 ── 21 May
  {
    id: "ipl2026_66",
    sport: "cricket",
    teamA: "Chennai Super Kings",
    teamB: "Gujarat Titans",
    matchTime: toUtcMs("2026-05-21", 19, 30),
    status: "upcoming",
    venue: "MA Chidambaram Stadium, Chennai",
  },
  // ── MATCH 67 ── 22 May
  {
    id: "ipl2026_67",
    sport: "cricket",
    teamA: "Sunrisers Hyderabad",
    teamB: "Royal Challengers Bengaluru",
    matchTime: toUtcMs("2026-05-22", 19, 30),
    status: "upcoming",
    venue: "Rajiv Gandhi International Stadium, Hyderabad",
  },
  // ── MATCH 68 ── 23 May
  {
    id: "ipl2026_68",
    sport: "cricket",
    teamA: "Lucknow Super Giants",
    teamB: "Punjab Kings",
    matchTime: toUtcMs("2026-05-23", 19, 30),
    status: "upcoming",
    venue: "Ekana Cricket Stadium, Lucknow",
  },
  // ── MATCH 69 ── 24 May (D/N)
  {
    id: "ipl2026_69",
    sport: "cricket",
    teamA: "Mumbai Indians",
    teamB: "Rajasthan Royals",
    matchTime: toUtcMs("2026-05-24", 15, 30),
    status: "upcoming",
    venue: "Wankhede Stadium, Mumbai",
  },
  // ── MATCH 70 ── 24 May
  {
    id: "ipl2026_70",
    sport: "cricket",
    teamA: "Kolkata Knight Riders",
    teamB: "Delhi Capitals",
    matchTime: toUtcMs("2026-05-24", 19, 30),
    status: "upcoming",
    venue: "Eden Gardens, Kolkata",
  },
];

// Backward compat — no static/fake matches
export const MATCHES: Match[] = [];

/**
 * Prediction window:
 * - Opens 2 days (48 hours) before match
 * - Closes 5 minutes before match start
 */
export function isPredictOpen(matchTime: number, status: string): boolean {
  if (status === "completed" || status === "live") return false;
  const msUntil = matchTime - Date.now();
  const hoursUntil = msUntil / (1000 * 3600);
  const minutesUntil = msUntil / (1000 * 60);
  return hoursUntil <= 48 && minutesUntil > 5;
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
