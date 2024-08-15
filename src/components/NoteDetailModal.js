import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const NoteDetailModal = ({ isOpen, onClose, note, onEdit, onDelete }) => {
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
    onConfirmOpen();
  };

  const confirmDeleteNote = () => {
    onDelete();
    setConfirmDelete(false);
    onConfirmClose();
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    onConfirmClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">{note.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="semibold">Description</Text>
            <Text my={4}>{note.body}</Text>
            <Text fontSize="sm" color="gray.600">
              Created on: {new Date(note.createdAt).toLocaleDateString()} at{" "}
              {new Date(note.createdAt).toLocaleTimeString()}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              bg="black"
              mr={3}
              onClick={onEdit}
              _hover={{ bg: "gray.700", color: "whiteAlpha.800" }}
            >
              Edit
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this note?</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              bg="black"
              mr={3}
              _hover={{ bg: "gray.700", color: "whiteAlpha.800" }}
              onClick={cancelDelete}
            >
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDeleteNote}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteDetailModal;
