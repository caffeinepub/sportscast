import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Char "mo:core/Char";
import Outcall "http-outcalls/outcall";

actor {

  // ---- Stable storage for matches ----
  stable var cricketApiKey : Text = "";
  stable var footballApiKey : Text = "";
  stable var cachedCricketJson : Text = "";
  stable var cachedFootballJson : Text = "";
  stable var cachedIplJson : Text = "";
  stable var cachedFootballEspnJson : Text = "";
  stable var lastFetchTimeNs : Int = 0;

  // ---- User management ----
  type UserProfile = {
    principalText : Text;
    username : Text;
    totalPoints : Int;
    createdAt : Int;
  };

  // principal text -> UserProfile
  let users : Map.Map<Text, UserProfile> = Map.empty();
  // lowercase username -> principal text
  let usernameIndex : Map.Map<Text, Text> = Map.empty();

  // ---- Username validation helpers ----
  func isValidUsernameChar(c : Char) : Bool {
    (c >= 'a' and c <= 'z') or
    (c >= 'A' and c <= 'Z') or
    (c >= '0' and c <= '9') or
    c == '_';
  };

  func isValidUsername(username : Text) : Bool {
    let len = username.size();
    if (len < 3 or len > 20) { return false };
    for (c in username.chars()) {
      if (not isValidUsernameChar(c)) { return false };
    };
    true;
  };

  func toLower(t : Text) : Text {
    var result = "";
    for (c in t.chars()) {
      if (c >= 'A' and c <= 'Z') {
        result #= Text.fromChar(Char.fromNat32(c.toNat32() + 32));
      } else {
        result #= Text.fromChar(c);
      };
    };
    result;
  };

  // ---- User management functions ----
  public shared(msg) func registerUser(username : Text) : async { ok : Bool; error : ?Text } {
    let caller = msg.caller;
    let principalText = caller.toText();

    if (not isValidUsername(username)) {
      return { ok = false; error = ?"Username must be 3-20 characters, letters, numbers, or underscores only" };
    };

    let lowerUsername = toLower(username);

    switch (usernameIndex.get(lowerUsername)) {
      case (?existingPrincipal) {
        if (existingPrincipal != principalText) {
          return { ok = false; error = ?"Username is already taken" };
        };
      };
      case null {};
    };

    let profile : UserProfile = {
      principalText = principalText;
      username = username;
      totalPoints = 0;
      createdAt = Time.now();
    };

    users.add(principalText, profile);
    usernameIndex.add(lowerUsername, principalText);

    { ok = true; error = null };
  };

  public shared query(msg) func getMyProfile() : async ?{ principalText : Text; username : Text; totalPoints : Int; createdAt : Int } {
    let principalText = msg.caller.toText();
    users.get(principalText);
  };

  public query func isUsernameAvailable(username : Text) : async Bool {
    let lowerUsername = toLower(username);
    switch (usernameIndex.get(lowerUsername)) {
      case (?_) { false };
      case null { true };
    };
  };

  public query func getUserByUsername(username : Text) : async ?{ principalText : Text; username : Text; totalPoints : Int; createdAt : Int } {
    let lowerUsername = toLower(username);
    switch (usernameIndex.get(lowerUsername)) {
      case (?principalText) {
        users.get(principalText);
      };
      case null { null };
    };
  };

  public query func getAllUsers() : async [{ principalText : Text; username : Text; totalPoints : Int; createdAt : Int }] {
    users.values().toArray();
  };

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

  // ---- Fetch IPL schedule from ESPN ----
  func fetchIplEspn() : async Text {
    try {
      await Outcall.httpGetRequest(
        "https://site.api.espn.com/apis/site/v2/sports/cricket/8657/scoreboard",
        [],
        transform,
      );
    } catch (_) { "" };
  };

  // ---- Fetch football schedule from ESPN ----
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

    let iplJson = await fetchIplEspn();
    if (iplJson != "") {
      cachedIplJson := iplJson;
    };

    let footballEspnJson = await fetchFootballEspn();
    if (footballEspnJson != "") {
      cachedFootballEspnJson := footballEspnJson;
    };

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
