import { Box, Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import HomeImage from "../components/HomeImage";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        direction={{ base: "column", md: "row" }} 
        justify={{ base: "center", md: "space-between" }} 
        align="center" 
      >
        <Box
          w={{ base: "full", md: "50%" }}
          h="100vh"
          overflowY="auto"
          p={{ base: 4, md: 0 }} 
        >
          <LoginForm />
        </Box>

        {!isMobile && ( 
          <Box
            w={{ md: "50%" }}
            h="100vh"
            overflowY="hidden"
          >
            <HomeImage />
          </Box>
        )}
      </Flex>
    </Container>
  );
};

export default LoginPage;
