import React, { createContext, useState, ReactNode } from 'react';

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};