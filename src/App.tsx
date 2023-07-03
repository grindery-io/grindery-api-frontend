import React, { useEffect } from "react";
import { ThemeProvider } from "grindery-ui";
import GrinderyNexusContextProvider from "use-grindery-nexus";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import HomePage from "./components/pages/HomePage";
import EarlyAccessModal from "./components/shared/EarlyAccessModal";
import AccountPage from "./components/pages/AccountPage";
import { sendTwitterConversion } from "./utils/twitterTracking";

function App() {
  useEffect(() => {
    sendTwitterConversion("tw-ofep3-ofep4");
  }, []);

  return (
    <ThemeProvider>
      <GrinderyNexusContextProvider>
        <AppContextProvider>
          <EarlyAccessModal />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </GrinderyNexusContextProvider>
    </ThemeProvider>
  );
}

export default App;
