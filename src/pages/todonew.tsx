import React from "react";

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
} from "@chakra-ui/react";

const todonew = () => {
  return (
    <div>
      <Box
        mb={3}
        w="100%"
        h="50px"
        bg="green.300"
        pl={10}
        pt={1}
        fontSize="1.8em"
      >
        TODOあああ
      </Box>
      <Box mr={10} ml={10}>
        <FormControl>
          <Flex>
            <Box w={"100%"}>
              <FormLabel htmlFor="newtodo">NEW TODO</FormLabel>
            </Box>
            <Box textAlign={"right"}>
              <Button
                bg="green.200"
                type="button"
                borderRadius="full"
                variant="outline"
              >
                Back
              </Button>
            </Box>
          </Flex>
          <Text mb={1}>TITLE</Text>
          <Input mb={5} type="text" defaultValue="Text" />
          <Text mb={1}>DETAIL</Text>
          <Textarea id="message" mb={5} h="150px" defaultValue="Text" />
          <Text mb={1}>PRIORITY</Text>
          <RadioGroup>
            <Stack direction="row">
              <Radio value="1">High</Radio>
              <Radio value="2">Middle</Radio>
              <Radio value="3">Low</Radio>
            </Stack>
          </RadioGroup>
          <Box mt={4} textAlign={"right"}>
            {" "}
            <Button mr={3} type="button" borderRadius="full" bg="red.100">
              DRAFT
            </Button>
            <Button colorScheme="green" type="submit" borderRadius="full">
              CREATE
            </Button>
          </Box>
        </FormControl>
      </Box>
    </div>
  );
};

export default todonew;
