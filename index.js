import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definisikan typeDefs untuk schema GraphQL
const typeDefs = `#graphql
  type Note {
    id: String!
    title: String!
    body: String!
    createdAt: String!
  }

  type Query {
    getNotes: [Note]
    getNoteById(id: String!): Note
  }

  type Mutation {
    addNote(title: String!, body: String!): Note
    updateNote(id: String!, title: String, body: String): Note
    deleteNote(id: String!): String
  }
`;

// Definisikan resolvers untuk mengatur query dan mutation
const resolvers = {
  Mutation: {
    addNote: async (parent, args) => {
      const now = new Date().toISOString(); // Mendapatkan string ISO dari tanggal saat ini

      return await prisma.note.create({
        data: {
          title: args.title,
          body: args.body,
          createdAt: now, // Menggunakan string ISO
        },
      });
    },
    updateNote: async (parent, args) => {
      return await prisma.note.update({
        where: { id: args.id },
        data: {
          title: args.title,
          body: args.body,
          // Jika Anda tidak ingin mengubah createdAt, jangan sertakan dalam data
        },
      });
    },
    deleteNote: async (parent, args) => {
      await prisma.note.delete({
        where: { id: args.id },
      });
      return `Note with ID ${args.id} deleted`;
    },
  },
  Query: {
    getNotes: async () => {
      return await prisma.note.findMany();
    },
    getNoteById: async (parent, args) => {
      return await prisma.note.findUnique({
        where: { id: args.id },
      });
    },
  },
};

// Inisialisasi Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Jalankan Apollo Server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
