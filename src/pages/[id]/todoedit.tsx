import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  Input,
  Textarea,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { formatDateStr } from "@/utils";
import { docId } from "../../atom";
import { useAtom } from "jotai";

function TodoEdit() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [docData, setDocData] = useState({});
  const [detail, setDetail] = useState("");
  const [createData, setCreateData] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [count, setCount] = useAtom(docId);

  //console.log(router.query.count);
  useEffect(() => {
    (async () => {
      setCount(window.location.pathname.slice(1, 21));
      const docID = window.location.pathname.slice(1, 21);
      const docref = await doc(db, "todoposts", docID);
      const docsnap = await getDoc(docref);

      if (docsnap.exists() === false) {
        router.replace('/404');
        return;
      }

      const array = { ...docsnap.data() };
      array && setDocData(array);
      setDetail(array.detail);
      setTitle(array.title);
      const create = formatDateStr(array.create.seconds);
      create && setCreateData(create);
      const update = formatDateStr(array.update.seconds);
      update && setUpdateData(update);
    })();
  }, []);
  const submitTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const submitDetail = (e: any) => {
    setDetail(e.target.value);
  };
  const back = () => {
    router.push({
      pathname: "/",
    });
  };
  const submitUpdate = () => {
    if (title !== "" && detail !== "") {
      if (title.length < 66 && detail.length < 520) {
        //データ追加
        const cityRef = doc(db, "todoposts", count);
        setDoc(
          cityRef,
          { title: title, detail: detail, update: serverTimestamp() },
          { merge: true }
        );

        router.push({
          pathname: "/",
        });
      } else {
        alert("titleは66字未満、detailは520字未満に設定してください。");
      }
    } else {
      alert("titleまたはdetailが未入力です。");
    }
  };
  return (
    <>
      <Layout>
        <Container>
          <Flex mb="10px">
            <Box fontSize="25px">EDIT TODO</Box>
            <Spacer />
            <Button
              bg="#95e3f4"
              size="sm"
              p="0 20px"
              border="1px solid black"
              borderRadius="15px"
              w="100px"
              onClick={back}
            >
              Back
            </Button>
          </Flex>

          <Text fontSize="24px">TITLE</Text>
          <Input
            type="text"
            name={title}
            value={title}
            onChange={submitTitle}
            width="1080px"
            height="71px"
          />

          <Text fontSize="24px">DETAIL</Text>
          <Textarea
            value={detail}
            name={detail}
            onChange={submitDetail}
            width="1080px"
            height="287px"
          />

          <Flex>
            <Box>
              <Text fontSize="md" marginTop="10px">
                Create
              </Text>
              <Text fontSize="lg">{createData}</Text>
            </Box>
            <Box margin="0 30px">
              <Text fontSize="md" marginTop="10px">
                Update
              </Text>
              <Text fontSize="lg">{updateData}</Text>
            </Box>
            <Spacer />
            <Button
              bg="#40D1F1"
              size="sm"
              p="0 20px"
              border="1px solid black"
              borderRadius="15px"
              color="White"
              w="100px"
              marginTop="24px"
              onClick={submitUpdate}
            >
              UPDATE
            </Button>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}

export default TodoEdit;

const Container = styled.div`
  font-weight: bold;
  padding: 20px 0;
  margin: 0 auto;
  width: 100%;
  min-width: 150px;
  max-width: 1080px;
`;
