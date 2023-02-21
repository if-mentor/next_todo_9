import React, { useEffect ,useState,ChangeEvent} from "react";
import Layout from "@/components/Layout";


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
} from "@chakra-ui/react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/libs/firebase";


const todonew = () => {

  const [title,setTitle] = useState<string>('')
  const [detail,setDetail] = useState<string>('')
  const [priority,setPriority] = useState<string>('')

  const handleClick = async()=>{
    try {
      const docRef = await addDoc(collection(db, "todoposts"), {
        title: title,
        detail: detail,
        priority: priority
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(()=>{
    console.log('レンダーされました')
  },[title,detail,priority])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(event.target.value);
  }
  const handleRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriority(event.target.value);
  }
  
  
  
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
              </Flex>
              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                TITLE
              </Text>
             
              <Input mb={5} type="text" placeholder="Text" onChange={handleInputChange} />
              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                DETAIL
              </Text>
              <Textarea mb={5} h="192px" placeholder="Text" onChange={handleTextareaChange}/>
              <Text mb={1} fontWeight={"bold"} fontSize={"24px"}>
                PRIORITY
              </Text>
              <RadioGroup>
                <Stack direction="row" fontSize={"24px"} onChange={handleRadioButtonChange}>
                  <Radio value="1" >High</Radio>
                  <Radio value="2">Middle</Radio>
                  <Radio value="3">Low</Radio>
                </Stack>
              </RadioGroup>
              <Box mt={4} textAlign={"right"}>
                <Button mr={3} type="button" borderRadius="full" bg="red.100">
                  DRAFT
                </Button>
                <Button
                  bg="#40D1F1"
                  colorScheme="twitter"
                  type="submit"
                  borderRadius="full"
                  onClick={()=>handleClick()}
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

export default todonew;

