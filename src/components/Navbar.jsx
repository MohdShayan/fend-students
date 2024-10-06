import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  import { Link } from "react-router-dom";
  import { PlusSquareIcon } from "@chakra-ui/icons";
  import { IoMoon } from "react-icons/io5";
  import { LuSun } from "react-icons/lu";
  
  const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue("#2D3748", "#171923");
    const text = useColorModeValue("#fff", "#fff");
    const btn =  useColorModeValue("#4b5f7f", "#2D3748");


  
    return (
      <Container maxW="100vw" px={{ base: 4, md: 18 }} py={1} bg={bg}>
        <Flex
          h={{ base: 16, md: 20 }}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", sm: "row" }}
          color="white"
        >
          <Text
            bg={"white"}
            bgClip="text"
            fontSize={{ base: "24px", sm: "30px", md: "35px" }}
            fontWeight="bold"
            textAlign={"center"}
            mb={{ base: 2, sm: 0 }}
          >
            <Link to={"/"}>Student Management </Link>
          </Text>
  
          <HStack
            spacing={{ base: 2, sm: 4 }}
            alignItems={"center"}
            justifyContent={"center"}
            w={{ base: "100%", sm: "auto" }}
          >
            <Link to={"/create"}>
              <Button
                aria-label="Add new student"
                
                size={{ base: "sm", md: "md" }}
                w={{ base: "full", sm: "auto" }}
                textColor={text}
                bg={btn}
              >
                <PlusSquareIcon fontSize={20} />
                Add Student
              </Button>
            </Link>
            <Button
              aria-label="Toggle Theme"
              onClick={toggleColorMode}
              bg={btn}
              size={{ base: "sm", md: "md" }}
              w={{ base: "full", sm: "auto" }}
              textColor={text}
            >
              {colorMode === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    );
  };
  
  export default Navbar;
  