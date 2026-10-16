import { createContext, useState, useEffect } from "react";
import { configureAuth, refreshToken, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    configureAuth(accessToken, setAccessToken);
  }, [accessToken]);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      try {
        const tokenData = await refreshToken();
        const newAccessToken = tokenData?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        setAccessToken(newAccessToken);

        const data = await getMe(newAccessToken);

        if (!cancelled) {
          setUser(data?.user ?? null);
        }
      } catch {
        if (!cancelled) {
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
