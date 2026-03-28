import type { Identity } from "@icp-sdk/core/agent";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Option, UserProfile, backendInterface } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

function unwrapOption<T>(opt: Option<T>): T | null {
  return opt.__kind__ === "Some" ? opt.value : null;
}

type AuthContextType = {
  identity: Identity | undefined;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: () => void;
  logout: () => void;
  username: string | null;
  isLoadingProfile: boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { identity, login, clear, isInitializing } = useInternetIdentity();
  const { actor: rawActor } = useActor();
  const actor = rawActor as backendInterface | null;
  const [username, setUsername] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const refreshProfile = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    setIsLoadingProfile(true);
    try {
      const profile = await actor.getMyProfile();
      const unwrapped = unwrapOption<UserProfile>(
        profile as Option<UserProfile>,
      );
      setUsername(unwrapped ? unwrapped.username : null);
    } catch {
      setUsername(null);
    } finally {
      setIsLoadingProfile(false);
    }
  }, [actor, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && actor) {
      void refreshProfile();
    } else if (!isAuthenticated) {
      setUsername(null);
    }
  }, [isAuthenticated, actor, refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        identity,
        isAuthenticated,
        isInitializing,
        login,
        logout: clear,
        username,
        isLoadingProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
