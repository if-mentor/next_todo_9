import { db } from "@/libs/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
//unix時間を画面表示する文字列へ変換
import { formatDateStr } from "@/utils";

import styled from "@emotion/styled";
import {
  Stack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  IconButton,
  Box,
  Spacer,
  Container,
  InputGroup,
  InputRightElement,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";

const TodoTop = () => {
  const bgcColorPrimary = "#95E3F4";
  const colorPrimary = "#000000CC";
  const STh = styled(Th)`
    color: ${colorPrimary};
  `;
  const SButtonPage = styled(Button)`
    width: 40px;
    height: 40px;
    border: 1px solid #000000cc;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    background-color: #ffffff;
  `;
  const SButtonPagePrev = styled(SButtonPage)`
    background-color: #b5b5b5;
    color: #ffffff;
    border: none;
  `;
  const SButtonPageNext = styled(SButtonPage)`
    color: #b5b5b5;
  `;

  //status構成要素定義
  const statuslist = [
    {
      id: 1,
      status: "NOT STARTED",
      statusFontSize: "12px",
      statusBorderColor: "#001F2B",
      statusBackgroundColor: "#F0FCFF",
    },
    {
      id: 2,
      status: "DOING",
      statusBackgroundColor: "#95E3F4",
    },
    {
      id: 3,
      status: "DONE",
      statusBackgroundColor: "#28ADCA",
    },
  ];

  //Priority構成要素定義
  const prioritylist = [
    {
      id: 1,
      priority: "High",
    },
    {
      id: 2,
      priority: "Middle",
    },
    {
      id: 3,
      priority: "Low",
    },
  ];

  //useState設定
  const [todos, setTodos] = useState<string[]>([]);
  const [filteredtodos, setFilteredtodos] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [priorityval, setPriorityval] = useState<number>(0);
  const [statusval, setStatusval] = useState<number>(0);

  //データ取得
  const arrList: any = [];
  useEffect(() => {
    const fireStorePostData = collection(db, "todoposts");
    getDocs(fireStorePostData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        const docid = docs.id;
        arrList.push({
          uid: doc.uid,
          todoid: docid,
          title: doc.title,
          detail: doc.detail,
          status: doc.status,
          priority: doc.priority,
          create: doc.create,
          update: doc.update,
          comid: doc.comid,
        });
      });

      setTodos(arrList);
      setFilteredtodos(arrList);
      setIsEdit(false);

      //再フィルタリング
      if (priorityval != 0) {
        const filteredList = todos.filter(
          (todo: any) => todo.priority === priorityval
        );
        setFilteredtodos(filteredList);
      }
      if (statusval != 0) {
        const filteredList = todos.filter(
          (todo: any) => todo.status === statusval
        );
        setFilteredtodos(filteredList);
      }
    });
  }, [isEdit]);

  //削除処理
  const deleteTodo = async (docId: string) => {
    await deleteDoc(doc(db, "todoposts", docId));
    setIsEdit(true);
  };

  //status変更処理
  const statusChangeTodo = async (event: any, docId: string) => {
    let priID = Number(event.target.value);

    await updateDoc(doc(db, "todoposts", docId), {
      priority: priID,
    });

    setIsEdit(true);
  };

  //検索処理
  const handleSearch = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };
  const searchFilter = () => {
    //初期状態
    setFilteredtodos(todos);
    setPriorityval(0);
    setStatusval(0);
    const filteredList = todos.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm)
    );
    setFilteredtodos(filteredList);
  };

  //statusフィルター処理(or条件)
  const statusFilter = (event: any) => {
    let status = Number(event.target.value);
    setStatusval(status);
    setPriorityval(0);
    setSearchTerm("");
    if (status === 0) {
      //リセット
      setFilteredtodos(todos);
    } else {
      const filteredList = todos.filter((todo: any) => todo.status === status);
      setFilteredtodos(filteredList);
    }
  };

  //priorityフィルター処理(or条件)
  const priorityFilter = (event: any) => {
    let priority = Number(event.target.value);
    setPriorityval(priority);
    setStatusval(0);
    setSearchTerm("");
    if (priority === 0) {
      //リセット
      setFilteredtodos(todos);
    } else {
      const filteredList = todos.filter(
        (todo: any) => todo.priority === priority
      );
      setFilteredtodos(filteredList);
    }
  };

  //フィルターreset処理
  const resetFilter = () => {
    setFilteredtodos(todos);
    setStatusval(0);
    setPriorityval(0);
    setSearchTerm("");
  };

  return (
    <Layout>
      <Box color={colorPrimary}>
        <Container maxW={"1080px"} position={"relative"} p={"0"}>
          <Link href={"/todonew"}>
            <IconButton
              position={"absolute"}
              top={"10px"}
              right={"20px"}
              rounded={"full"}
              backgroundColor={"#40D1F1"}
              border={"1px solid #B5B5B5"}
              aria-label="button new"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.933716 4.5H11.9337V6.5H0.933716V4.5ZM0.933716 2.5H11.9337V0.5H0.933716V2.5ZM0.933716 10.5H7.93372V8.5H0.933716V10.5ZM15.9437 7.37L16.6537 6.66C17.0437 6.27 17.6737 6.27 18.0637 6.66L18.7737 7.37C19.1637 7.76 19.1637 8.39 18.7737 8.78L18.0637 9.49L15.9437 7.37ZM15.2337 8.08L9.93372 13.38V15.5H12.0537L17.3537 10.2L15.2337 8.08Z"
                    fill="black"
                  />
                </svg>
              }
            />
          </Link>
          <Heading fontSize={"28px"} m={"16px 0 16px 0"}>
            {"TODO LIST"}
          </Heading>
          <HStack spacing={"24px"} w={"container.md"}>
            <Stack w={"490px"} h={"71px"}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                SEARCH
              </Text>
              <InputGroup>
                <Input
                  type="text"
                  borderColor={colorPrimary}
                  value={searchTerm}
                  onChange={handleSearch}
                />

                <InputRightElement width="4rem">
                  <IconButton
                    position={"absolute"}
                    rounded={"full"}
                    backgroundColor={"red.100"}
                    aria-label="SEARCH"
                    onClick={() => searchFilter()}
                    w={50}
                    h={"30px"}
                    icon={
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 2 20 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.0001 8.50005C15.0001 12.0899 12.0899 15.0001 8.50005 15.0001C4.91017 15.0001 2 12.0899 2 8.50005C2 4.91017 4.91017 2 8.50005 2C12.0899 2 15.0001 4.91017 15.0001 8.50005ZM13.3876 15.4552C12.0051 16.4286 10.3193 17.0001 8.50005 17.0001C3.8056 17.0001 0 13.1945 0 8.50005C0 3.8056 3.8056 0 8.50005 0C13.1945 0 17.0001 3.8056 17.0001 8.50005C17.0001 10.6537 16.1991 12.6203 14.8789 14.1181L19.2068 18.4503C19.5971 18.841 19.5971 19.4745 19.2068 19.8652C18.8165 20.2559 18.1836 20.2559 17.7933 19.8652L13.3876 15.4552Z"
                          fill="#C2C2C2"
                        />
                      </svg>
                    }
                  />
                </InputRightElement>
              </InputGroup>
            </Stack>

            <Stack w={"190px"} h={"71px"}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                STATUS
              </Text>
              <Select
                borderColor={colorPrimary}
                placeholder="- - - - - - -"
                onChange={(e) => statusFilter(e)}
                value={statusval}
              >
                {statuslist.map((statusItem) => (
                  <option key={statusItem.id} value={statusItem.id}>
                    {statusItem.status}
                  </option>
                ))}
              </Select>
            </Stack>

            <Stack w={"190px"} h={"71px"}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                PRIORITY
              </Text>
              <Select
                borderColor={colorPrimary}
                placeholder="- - - - - - -"
                onChange={(e) => priorityFilter(e)}
                value={priorityval}
              >
                {prioritylist.map((priorityItem) => (
                  <option key={priorityItem.id} value={priorityItem.id}>
                    {priorityItem.priority}
                  </option>
                ))}
              </Select>
            </Stack>

            <Stack w={"104px"} alignContent={"flex-end"} h={"71px"}>
              <Spacer />
              <Button
                rounded={"full"}
                fontSize={"18px"}
                w={"104px"}
                backgroundColor={"#B0C6CB"}
                onClick={() => resetFilter()}
              >
                RESET
              </Button>
            </Stack>
          </HStack>
          <TableContainer marginTop={"33px"}>
            <Table variant="simple" maxW={"100%"} overflow={"none"}>
              <Thead background={bgcColorPrimary}>
                <Tr
                  sx={{ th: { fontSize: "24px", textTransform: "none" } }}
                  height={"56px"}
                >
                  <STh minW={"384px"} maxW={"384px"}>
                    Task
                  </STh>
                  <STh minW={"139px"} maxW={"139px"} textAlign={"center"}>
                    Status
                  </STh>
                  <STh minW={"139px"} maxW={"139px"} textAlign={"center"}>
                    Priority
                  </STh>
                  <STh minW={"139px"} maxW={"139px"} textAlign={"center"}>
                    Create
                  </STh>
                  <STh minW={"139px"} maxW={"139px"} textAlign={"center"}>
                    Update
                  </STh>
                  <STh minW={"139px"} maxW={"139px"} textAlign={"center"}>
                    Action
                  </STh>
                </Tr>
              </Thead>
              <Tbody fontWeight={"bold"}>
                {filteredtodos.map((todo: any) => {
                  let statusFontSize = "18px";
                  let statusBorderColor = "#023945";
                  let statusBackgroundColor = "#F0FCFF";
                  return (
                    <Tr
                      key={todo.todoid}
                      sx={{ td: { padding: 0 } }}
                      height={"56px"}
                    >
                      <Td>
                        <Box w={"100%"} h={"100%"} px={"12px"} py={"18px"}>
                          <Link href={todo.todoid + "/todo_show"}>
                            {todo.title}
                          </Link>
                        </Box>
                      </Td>
                      <Td>
                        <Box
                          display={"inline-block"}
                          w={"100%"}
                          h={"100%"}
                          textAlign={"center"}
                        >
                          <Button
                            w={"104px"}
                            border={"1px"}
                            rounded={"full"}
                            textAlign={"center"}
                            fontSize={
                              statuslist[todo.status - 1].statusFontSize
                            }
                            borderColor={
                              statuslist[todo.status - 1].statusBorderColor
                            }
                            backgroundColor={
                              statuslist[todo.status - 1].statusBackgroundColor
                            }
                          >
                            {statuslist[todo.status - 1].status}
                          </Button>
                        </Box>
                      </Td>
                      <Td>
                        <Box
                          display={"inline-block"}
                          w={"100%"}
                          textAlign="center"
                        >
                          <Select
                            display={"inline-block"}
                            w={"112px"}
                            borderColor={"#30494F"}
                            onChange={(e) => statusChangeTodo(e, todo.todoid)}
                            value={todo.priority}
                          >
                            {prioritylist.map((priorityItem) => (
                              <option
                                key={priorityItem.id}
                                value={priorityItem.id}
                              >
                                {priorityItem.priority}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </Td>
                      <Td p={0} fontSize={"14px"} textAlign={"center"}>
                        {formatDateStr(todo.create.seconds)}
                      </Td>
                      <Td p={0} fontSize={"14px"} textAlign={"center"}>
                        {formatDateStr(todo.update.seconds)}
                      </Td>
                      <Td>
                        <Box>
                          <HStack>
                            <Link href={todo.todoid + "/todoedit/"}>
                              <Spacer px={"20px"}>
                                <svg
                                  width="19"
                                  height="18"
                                  viewBox="0 0 19 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.1396 6.02L12.0648 6.94L2.95277 16H2.02749V15.08L11.1396 6.02ZM14.7602 0C14.5088 0 14.2473 0.1 14.0562 0.29L12.2157 2.12L15.9873 5.87L17.8278 4.04C18.22 3.65 18.22 3.02 17.8278 2.63L15.4743 0.29C15.2732 0.09 15.0217 0 14.7602 0ZM11.1396 3.19L0.0159912 14.25V18H3.78754L14.9111 6.94L11.1396 3.19Z"
                                    fill="black"
                                    fillOpacity="0.8"
                                  />
                                </svg>
                              </Spacer>
                            </Link>
                            <button onClick={() => deleteTodo(todo.todoid)}>
                              <Spacer>
                                <svg
                                  width="14"
                                  height="18"
                                  viewBox="0 0 14 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1.44831 16C1.44831 17.1 2.31727 18 3.37934 18H11.1035C12.1655 18 13.0345 17.1 13.0345 16V4H1.44831V16ZM3.37934 6H11.1035V16H3.37934V6ZM10.6207 1L9.6552 0H4.82762L3.8621 1H0.482788V3H14V1H10.6207Z"
                                    fill="black"
                                    fillOpacity="0.8"
                                  />
                                </svg>
                              </Spacer>
                            </button>
                          </HStack>
                        </Box>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>

          <HStack justifyContent={"center"} marginTop={"16px"}>
            <SButtonPagePrev>{"<"}</SButtonPagePrev>
            <SButtonPage>1</SButtonPage>
            <SButtonPage>2</SButtonPage>
            <SButtonPage>...</SButtonPage>
            <SButtonPage>5</SButtonPage>
            <SButtonPage>6</SButtonPage>
            <SButtonPageNext>{">"}</SButtonPageNext>
          </HStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default TodoTop;
