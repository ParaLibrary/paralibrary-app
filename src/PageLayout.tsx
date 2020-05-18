import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "./AuthContextProvider";
import { Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import ConfirmationContext, { Message } from "./ConfirmationContext";

interface PageLayoutProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;
  @media screen and (min-width: 480px) {
    display: grid;
    grid-template-columns: auto 30%;
    column-gap: 32px;
    row-gap: 16px;
    grid-template-rows: auto;
    grid-template-areas:
      "header header"
      "main sidebar";
  }
`;

const Main = styled.div`
  position: sticky;
  @media screen and (min-width: 480px) {
    grid-area: main;
    position: static;
    top: auto;
  }
`;

const Header = styled.header`
  grid-area: header;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
`;
// Note: in small viewport the sidebar will
// appear after main content

const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  sidebar,
  children,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<Message>({
    body: "",
  });
  const action = useRef<VoidFunction>(() => {});

  const requestConfirmation = (call: VoidFunction, message: Message) => {
    setConfirmMessage(message);
    setConfirmModalOpen(true);
    action.current = call;
  };

  const handleConfirm = useCallback(() => {
    setConfirmModalOpen(false);
    action.current();
  }, []);

  const handleCancel = useCallback(() => {
    setConfirmModalOpen(false);
  }, []);

  return (
    <AuthContext.Consumer>
      {(context) => {
        if (context === undefined) {
          console.error(
            "The AuthContext Consumer must be used inside an AuthContextProvider"
          );
        }
        if (!context.credential.authenticated) {
          return <Redirect to="/" />;
        }
        return (
          <ConfirmationContext.Provider value={requestConfirmation}>
            <Layout>
              {header && <Header>{header}</Header>}
              <Main>{children}</Main>
              {sidebar && <Sidebar>{sidebar}</Sidebar>}

              <Modal show={confirmModalOpen} onHide={handleCancel}>
                <Modal.Header closeButton>
                  <Modal.Title>{confirmMessage.title || "Confirm"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{confirmMessage.body}</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => handleCancel()}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => handleConfirm()}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </Layout>
          </ConfirmationContext.Provider>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default PageLayout;
