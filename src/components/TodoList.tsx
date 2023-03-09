import React from "react";
import { db } from "@/libs/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {
  HStack,
  Select,
  Button,
  Box,
  Spacer,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import Link from "next/link";
import { formatDateStr } from "@/utils";
const TodoList = (props: any) => {
  //削除処理
  const deleteTodo = async (docId: string) => {
    await deleteDoc(doc(db, "todoposts", docId));
    props.setIsEdit(true);
  };
  return (
    <Tbody fontWeight={"bold"}>
      {props.todos.map((todo: any) => {
        let statusFontSize = "18px";
        let statusBorderColor = "#023945";
        let statusBackgroundColor = "#F0FCFF";
        return (
          <Tr key={todo.todoid} sx={{ td: { padding: 0 } }} height={"56px"}>
            <Td>
              <Box w={"100%"} h={"100%"} px={"12px"} py={"18px"}>
                <Link href={todo.todoid + "/todo_show"}>{todo.title}</Link>
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
                  onClick={(e) =>
                    props.statusChangeTodo(todo.status, todo.todoid)
                  }
                  fontSize={props.statuslist[todo.status - 1].statusFontSize}
                  borderColor={
                    props.statuslist[todo.status - 1].statusBorderColor
                  }
                  backgroundColor={
                    props.statuslist[todo.status - 1].statusBackgroundColor
                  }
                >
                  {props.statuslist[todo.status - 1].status}
                </Button>
              </Box>
            </Td>
            <Td>
              <Box display={"inline-block"} w={"100%"} textAlign="center">
                <Select
                  display={"inline-block"}
                  w={"112px"}
                  borderColor={"#30494F"}
                  onChange={(e) => props.priorityChangeTodo(e, todo.todoid)}
                  value={todo.priority}
                >
                  {props.prioritylist.map((priorityItem: any) => (
                    <option key={priorityItem.id} value={priorityItem.id}>
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
  );
};

export default TodoList;
