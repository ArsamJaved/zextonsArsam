'use client'
import { createContext, useContext, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "@/app/lib/features/auth/authSlice";
import { RootState } from "@/app/lib/store"; // Path to your store
import { User } from "../../../types";

interface AuthContextType {
  user: User | null;
  ip: string;
  login: (user: User) => void;
  logout: () => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as User | null; // Typed selector with assertion
  const ip = useSelector((state: RootState) => state.auth.ip); // Typed selector

  const loginHandler = (user: User) => {
    dispatch(login(user));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{ user, ip, login: loginHandler, logout: logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook to use Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
