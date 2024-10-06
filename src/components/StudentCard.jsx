import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateStudent, deleteStudent } from "../api";

const StudentCard = ({ student, fetchStudents }) => {
  const [updatedStudent, setUpdatedStudent] = useState(student);
  const textColor = useColorModeValue("#333333", "#EAEAEA");
  const bg = useColorModeValue("#D2E4E8", "#2C2C2C");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      setUpdatedStudent(student);
    }
  }, [isOpen, student]);

  const handleDeleteStudent = async (id) => {
    try {
      const response = await deleteStudent(id);
      fetchStudents(); // Refresh the student list
      toast({
        title: "Success",
        description: response.data.message || "Student deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Error deleting student";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateStudent = async (id) => {
    try {
      await updateStudent(id, updatedStudent);
      onClose();
      fetchStudents(); // Refresh the student list
      toast({
        title: "Success",
        description: "Student updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || "Error updating student";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      bg={bg}
      className="border"
    >
      <Image
        src="https://cdn.vectorstock.com/i/500p/11/69/blank-avatar-profile-picture-vector-45161169.jpg"
        alt={student.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {student.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={2}>
          Age: {student.age}
        </Text>
        <Text color={textColor} marginY={"10px"}>
          Course: {student.course}
        </Text>
        <Text color={textColor} marginY={"10px"}>
          Enrollment Date: {new Date(student.enrollmentDate).toLocaleDateString()}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteStudent(student._id)}
            colorScheme="pink"
            backgroundColor="#F81D55"
            color="white"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                name="name"
                value={updatedStudent.name}
                onChange={(e) =>
                  setUpdatedStudent({ ...updatedStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="Age"
                type="number"
                name="age"
                value={updatedStudent.age}
                onChange={(e) =>
                  setUpdatedStudent({ ...updatedStudent, age: e.target.value })
                }
              />
              <Input
                placeholder="Course"
                name="course"
                value={updatedStudent.course}
                onChange={(e) =>
                  setUpdatedStudent({ ...updatedStudent, course: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateStudent(student._id)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudentCard;
