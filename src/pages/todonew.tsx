import React, { useState, ChangeEvent, useEffect } from "react";
import Layout from "@/components/Layout";
import NextLink from "next/link";

//Chakra UI
import {
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  Container,
  Link,
} from "@chakra-ui/react";

import { collection, Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useRouter } from "next/router";

const TodoNew = () => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [priority, setPriority] = useState<number>(3);
  const [titleError, setTitleError] = useState<string>("");
  const [detailError, setDetailError] = useState<string>("");
  const [isError, setIsError] = useState({ title: true, detail: true });
  const router = useRouter();

  const validateTitle = (title: string) => {
    const maxTitleLength = 20;
    let titleError = "";

    //　制限1.空の場合
    if (!title) {
      titleError = "タイトルを入力してください";
      setIsError((prev) => ({ ...prev, title: true }));
      //　制限2.文字数が65文字より多い場合
    } else if (title.length > maxTitleLength) {
      titleError = `投稿は${maxTitleLength}文字以内で入力してください`;
      setIsError((prev) => ({ ...prev, title: true }));
    } else {
      setIsError((prev) => ({ ...prev, title: false }));
    }
    //検証に引っ掛かった時、エラーを保持するstateを更新
    setTitleError(titleError);
  };

  const validateDetail = (detail: string) => {
    const maxDetailLength = 519;
    let detailError = "";

    //　制限1.空の場合
    if (!detail) {
      detailError = "本文を入力してください";
      setIsError((prev) => ({ ...prev, detail: true }));
      //　制限2.文字数が519文字より多い場合
    } else if (detail.length > maxDetailLength) {
      detailError = `投稿は${maxDetailLength}文字以内で入力してください`;
      setIsError((prev) => ({ ...prev, detail: true }));
    } else {
      setIsError((prev) => ({ ...prev, detail: false }));
    }
    //検証に引っ掛かった時、エラーを保持するstateを更新
    setDetailError(detailError);
  };

  // タイトルと本文が空の場合にエラーをセットする
  useEffect(() => {
    validateTitle("");
    validateDetail("");
  }, []);

  // タイトルと本文が変更された時にバリデーションを実行
  useEffect(() => {
    if (title || detail) {
      validateTitle(title);
      validateDetail(detail);
    } else {
      setTitleError("1文字以上入力してください");
      setDetailError("1文字以上入力してください");
    }
  }, [title, detail]);

  const handleClick = async () => {
    try {
      const newTodoposts = doc(collection(db, "todoposts"));
      await setDoc(newTodoposts, {
        uid: null,
        todoid: newTodoposts.id,
        title: title,
        detail: detail,
        status: 1,
        priority: priority,
        create: Timestamp.now(),
        update: Timestamp.now(),
        comid: null,
      });
      router.push({
        pathname: "/",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(event.target.value);
  };
  const handleRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(Number(event.target.value));
  };

  return (
    <div>
      <Layout>
        <Container maxW={"1080px"} position={"relative"} p={"0"}>
          <Box>
            <FormControl>
              <Flex mt={5}>
                <Box w={"100%"}>
                  <FormLabel
                    htmlFor="newtodo"
                    fontWeight={"bold"}
                    fontSize={"28px"}
                  >
                    NEW TODO
                  </FormLabel>
                </Box>
                <Link as={NextLink} href="/">
                  <Box textAlign={"right"}>
                    <Button
                      bg="#95E3F4"
                      type="button"
                      borderRadius="full"
                      variant="outline"
                    >
                      Back
                    </Button>
                  </Box>
                </Link>
              </Flex>
              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                TITLE
              </Text>

              <Input
                mb={5}
                type="text"
                placeholder="Text"
                onChange={handleInputChange}
                value={title}
              />
              {titleError && <Text color="red">{titleError}</Text>}

              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                DETAIL
              </Text>
              <Textarea
                mb={5}
                h="192px"
                placeholder="Text"
                onChange={handleTextareaChange}
                value={detail}
              />
              {detailError && <Text color="red">{detailError}</Text>}

              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                PRIORITY
              </Text>
              <RadioGroup defaultValue="3">
                <Stack
                  direction="row"
                  fontSize={"24px"}
                  onChange={handleRadioButtonChange}
                >
                  <Radio value="1">High</Radio>
                  <Radio value="2">Middle</Radio>
                  <Radio value="3">Low</Radio>
                </Stack>
              </RadioGroup>
              <Box mt={4} textAlign={"right"}>
                <Button
                  bg="#40D1F1"
                  colorScheme="twitter"
                  type="submit"
                  borderRadius="full"
                  onClick={() => handleClick()}
                  isDisabled={isError.title || isError.detail}
                >
                  CREATE
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default TodoNew;
