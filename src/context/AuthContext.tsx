import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_KEY = "bliss-admin-session";
const PASSWORD_KEY = "bliss-admin-password";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "bliss2026";

type AuthContextValue = {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  getAdminPassword: () => string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  useEffect(() => {
    if (isAdmin) sessionStorage.setItem(SESSION_KEY, "1");
    else {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(PASSWORD_KEY);
    }
  }, [isAdmin]);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(PASSWORD_KEY, password);
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAdmin(false), []);

  const getAdminPassword = useCallback(() => sessionStorage.getItem(PASSWORD_KEY), []);

  const value = useMemo(
    () => ({ isAdmin, login, logout, getAdminPassword }),
    [isAdmin, login, logout, getAdminPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
