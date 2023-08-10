import React, { useEffect } from "react";
import { ThemeProvider, CircularProgress } from "grindery-ui";
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
      <GrinderyLoginProvider
        loader={
          <div style={{ textAlign: "center", margin: "80px auto" }}>
            <CircularProgress />
          </div>
        }
        disconnectRedirectUrl="https://www.grindery.io/sign-out?sidebar_opened=1"
      >
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
