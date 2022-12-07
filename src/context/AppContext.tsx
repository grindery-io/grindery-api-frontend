import NexusClient from "grindery-nexus-client";
import React, { createContext, useCallback, useEffect, useState } from "react";
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
  const { user, connect, disconnect, token: nexusToken } = useGrinderyNexus();

  const [accessAllowed, setAccessAllowed] = useState<boolean>(false);

  // verification state
  const [verifying, setVerifying] = useState<boolean>(true);

  // Nexus API client
  const [client, setClient] = useState<NexusClient | null>(null);

  // Initialize user
  const initUser = useCallback(
    (userId: string | null, access_token: string) => {
      if (userId && access_token) {
        const nexus = new NexusClient();
        nexus.authenticate(access_token);
        setClient(nexus);
      }
    },
    []
  );

  const verifyUser = async () => {
    setVerifying(true);
    const res = await client?.isAllowedUser("gateway").catch((err) => {
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
    if (user && client) {
      verifyUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, client]);

  useEffect(() => {
    if (user) {
      initUser(user, nexusToken?.access_token || "");
    }
  }, [user, initUser, nexusToken]);

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
