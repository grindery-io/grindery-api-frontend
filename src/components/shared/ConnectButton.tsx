import React from "react";
import styled from "styled-components";
import { useGrinderyNexus } from "use-grindery-nexus";
import { ICONS } from "../../constants";
import useAppContext from "../../hooks/useAppContext";
import AlertBox from "./AlertBox";
import Button from "./Button";
import WarningIcon from "./WarningIcon";

const ButtonWrapper = styled.div`
  margin: 10px auto 0;
`;

const ButtonDesc = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #898989;
  margin: 20px 0 0;
`;

const FlowConnectButtonWrapper = styled.div`
  margin: 0 auto 0;
  .MuiButton-root {
    margin-top: 0 !important;
  }
`;

type Props = {};

const ConnectButton = (props: Props) => {
  const { user, connect } = useAppContext();
  const { connectFlow } = useGrinderyNexus();

  return user ? null : (
    <>
      {"ethereum" in window ? (
        <>
          <ButtonWrapper>
            <Button
              onClick={() => {
                connect();
              }}
              icon={ICONS.METAMASK_LOGO}
              value="Connect MetaMask"
              hideIconBorder
            />
          </ButtonWrapper>
        </>
      ) : (
        <AlertBox color="warning" icon={<WarningIcon />}>
          <p>
            The app is unable to detect{" "}
            <a href="https://metamask.io/" target="_blank" rel="noreferrer">
              MetaMask
            </a>
            . Make sure you have it installed in this browser.
          </p>
        </AlertBox>
      )}

      <FlowConnectButtonWrapper>
        <Button
          onClick={() => {
            connectFlow();
          }}
          icon={ICONS.FLOW_LOGO}
          value="Connect Flow Wallet"
          hideIconBorder
        />
      </FlowConnectButtonWrapper>
      <ButtonDesc>
        Grindery Gateway uses{" "}
        <a href="https://metamask.io/" target="_blank" rel="noreferrer">
          MetaMask
        </a>{" "}
        and{" "}
        <a
          href="https://developers.flow.com/tools/fcl-js"
          target="_blank"
          rel="noreferrer"
        >
          Flow Client Library
        </a>{" "}
        to authenticate users.
      </ButtonDesc>
    </>
  );
};

export default ConnectButton;
