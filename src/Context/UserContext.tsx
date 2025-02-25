import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the type for the context value
interface UserContextType {
  userLogin: string | null;
  setUserLogin: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserLogin(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
