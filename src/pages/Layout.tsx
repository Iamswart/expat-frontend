import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <Box minH="100vh">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
