import styled from "@emotion/styled";
import React from "react";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header>
        <H1>TODO</H1>
      </Header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

const Header = styled.div`
  background: #95e3f4;
  padding: 12px 0;
`;

const H1 = styled.h1`
  width: 1080px;
  margin: 0 auto;
  font-family: Roboto;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: 0em;
  text-align: left;
`;
