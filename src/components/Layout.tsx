import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Flex, Button, Spacer, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>("");

  const logout = () => {
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    console.log(userId);
  }, [userId]);
  // useEffect(() => {
  //   if (userId) {
  //     console.log(userId + "でログイン中");
  //     if (router.pathname === "/signup") {
  //       // router.push("/TodoTop");
  //       console.log("トップにリダイレクトします");
  //     } else if (router.pathname === "/login") {
  //       // router.push("/TodoTop");
  //       console.log("トップにリダイレクトします");
  //     } else {
  //       console.log("signteupかlogin以外にいます");
  //     }
  //   } else {
  //     if (router.pathname === "/signup") {
  //       console.log("signteupかloginページにいます");
  //     } else if (router.pathname === "/login") {
  //       console.log("signteupかloginページにいます");
  //     } else {
  //       // router.push("/login");
  //       console.log("ログインにリダイレクトします");
  //     }
  //   }
  // }, [userId]);

  return (
    <>
      <Header>
        <Center>
          <Flex w="1080px" align="center">
            <H1>TODO</H1>
            <Spacer />
            {userId && <Button onClick={logout}>ログアウト</Button>}
          </Flex>
        </Center>
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
  font-family: Roboto;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: 0em;
  text-align: left;
`;
