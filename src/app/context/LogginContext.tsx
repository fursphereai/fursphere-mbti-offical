"use client"; // 确保是客户端组件

import { createContext, useContext, useEffect, useState } from "react";

// 定义 Context 的类型
interface LogginContextType {
  loggin: boolean;
  setLoggin: (value: boolean) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  userInfo: any;
  setUserInfo: (info: any) => void;
}

// 创建 Context
const LogginContext = createContext<LogginContextType | null>(null);

// Provider 组件
import { ReactNode } from "react";

interface LogginProviderProps {
  children: ReactNode;
}

export const LogginProvider = ({ children }: LogginProviderProps) => {
  
   // Use a useEffect to handle initial state setting
   const [loggin, setLoggin] = useState(false); // Set default value
   const [userEmail, setUserEmail] = useState<string | null>(null);
   const [userInfo, setUserInfo] = useState<any>(null);
 
   // Move sessionStorage initialization to useEffect
   useEffect(() => {
     // Now it's safe to access sessionStorage
     const savedLoggin = sessionStorage.getItem("loggin");
     const savedEmail = sessionStorage.getItem("userEmail");
     const savedInfo = sessionStorage.getItem("userInfo");
 
     if (savedLoggin !== null) {
       setLoggin(savedLoggin === 'true'); // Convert string to boolean
     }
     if (savedEmail !== null) {
       setUserEmail(savedEmail);
     }
     if (savedInfo !== null) {
       setUserInfo(JSON.parse(savedInfo));
     }
   }, []);
  
  // Save to sessionStorage whenever values change
  useEffect(() => {
    sessionStorage.setItem("loggin", loggin.toString());
    console.log("loggin登陆状态" + JSON.stringify(loggin));
  }, [loggin]);

  useEffect(() => {
    if (userEmail) {
      sessionStorage.setItem("userEmail", userEmail);
    } else {
      sessionStorage.removeItem("userEmail");
    }
    console.log("useremail登陆状态" + JSON.stringify(userEmail));
  }, [userEmail]);

  useEffect(() => {
    if (userInfo) {
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      sessionStorage.removeItem("userInfo");
    }
    console.log("userinfo登陆状态" + JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <LogginContext.Provider value={{ loggin, setLoggin, userEmail, setUserEmail, userInfo, setUserInfo }}>
      {children}
    </LogginContext.Provider>
  );
};

// 自定义 Hook
export const useLoggin = () => {
  const context = useContext(LogginContext);
  if (!context) {
    throw new Error("useLoggin must be used within a LogginProvider");
  }
  return context;
};
