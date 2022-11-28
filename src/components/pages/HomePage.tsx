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
      <Wrapper>
        <Header />
        {!user ? <ConnectButton /> : <GoToZapier />}
      </Wrapper>
    </Container>
  );
};

export default WelcomePage;
