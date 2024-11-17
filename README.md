# Project Name

## Overview

This project is a full-stack application with a **Next.js** frontend and a **PostgreSQL** database. It includes an easy setup process and uses Docker for database provisioning.

---

## Folder Structure

├── app/ # Holds the Next.js project
├── docker-compose.yml # Defines the PostgreSQL container
├── init.sql # SQL script to initialize the database with default credentials
├── setup.sh # Script to compile and run the entire project
├── Makefile # Makefile to execute the setup script

## Initial User Credentials

The database initializes with the following default credentials:

- **Email:** `test@gmail.com`
- **Password:** `test123`

---

## Prerequisites

Before running the project, ensure the following tools are installed on your system:

- **Docker**: For containerized database management
- **Node.js**: To run the Next.js application
- **Make**: To run the setup script

---

## Setup and Run

To set up and run the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   Run the setup script using the Makefile:
   ```

2. **Run the setup script using the Makefile**:
   ```bash
   make run
   ```

- The setup.sh script will:
  - Start the PostgreSQL database using Docker.
  - Initialize the database with the credentials defined in init.sql.
  - Compile and run the Next.js application.
- Access the Application:
  - Open your browser and navigate to http://localhost:3000.

## Notes

- The `docker-compose.yml` file spins up a PostgreSQL instance.
- The `init.sql` file automatically sets up initial database values.
- The `Makefile` simplifies execution of the setup.sh script.

## Troubleshooting

- **_Docker Issues_**: Ensure Docker is installed and running.
- **_Port Conflicts_**: Check that port 3000 (for Next.js) and port 5432 (for PostgreSQL) are not being used by other processes.
- **_Permission Errors_**: Make sure `setup.sh` has executable permissions:
  ```bash
  chmod +x setup.sh
  ```
