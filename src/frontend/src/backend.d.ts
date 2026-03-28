import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface UserProfile {
    principalText: string;
    username: string;
    totalPoints: bigint;
    createdAt: bigint;
}

export interface RegisterResult {
    ok: boolean;
    error: Option<string>;
}

export interface MatchCache {
    cricket: string;
    football: string;
    iplEspn: string;
    footballEspn: string;
    fetchTime: bigint;
}

export interface backendInterface {
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
    registerUser(username: string): Promise<RegisterResult>;
    getMyProfile(): Promise<Option<UserProfile>>;
    isUsernameAvailable(username: string): Promise<boolean>;
    getUserByUsername(username: string): Promise<Option<UserProfile>>;
    getAllUsers(): Promise<UserProfile[]>;
    getMatches(): Promise<MatchCache>;
    fetchAndCacheMatches(): Promise<boolean>;
    getLastFetchTime(): Promise<bigint>;
    setApiKeys(cricketKey: string, footballKey: string): Promise<void>;
    getApiKeys(): Promise<{ cricket: string; football: string }>;
}
