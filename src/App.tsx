import React, { useEffect } from "react";
import { ThemeProvider } from "grindery-ui";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import HomePage from "./components/pages/HomePage";
import AccountPage from "./components/pages/AccountPage";
import { sendTwitterConversion } from "./utils/twitterTracking";
import GrinderyLoginProvider from "use-grindery-login";

function App() {
  useEffect(() => {
    sendTwitterConversion("tw-ofep3-ofep4");
  }, []);

  return (
    <ThemeProvider>
      <GrinderyLoginProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </GrinderyLoginProvider>
    </ThemeProvider>
  );
}

export default App;
