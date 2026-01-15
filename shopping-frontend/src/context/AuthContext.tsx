import React, { createContext, useContext, useState } from "react";

// 1. 백엔드 스키마에 맞춰 User 인터페이스 수정
export interface User {
  _id: string; // MongoDB의 고유 ID (기존 id 대신 사용)
  loginId: string; // 백엔드에서 사용하는 로그인 아이디
  firstname: string;
  lastname: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("tech_market_user");
    // 로컬 스토리지에 데이터가 있으면 파싱해서 가져오고, 없으면 null
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("tech_market_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tech_market_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
