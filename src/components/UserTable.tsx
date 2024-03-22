import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store";

interface Users {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth: Date;
  lastLoginAt: Date;
}

const UserTable: React.FC = () => {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(3);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/all-users",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "x-api-key": "expat@2024swap",
            },
          }
        );
        const data: Users[] = response.data.map((user: Users) => ({
          ...user,
          dateOfBirth: new Date(user.dateOfBirth),
          lastLoginAt: new Date(user.lastLoginAt),
        }));
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const filteredUsers = usersData.filter((user) => {
    const dob = new Date(user.dateOfBirth).getTime();
    const start = startDate ? new Date(startDate).getTime() : -Infinity;
    const end = endDate ? new Date(endDate).getTime() : Infinity;

    return dob >= start && dob <= end;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const PageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(usersData.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <Flex justifyContent="center" mt={"20px"}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            m="1"
            bgColor={currentPage === number ? "#1A202C" : "#30D95E"}
            color={currentPage === number ? "#fff" : "#000"}
            size="sm"
          >
            {number}
          </Button>
        ))}
      </Flex>
    );
  };

  return (
    <Box color={"#fff"} mt={"24px"} paddingX={"40px"}>
      <Flex justifyContent="flex-end" mb="4">
        <Box>
          <Text mb="2" color={"black"}>Start Date:</Text>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Box>
        <Box>
          <Text mb="2" color={"black"}>End Date:</Text>
          <Input
            ml={2}
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" mb="4">
        <Box>
          <Button
            onClick={() => {
              setCurrentPage(1);
            }}
            colorScheme="teal"
            size="md"
          >
            Filter
          </Button>
        </Box>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead color={"black"}>
            <Tr>
              <Th color={"black"}>Email</Th>
              <Th color={"black"}>First Name</Th>
              <Th color={"black"}>Last Name</Th>
              <Th color={"black"}>Phone</Th>
              <Th color={"black"}>Date of Birth</Th>
              <Th color={"black"}>Last Login Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user, index) => (
              <Tr key={index}>
                <Td color={"black"}>{user.email}</Td>
                <Td color={"black"}>{user.firstname}</Td>
                <Td color={"black"}>{user.lastname}</Td>
                <Td color={"black"}>{user.phone}</Td>
                <Td color={"black"}>{user.dateOfBirth.toLocaleDateString()}</Td>
                <Td color={"black"}>{user.lastLoginAt.toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <PageNumbers />
    </Box>
  );
};

export default UserTable;
