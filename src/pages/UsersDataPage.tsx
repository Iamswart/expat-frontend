import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import UserTable from "../components/UserTable";
import { logout } from "../hooks/logout";


const UserDataPage = () => {
  return (
    <Flex direction="column" bg={""} minHeight="100vh">
      <Flex justify="space-between" align="center" width={"100%"} p={4}>
        <Image
          src="https://res.cloudinary.com/dfscst5lw/image/upload/v1693922785/Thrive-Together/1605.m00.i104.n045.P.c25.370135319_Vector_atom._Physics_atom_model_with_electrons-removebg-preview_aniqf5.png"
          ml={{ lg: "40px" }}
          boxSize={"40px"}
        />
        <Button colorScheme="red" onClick={logout} mr="30px">
          Logout
        </Button>
      </Flex>
      <Box flex="1" width={"100%"} mt={2}>
        <UserTable />
      </Box>
    </Flex>
  );
};

export default UserDataPage;
