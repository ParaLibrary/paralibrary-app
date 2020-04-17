import React from "react";
import styled from "styled-components";

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
    grid-template-columns: auto 50px;
    column-gap: 16px;
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
  return (
    <Layout>
      {header && <Header>{header}</Header>}
      <Main>{children}</Main>
      {sidebar && <Sidebar>{sidebar}</Sidebar>}
    </Layout>
  );
};

export default PageLayout;
