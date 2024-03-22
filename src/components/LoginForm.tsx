import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoginInput, useLogin } from "../hooks/loginUser";
import { useAuthStore } from "../store";

const emailOrPhone = z.string().refine(
  (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(value)) return true;
    const phonePattern = /^[0-9]{7,12}$/;
    return phonePattern.test(value.trim());
  },
  {
    message: "Please enter a valid email address or phone number",
  }
);

export const loginSchema = z.object({
  login: emailOrPhone,
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toast = useToast();
  const navigate = useNavigate();

  const { getValues } = useForm<LoginFormData>();
  console.log(getValues());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    const isEmail = data.login.includes("@");
    const loginData: LoginInput = {
      password: data.password,
    };

    if (isEmail) {
      loginData.email = data.login;
    } else {
      loginData.phone = data.login;
    }
    console.log("Preparing to submit:", loginData);
    loginMutation.mutate(loginData, {
      onSuccess: (response) => {
        const { user, accessToken, refreshToken } = response;
        const authStore = useAuthStore.getState();
        authStore.setUser(user);
        authStore.setAccessToken(accessToken);
        authStore.setRefreshToken(refreshToken);
        navigate("/");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.errorMessage?.split("|")[1]?.trim() ||
          "Login Failed, Retry";
        toast({
          title: "Login Error.",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <Text alignSelf="flex-end">
        New to Expat Swap?{" "}
        <Link as={ReactRouterLink} to="/register" color="#3048C1">
          Sign up here
        </Link>
      </Text>
      <VStack spacing={10} alignItems="flex-start">
        <VStack spacing={1} alignItems="flex-start">
          <Heading size="xl">Log in</Heading>
          <Text>Welcome Back! Log in and continue your journey.</Text>
        </VStack>
      </VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack spacing={4} alignItems="flex-start" w="full">
          <FormControl isInvalid={!!errors.login}>
            <Input
              id="login"
              placeholder="Email or Phone"
              {...register("login")}
            />
            <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size="md">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack mt={4}>
          <Button
            w="full"
            paddingY={5}
            bgColor="#3048C1"
            color="white"
            mt={8}
            type="submit"
            isLoading={loginMutation.isLoading}
            _hover={{
              bgColor: "#3048C1",
            }}
          >
            Login
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default LoginForm;
