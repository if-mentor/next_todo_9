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
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import {
  IconButton,
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import TodoList from "@/components/TodoList";
import { Pagination } from "@/components/Pagination";
import { useAtom } from "jotai";
import { todoAtom } from "../../atom.js";

const PagedTodoTop = () => {
  const postPerPage = 6;
  const bgcColorPrimary = "#95E3F4";
  const colorPrimary = "#000000CC";
  const STh = styled(Th)`
    color: ${colorPrimary};
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
  const [filteredtodos, setFilteredtodos] = useAtom<string[]>(todoAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [priorityval, setPriorityval] = useState<number>(0);
  const [statusval, setStatusval] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pagedTodos, setPagedTodos] = useState<string[]>([]);

  //データ取得
  const router = useRouter();
  const arrList: any = [];
  const pageId: any = Number(router.query.id);
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

  useEffect(() => {
    setTotalCount(filteredtodos.length);
  }, [filteredtodos]);

  useEffect(() => {
    const startTodo = (pageId - 1) * postPerPage;
    const endTodo = (pageId - 1) * postPerPage + postPerPage;
    setPagedTodos(filteredtodos.slice(startTodo, endTodo));
    console.log(totalCount);
    console.log(pageId);
  }, [pageId]);

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
              <TodoList
                todos={pagedTodos}
                statuslist={statuslist}
                prioritylist={prioritylist}
                statusChangeTodo={statusChangeTodo}
              />
            </Table>
          </TableContainer>
          <Pagination
            totalCount={totalCount}
            PER_PAGE={postPerPage}
            pageId={pageId}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default PagedTodoTop;
