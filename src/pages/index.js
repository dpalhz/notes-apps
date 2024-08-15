import {
  Grid,
  GridItem,
  useDisclosure,
  SimpleGrid,
  Flex,
  Spinner,
  Button,
  Select,
  Box,
  Text,
} from "@chakra-ui/react";
import NoteCard from "@/components/NoteCard";
import NoteDetailModal from "@/components/NoteDetailModal";
import NoteFormModal from "@/components/NoteFormModal";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
} from "../graphql/notesQueries";
import { AddIcon } from "@chakra-ui/icons";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Notes = () => {
  const { loading, error, data } = useQuery(GET_NOTES);
  const [addNote] = useMutation(ADD_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [note, setNote] = useState({
    title: "",
    body: "",
    id: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortMode, setSortMode] = useState("latest");

  const handleAddNote = async () => {
    await addNote({
      variables: { title: note.title, body: note.body },
      refetchQueries: [{ query: GET_NOTES }],
    });
    setNote({ title: "", body: "" });
    onClose();
  };

  const handleUpdateNote = async () => {
    await updateNote({
      variables: {
        id: note.id,
        title: note.title,
        body: note.body,
      },
      refetchQueries: [{ query: GET_NOTES }],
    });
    setIsEditing(false);
    setNote({ title: "", body: "" });
    onClose();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote({
      variables: { id },
      refetchQueries: [{ query: GET_NOTES }],
    });
  };

  const openEditModal = (note) => {
    setNote(note);
    setIsEditing(true);
    onOpen();
  };

  const openAddModal = () => {
    setNote({ title: "", body: "" });
    setIsEditing(false);
    onOpen();
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  const handleSortChange = (event) => {
    setSortMode(event.target.value);
  };

  if (loading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh" // Mengatur tinggi agar Flex memenuhi layar
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh" // Mengatur tinggi agar Flex memenuhi layar
        bg="red.50" // Memberikan background warna merah muda
      >
        <Text
          fontSize="lg"
          color="red.600"
          fontWeight="bold"
          textAlign="center"
          bg="red.100"
          p="10px 20px"
          borderRadius="md"
          boxShadow="lg"
        >
          Error: {error.message}
        </Text>
      </Flex>
    );
  }

  // Sort notes based on selected mode
  const sortedNotes = data.getNotes.slice().sort((a, b) => {
    if (sortMode === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" minHeight="100vh">
        <GridItem
          as="aside"
          display={{ base: "none", sm: "block" }}
          colSpan={{ base: 6, lg: 1, xl: 1 }}
          minHeight={{ lg: "100vh" }}
          p={{ base: "20px", lg: "30px" }}
          bgGradient="linear(to-b, gray.800, black)"
        >
          <Sidebar openAddModal={openAddModal} />
        </GridItem>
        <GridItem as="main" colSpan={{ base: 6, lg: 5, xl: 5 }} p="40px">
          <Navbar />
          {/* Sorting Select */}
          <Box mb="20px">
            <Select
              value={sortMode}
              onChange={handleSortChange}
              maxWidth="200px"
              mb="10px"
            >
              <option value="latest">Most Recent</option>
              <option value="oldest">Oldest</option>
            </Select>
          </Box>

          {/* Empty state handling */}
          {sortedNotes.length === 0 ? (
            <Text fontSize="xl" textAlign="center" mt="20px" color="gray.600">
              No records
            </Text>
          ) : (
            <SimpleGrid p="10px" spacing={10} minChildWidth={250}>
              {sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEditClick={() => openEditModal(note)}
                  onCardClick={() => handleCardClick(note)}
                />
              ))}
            </SimpleGrid>
          )}
        </GridItem>

        {selectedNote && (
          <NoteDetailModal
            isOpen={Boolean(selectedNote)}
            onClose={() => setSelectedNote(null)}
            note={selectedNote}
            onEdit={() => {
              openEditModal(selectedNote);
              setSelectedNote(null);
            }}
            onDelete={() => {
              handleDeleteNote(selectedNote.id);
              setSelectedNote(null);
            }}
          />
        )}

        <NoteFormModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={isEditing ? handleUpdateNote : handleAddNote}
          note={note}
          setNote={setNote}
          isEditing={isEditing}
        />

        <Button
          onClick={openAddModal}
          rounded="full"
          bg="black"
          _hover={{ bg: "gray.700" }}
          position="fixed"
          bottom="30px" // jarak dari bawah
          left="50%" // posisi horizontal tengah
          transform="translateX(-50%)" // untuk mengatur tombol tepat di tengah horizontal
          display={{ base: "block", md: "none" }} // tampilkan hanya di perangkat kecil
        >
          <AddIcon
            boxSize={{ base: 2, md: 3 }}
            color="white"
            _hover={{ color: "whiteAlpha.800" }}
          />
        </Button>
      </Grid>
      <Footer />
    </>
  );
};

export default Notes;
