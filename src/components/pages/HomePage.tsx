import React from "react";
import styled from "styled-components";
import ConnectButton from "../shared/ConnectButton";
import useAppContext from "../../hooks/useAppContext";
import Header from "../shared/Header";
import AppHeader from "../shared/AppHeader";
import GoToZapier from "../shared/GoToZapier";

const Container = styled.div`
  padding: 120px 20px 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex-wrap: nowrap;
  min-height: calc(100vh - 180px);
  max-width: 604px;
  margin: 0 auto;
`;

type Props = {};

const WelcomePage = (props: Props) => {
  const { user } = useAppContext();

  return (
    <Container>
      <AppHeader />

      {!user && (
        <Wrapper>
          <Header />
          <ConnectButton />
        </Wrapper>
      )}

      {user && (
        <>
          <Wrapper>
            <Header />
          </Wrapper>
          <div
            style={{
              margin: "0 auto",
              background: "#F4F5F7",
              maxWidth: "1000px",
            }}
          >
            <zapier-full-experience
              client-id="ji8q03SkNlf9e7Y49AUa6YSPRH5cDxzftY4W5DzF"
              theme="light"
              app-search-bar-display="show"
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default WelcomePage;
