import { Flex, Heading, Box, Spacer, HStack } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      p="10px"
      mb="60px"
      alignItems="center"
      bg="black"
      rounded="lg"
      color="white"
    >
      <Heading
        as="h1"
        fontSize={{ base: "1.2em", sm: "1.4em", md: "1.5em", lg: "1.7em" }}
      >
        My Notes
      </Heading>
      <Spacer />

      <HStack spacing="20px">
        <Box
          bg="gray.200"
          color="black"
          p="10px 15px"
          borderRadius="10%"
          fontSize={{ base: "0.8em", sm: "1em", md: "1em", lg: "1.2em" }}
        >
          dipa.alhaza@msib.com
        </Box>
      </HStack>
    </Flex>
  );
}
