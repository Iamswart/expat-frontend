import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  VStack,
  useBreakpointValue,
  useToast
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegister } from "../hooks/createUser";
import { useAuthStore } from "../store";

const passwordSchema = z
  .string()
  .min(8, "Password should be at least 8 characters")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (password) => /[0-9]/.test(password),
    "Password must contain at least one number"
  )
  .refine(
    (password) => /[!@#\$%\^&\*]/.test(password),
    "Password must contain at least one special character"
  );

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "User Name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{7,12}$/, "Invalid phone number format")
    .min(7, "Phone number must be at least 7 digits")
    .max(12, "Phone number must be no more than 12 digits"),
  password: passwordSchema,
});

type RegisterFormData = z.infer<typeof registerSchema>;

const CreateUserForm = () => {
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        const { accessToken, refreshToken } = response;
        const authStore = useAuthStore.getState();
        authStore.setAccessToken(accessToken);
        authStore.setRefreshToken(refreshToken);

        navigate("/welcome", { state: { email: data.email } });
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.errorMessage?.split("|")[1]?.trim() ||
          "There was an error registering the user.";
        toast({
          title: "Registration Error.",
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
      <VStack spacing={10} alignItems="flex-start">
        <Text alignSelf="flex-end">
          Do you have account?{" "}
          <Link as={ReactRouterLink} to="/login" color="#3048C1">
            Sign in
          </Link>
        </Text>
        <VStack spacing={1} alignItems="flex-start">
          <Heading size="xl">Create Account</Heading>
          <Text>
          Unlock Your New Community. Create an account and dive into a world where sports passion unites.
          </Text>
        </VStack>
      </VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack spacing={4} alignItems="flex-start" w="full">
          <FormControl isInvalid={!!errors.userName}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUserAlt} />
              </InputLeftElement>
              <Input
                id="user-name"
                placeholder="Username"
                {...register("userName")}
              />
            </InputGroup>
            <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaEnvelope} />
              </InputLeftElement>
              <Input
                id="email"
                placeholder="Email"
                {...register("email")}
                type="email"
              />
            </InputGroup>
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl isInvalid={!!errors.phone}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaPhoneAlt} />
              </InputLeftElement>
              <Input
                id="phone"
                placeholder="Phone Number"
                {...register("phone")}
                type="tel"
              />
            </InputGroup>
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaLock} />
              </InputLeftElement>
              <Input
                id="password"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
        <Button
          w="full"
          paddingY={5}
          bgColor="#3048C1"
          color="white"
          mt={8}
          type="submit"
          isLoading={registerMutation.isLoading}
          _hover={{
            bgColor:"#3048C1"
          }}
        >
          Create Account
        </Button>
      </form>
    </VStack>
  );
};

export default CreateUserForm;
