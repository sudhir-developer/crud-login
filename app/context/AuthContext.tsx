"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface JwtPayload {
  user: User;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoading: true,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setAuthLoading(false);
        return;
      }

      setUser(decoded.user);
    } catch {
      localStorage.removeItem("token");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    const decoded = jwtDecode(token);
    console.log("DECODED TOKEN:", decoded);
    // console.log(new Date(decoded.exp * 1000));
  }, []);


  return (
    <AuthContext.Provider
      value={{ user, authLoading, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
