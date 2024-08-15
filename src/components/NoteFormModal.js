import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const NoteFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  note,
  setNote,
  isEditing,
}) => {
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTitleInvalid(note.title.trim() === "");
    }
  }, [note.title]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setNote({ ...note, title });
    setIsTitleInvalid(title.trim() === "");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? "Edit Note" : "Add a Note"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isTitleInvalid} isRequired mb={2}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter your note title here"
              value={note.title}
              onChange={handleTitleChange}
            />
            {isTitleInvalid && (
              <FormErrorMessage>Title is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Write the details of your note here..."
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="white"
            bg="black"
            mr={3}
            _hover={{ bg: "gray.700", color: "whiteAlpha.800" }}
            onClick={() => {
              if (note.title.trim() === "") {
                setIsTitleInvalid(true);
              } else {
                onSubmit();
              }
            }}
          >
            {isEditing ? "Update Note" : "Add Note"}
          </Button>
          <Button variant="outline" colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteFormModal;
