import React from "react";
import styled from "@emotion/styled";
import { Center, Button, Input } from "@chakra-ui/react";

const FormArea = (props: any) => {
  return (
    <>
      <Header>
        <H1>TODO</H1>
      </Header>
      <main>
        <Container>
          <H2>EMAIL</H2>
          <Dl>
            <Dt>メールアドレス</Dt>
            <Dd>
              <Input bg={"#F0FFF4"} rounded={40} px={5} py={3} />
            </Dd>
          </Dl>
          <Dl>
            <Dt>パスワード</Dt>
            <Dd>
              <Input bg={"#F0FFF4"} rounded={40} px={5} py={3} />
            </Dd>
          </Dl>
          <Center>
            <Button
              bg={"#28ADCA"}
              rounded={50}
              w={"204px"}
              h={"54px"}
              color={"#F0FCFF"}
              fontSize="24px"
            >
              {props.button}
            </Button>
          </Center>
        </Container>
      </main>
    </>
  );
};

export default FormArea;

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
const Container = styled.div`
  width: 747px;
  margin: 92px auto;
  background: #c8f5ff;
  border-radius: 40px;
  padding: 54px 38px;
`;
const H2 = styled.h2`
  width: 195px;
  height: 44px;
  color: #28adca;
  background: #f0fcff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Gothic A1;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;

  margin-bottom: 8px;
`;
const Dl = styled.dl`
  width: 540px;
  margin: 0 auto 24px auto;
`;
const Dt = styled.dt`
  font-family: Gothic A1;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
`;
const Dd = styled.dd`
  width: 100%;
`;
