import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { createStudent } from "../api.js"; 
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    course: "",
  });

  const navigate = useNavigate();

  const handleAddStudent = async () => {

    if (!studentData.name || !studentData.age || !studentData.course) {
      alert("All fields are required!");
      return;
    }

    try {
    
      await createStudent(studentData);
      navigate("/"); 

  
      setStudentData({
        name: "",
        age: "",
        course: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container
      maxW={{ base: "full", md: "container.sm" }}
      px={{ base: 4, md: 0 }}
      py={8}
    >
      <VStack spacing={8}>
        <Heading as={"h1"} size={{ base: "xl", md: "2xl" }} textAlign={"center"} mb={8}>
          Add a Student 🎓
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Student Name"
              name="name"
              type="text"
              value={studentData.name}
              onChange={handleChange}
              size="lg"
            />
            <Input
              placeholder="Age"
              name="age"
              type="number"
              value={studentData.age}
              onChange={handleChange}
              size="lg"
              min={1}
            />
            <Input
              placeholder="Course"
              name="course"
              type="text"
              value={studentData.course}
              onChange={handleChange}
              size="lg"
            />

            <Button
              colorScheme="blue"
              w={{ base: "full", md: "auto" }}
              size="lg"
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
