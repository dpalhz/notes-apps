import { Flex, Text, Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      p="10px"
      bg="black"
      color="white"
      justifyContent="center"
      alignItems="center"
      position="relative"
      bottom="0"
      width="100%"
      mt="auto"
    >
      <Text fontSize={{ base: "1em", md: "1.2em" }}>
        © 2024 Noteby.id. All rights reserved.
      </Text>
    </Flex>
  );
}
