import { Box, Image } from '@chakra-ui/react';

const HomeImage = () => {
  return (
    <Box w="full" h="full" p={10} display="flex" justifyContent="center" alignItems="center" bgColor="#EFEFFF">
      <Image src="https://res.cloudinary.com/dfscst5lw/image/upload/v1708246540/portfolio_website/bg-abstract_fcb0iq.png" alt="Descriptive Alt Text" objectFit="cover" borderRadius="md" maxW="80%" maxH="80%" />
    </Box>
  );
};

export default HomeImage;
