"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "BUSINESS" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name?: string,
    role?: "USER" | "BUSINESS" | "ADMIN"
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await authApi.login({ email, password });
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string,
    role?: "USER" | "BUSINESS" | "ADMIN"
  ) => {
    try {
      const { user, token } = await authApi.register({
        email,
        password,
        name,
        role,
      });
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
