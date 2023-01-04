import React, { useContext, createContext } from 'react';

export interface IAppContext {
  isAuthenticated: boolean
  userHasAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = createContext({} as IAppContext);

export function useAppContext() {
  return useContext(AppContext);
}
