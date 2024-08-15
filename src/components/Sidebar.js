import {
  List,
  Text,
  ListItem,
  Button,
  Flex,
  Link,
  Box,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Sidebar({ openAddModal }) {
  return (
    <Flex
      direction={{ base: "row", sm: "column" }}
      alignItems={{ base: "center" }}
      left={{ base: "0", md: "0" }}
      top={{ base: "auto", md: "0" }}
      bottom={{ base: "auto", md: "0" }}
      width={{ base: "100%", md: "200px" }}
      gap={2}
      color="black"
      borderRight={{ base: "none", md: "1px solid gray.600" }}
      display={{ base: "flex", md: "flex" }}
      overflowX="auto"
    >
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Text
          textAlign="center"
          justifyContent="center"
          as="h4"
          fontWeight="bold"
          fontSize={{ base: "1.2em", md: "1.5em" }}
          mb={{ base: "10px", md: "0px" }}
          color="white"
        >
          Noteby.id
        </Text>
      </Link>

      <List
        fontSize={{ base: "1em", md: "1.2em" }}
        spacing={4}
        display="flex"
        flexDirection={{ base: "row", md: "column" }}
      >
        <ListItem>
          <Button
            onClick={openAddModal}
            rounded="full"
            bg="white"
            _hover={{
              bg: "gray.700",
              "& > div > svg": { color: "white" },
            }}
            size={{ base: "sm", md: "md" }}
          >
            <Box>
              <AddIcon boxSize={{ base: 2, md: 3 }} color="black" />
            </Box>
          </Button>
        </ListItem>
      </List>
    </Flex>
  );
}
