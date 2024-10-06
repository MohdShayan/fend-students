import {
    Container,
    SimpleGrid,
    Text,
    VStack,
    Input,
    Button,
    HStack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { getStudents } from "../api"; 
  import StudentCard from "../components/StudentCard";

  const HomePage = () => {
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState("");
    const [age, setAge] = useState("");
  
    const fetchStudents = async (filterOptions = {}) => {
      try {
        const response = await getStudents(filterOptions);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    useEffect(() => {
      fetchStudents();
    }, []);
  
    const handleSearch = async () => {
      const filterOptions = {
        course,
        age,
      };
      fetchStudents(filterOptions);
    };
  
    const handleReset = () => {
      setCourse("");
      setAge("");
      fetchStudents();
    };
  
    const bg = useColorModeValue("#ABECFF", "gray.600");
    const inpbg = useColorModeValue("#D2E4E8", "#2C2C2C");
    const txtbg = useColorModeValue("black", "white");
    const hoverBgLight = "#87E0E0";
    const hoverBgDark = "gray.700";
 
  
    return (
      <Container maxW="container.xl" py={5}>
        <VStack spacing={8}>
          <Text
            fontSize={{ base: "24px", md: "31px" }} 
            fontWeight={"bold"}
            bgClip={"text"}
            textAlign={"center"}
            textColor={"orange"}
          >
            Students List 🎓
          </Text>
  
          <HStack spacing={4} mb={8} wrap="wrap" justifyContent="center">
            <Input
              placeholder="Filter by course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              bg={inpbg}
              color={txtbg}
              name="course"
              width={{ base: "100%", md: "auto" }} 
            />
            <Input
              placeholder="Filter by age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              bg={inpbg}
              color={txtbg}
              name="age"
              width={{ base: "100%", md: "auto" }} 
            />
            <Button
              bg={bg}
              onClick={handleSearch}
              px={8}
              m={2}
              _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}
            >
              Search
            </Button>
            <Button
              bg={bg}
              onClick={handleReset}
              px={8}
              m={2}
              _hover={{ bg: useColorModeValue(hoverBgLight, hoverBgDark) }}
            >
              Reset
            </Button>
          </HStack>
  
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={{ base: 5, md: 10 }} 
          >
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  fetchStudents={fetchStudents}
                />
              ))
            ) : (
              <HStack textAlign={"center"} w="full">
                <Text
                  fontSize={{ base: "lg", md: "xl" }} 
                  fontWeight="bold"
                  color="gray.500"
                  textAlign={"center"}
                >
                  No students found ☹️{" "}
                  <Link to={"/create"}>
                    <Text
                      as="span"
                      color="blue.500"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Add a Student 🎓
                    </Text>
                  </Link>
                </Text>
              </HStack>
            )}
          </SimpleGrid>
        </VStack>
      </Container>
    );
  };
  
  export default HomePage;
  