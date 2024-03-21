import { Box, Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Center minH="100vh" padding={5}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Oops!</Heading>
        <Text fontSize="lg">
          {isRouteErrorResponse(error) ? "This page does not exist." : "An unexpected error occurred."}
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </VStack>
    </Center>
  );
};

export default ErrorPage;
