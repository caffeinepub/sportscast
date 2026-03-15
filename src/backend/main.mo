import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Outcall "http-outcalls/outcall";

actor {

  // ---- Stable storage ----
  stable var cricketApiKey : Text = "";
  stable var footballApiKey : Text = "";
  stable var cachedCricketJson : Text = "";
  stable var cachedFootballJson : Text = "";
  stable var cachedIplJson : Text = "";
  stable var cachedFootballEspnJson : Text = "";
  stable var lastFetchTimeNs : Int = 0;

  // ---- Transform (required for HTTP outcalls) ----
  public query func transform(input : Outcall.TransformationInput) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  // ---- API Key management ----
  public func setApiKeys(cricketKey : Text, footballKey : Text) : async () {
    cricketApiKey := cricketKey;
    footballApiKey := footballKey;
  };

  public query func getApiKeys() : async { cricket : Text; football : Text } {
    { cricket = cricketApiKey; football = footballApiKey };
  };

  // ---- Fetch IPL schedule from ESPN (free, no key needed) ----
  func fetchIplEspn() : async Text {
    try {
      await Outcall.httpGetRequest(
        "https://site.api.espn.com/apis/site/v2/sports/cricket/8657/scoreboard",
        [],
        transform,
      );
    } catch (_) { "" };
  };

  // ---- Fetch football schedule from ESPN (free, no key needed) ----
  // Fetches Premier League upcoming fixtures
  func fetchFootballEspn() : async Text {
    try {
      await Outcall.httpGetRequest(
        "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
        [],
        transform,
      );
    } catch (_) { "" };
  };

  // ---- Fetch and cache matches ----
  public func fetchAndCacheMatches() : async Bool {
    let now = Time.now();

    // Always try ESPN (free, no key)
    let iplJson = await fetchIplEspn();
    if (iplJson != "") {
      cachedIplJson := iplJson;
    };

    let footballEspnJson = await fetchFootballEspn();
    if (footballEspnJson != "") {
      cachedFootballEspnJson := footballEspnJson;
    };

    // Also try paid APIs if keys are set
    if (footballApiKey != "") {
      try {
        let json = await Outcall.httpGetRequest(
          "https://v3.football.api-sports.io/fixtures?next=10",
          [{ name = "x-apisports-key"; value = footballApiKey }],
          transform,
        );
        cachedFootballJson := json;
      } catch (_) {};
    };

    if (cricketApiKey != "") {
      try {
        let json = await Outcall.httpGetRequest(
          "https://api.cricapi.com/v1/matches?apikey=" # cricketApiKey # "&offset=0",
          [],
          transform,
        );
        cachedCricketJson := json;
      } catch (_) {};
    };

    lastFetchTimeNs := now;
    true;
  };

  // ---- Get cached matches (auto-refresh if stale) ----
  public func getMatches() : async {
    cricket : Text;
    football : Text;
    iplEspn : Text;
    footballEspn : Text;
    fetchTime : Int;
  } {
    let now = Time.now();
    let twentyFourHoursNs : Int = 24 * 3600 * 1_000_000_000;

    let isStale = lastFetchTimeNs == 0 or (now - lastFetchTimeNs) > twentyFourHoursNs;

    if (isStale) {
      ignore await fetchAndCacheMatches();
    };

    {
      cricket = cachedCricketJson;
      football = cachedFootballJson;
      iplEspn = cachedIplJson;
      footballEspn = cachedFootballEspnJson;
      fetchTime = lastFetchTimeNs;
    };
  };

  // ---- Last fetch time (query) ----
  public query func getLastFetchTime() : async Int {
    lastFetchTimeNs;
  };

};
