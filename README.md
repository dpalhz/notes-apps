# Backend for Notes Application

This repository contains the backend implementation for the Notes Application. The backend is built using Apollo Server with GraphQL and Prisma for database management, and Node.js as the runtime environment.

## Tech Stack

- **Apollo Server**: Implements GraphQL API.
- **Prisma**: ORM for database management.
- **PostgreSQL**: Database management system.
- **Node.js**: Runtime environment.
- **Docker**: Containerization for PostgreSQL.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. **Setup Database with Docker**

   The PostgreSQL database is managed using Docker. To start the PostgreSQL container, use Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This command will start the PostgreSQL container in detached mode.

3. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, install the necessary Node.js dependencies:

   ```bash
   npm install
   ```

4. **Run the Server**

   After setting up the database and installing dependencies, you can start the server:

   ```bash
   node index.js
   ```

   The server will start and listen for incoming requests. You can access the GraphQL endpoint at `http://localhost:4000` (or whichever port is configured).

## API Endpoints

- **GraphQL API**: Accessible at `http://localhost:4000`.

## Database Schema

The PostgreSQL database schema is managed using Prisma. The schema includes the following model for notes:

```prisma
model Note {
  id        String   @id @default(uuid())
  title     String
  body      String
  createdAt String
}

```

## Configuration

- **Database**: PostgreSQL database connection details are configured in the `.env` file.

  Example `.env` configuration:

  ```env
  DATABASE_URL="postgresql://username:password@localhost:5432/notesdb?schema=public"
  ```

  Replace `username`, `password`, and `notesdb`, `public` with your actual PostgreSQL credentials and database name.

## Troubleshooting

- **Database Connection Issues**: Ensure Docker is running and the PostgreSQL container is up. Check the `.env` file for correct database connection details.

- **Missing Dependencies**: If you encounter missing package errors, ensure you have run `npm install` to install all dependencies.

## Contributing

Feel free to fork the repository and submit pull requests. For any issues or feature requests, please open an issue on the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
