import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useAuthStore } from "../store"; 

interface Users {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth: Date;
  lastLoginAt: Date;
};

const UserTable: React.FC = () => {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/all-users", {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        setUsersData(response.data.data);
      } catch (error) {
        console.error("Error fetching waitlist data:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]); 

  const handleDownload = () => {
    const csvData = XLSX.utils.json_to_sheet(usersData);
    const csvFile = XLSX.utils.sheet_to_csv(csvData);
    const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "userdata.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box color={"#fff"} mt={"24px"} paddingX={"40px"}>
      <Flex justifyContent="flex-end" mb="4">
        <Button onClick={handleDownload} color="#16171D" bgColor={"#30D95E"} size="md" mb={"20px"}>
          Download User Data
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead color={"#30D95E"}>
            <Tr>
              <Th color={"#30D95E"}>Email</Th>
              <Th color={"#30D95E"}>First Name</Th>
              <Th color={"#30D95E"}>Last Name</Th>
              <Th color={"#30D95E"}>Phone</Th>
              <Th color={"#30D95E"}>Date of Birth</Th>
              <Th color={"#30D95E"}>Last Login Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {usersData.map((user, index) => (
              <Tr key={index}>
                <Td color={"black"}>{user.email}</Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.dateOfBirth.toLocaleDateString()}</Td>
                <Td>{user.lastLoginAt.toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
