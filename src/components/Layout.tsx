import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";
import { Flex, Button, Spacer, Center } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/libs/firebase";
import Link from "next/link";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const ref = useRef(true);

  const logout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    // 初回レンダリング時はrefをfalseにして、return。
    if (ref.current) {
      ref.current = false;
      return;
    }
    if (user) {
      if (router.pathname === "/signup" || router.pathname === "/login") {
        router.push("/");
      }
    } else {
      if (router.pathname !== "/signup" && router.pathname !== "/login") {
        router.push("/login");
      }
    }
  }, [user]);
  return (
    <>
      <Header>
        <Center>
          <Flex w="1080px" align="center">
            <H1>
              <Link href="/">TODO</Link>
            </H1>
            <Spacer />
            {user ? (
              <Button onClick={logout}>ログアウト</Button>
            ) : (
              <Flex w="200px">
                <Link href="/signup">サインアップ</Link>
                <Spacer />
                <Link href="/login">ログイン</Link>
              </Flex>
            )}
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
