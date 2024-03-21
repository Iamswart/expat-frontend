import { Container, Flex, Box } from "@chakra-ui/react";
import CreateUserForm from "../components/CreateUserForm";
import HomeImage from "../components/HomeImage";

const RegisterScreen = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: 'auto', md: '100vh' }}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'stretch' }}
        justify={{ base: 'center', md: 'space-between' }}
      >
        <Box 
          display={{ base: 'none', md: 'block' }}
          position={{ md: "fixed" }}
          w={{ base: "full", md: "50%" }} 
          h="100vh" 
          overflowY="hidden"
        >
          <HomeImage />
        </Box>
        <Box 
          w={{ base: "full", md: "50%" }} 
          ml={{ md: "50%" }}
          h="100vh"
          overflowY="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center" 
          p={{ base: 4, md: 0 }}
        >
          <CreateUserForm />
        </Box>
      </Flex>
    </Container>
  );
};

export default RegisterScreen;
