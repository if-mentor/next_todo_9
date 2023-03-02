import Layout from "@/components/Layout";
import React from "react";
import styled from "@emotion/styled";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

function a404() {
  const router = useRouter();
  const submitTop = () => {
    router.push({
      pathname: `/TodoTop`,
    });
  };
  return (
    <>
      <Layout>
        <P1>404</P1>
        <P2>this is not the web page you are looking for.</P2>
        <Button
          width="112px"
          height="40px"
          border="1px solid rgba(0, 0, 0, 0.8)"
          borderRadius="50px"
          background="#E28F84"
          display="block"
          marginLeft="auto"
          marginRight="auto"
          onClick={submitTop}
        >
          <P3>TOP</P3>
        </Button>
      </Layout>
    </>
  );
}

export default a404;

const P1 = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 75px;
  width: 130px;
  height: 75px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 41px;
  margin-top: 51px;
  margin-left: auto;
  margin-right: auto;
`;
const P2 = styled.p`
  width: 560px;
  height: 29px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 41px;
  margin-left: auto;
  margin-right: auto;
`;
const P3 = styled.p`
  font-family: "Gothic A1";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  text-transform: uppercase;
  width: 37px;
  height: 23px;
  margin-left: auto;
  margin-right: auto;
`;
