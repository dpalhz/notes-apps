import { Box, Text, IconButton, Flex } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const NoteCard = ({ note, onEditClick, onCardClick }) => {
  const cardColors = [
    "orange.200",
    "green.200",
    "blue.200",
    "purple.200",
    "red.200",
    "teal.200",
    "cyan.200",
    "pink.200",
    "yellow.200",
    "gray.200",
  ];

  const [cardColor, setCardColor] = useState("");

  useEffect(() => {
    const randomColor =
      cardColors[Math.floor(Math.random() * cardColors.length)];
    setCardColor(randomColor);
  }, [note.id]);

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Box
      bg={cardColor}
      p={4}
      rounded="md"
      shadow="md"
      cursor="pointer"
      onClick={onCardClick}
      position="relative"
      height="200px"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
      }}
    >
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {note.title}
      </Text>
      <Text fontSize="sm" color="gray.700" mb={2}>
        {truncateText(note.body, 30)}
      </Text>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontSize="sm"
        color="gray.600"
        position="absolute"
        bottom={2}
        left={2}
        right={2}
      >
        <Text>
          {format(new Date(note.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
        </Text>

        <IconButton
          rounded="full"
          bg="black"
          color="white"
          _hover={{ bg: "gray.700" }}
          icon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation(); // Menghentikan propagasi agar tidak memicu onCardClick
            onEditClick();
          }}
          aria-label="Edit Note"
        />
      </Flex>
    </Box>
  );
};

export default NoteCard;
