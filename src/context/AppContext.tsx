import React, { createContext } from "react";
import { useGrinderyNexus } from "use-grindery-nexus";
import { defaultFunc } from "../helpers/utils";

// Context props
type ContextProps = {
  user: string | null;
  disconnect: any;
  connect: any;
};

// Context provider props
type AppContextProps = {
  children: React.ReactNode;
};

// Init context
export const AppContext = createContext<ContextProps>({
  user: null,
  disconnect: defaultFunc,
  connect: defaultFunc,
});

export const AppContextProvider = ({ children }: AppContextProps) => {
  // Auth hook
  const { user, connect, disconnect } = useGrinderyNexus();

  return (
    <AppContext.Provider
      value={{
        user,
        disconnect,
        connect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
