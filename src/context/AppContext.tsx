import NexusClient from "grindery-nexus-client";
import React, { createContext, useEffect, useState } from "react";
import { useGrinderyNexus } from "use-grindery-nexus";
import { defaultFunc } from "../helpers/utils";

// Context props
type ContextProps = {
  user: string | null;
  disconnect: any;
  connect: any;
  accessAllowed: boolean;
  verifying: boolean;
  client: NexusClient | null;
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
  accessAllowed: false,
  verifying: true,
  client: null,
});

export const AppContextProvider = ({ children }: AppContextProps) => {
  // Auth hook
  const { user, connect, disconnect } = useGrinderyNexus();

  const [accessAllowed, setAccessAllowed] = useState<boolean>(false);

  // verification state
  const [verifying, setVerifying] = useState<boolean>(true);

  // Nexus API client
  const [client, setClient] = useState<NexusClient | null>(null);

  const verifyUser = async () => {
    setVerifying(true);
    const res = await client?.isAllowedUser().catch((err) => {
      console.error("isAllowedUser error:", err.message);
      setAccessAllowed(false);
    });
    if (res) {
      setAccessAllowed(true);
    } else {
      setAccessAllowed(false);
    }
    setVerifying(false);
  };

  useEffect(() => {
    if (user) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        disconnect,
        connect,
        accessAllowed,
        verifying,
        client,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
