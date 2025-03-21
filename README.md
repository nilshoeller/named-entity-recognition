# Named Entity Recognition Project

This project is a Named Entity Recognition (NER) system developed as part of a university group project. It identifies and classifies entities in text such as people, locations, and organizations.
It includes a website with a user feed, the option for public and private posts and an admin panel.

## Getting Started

Follow the steps below to set up and run the project:

### Prerequisites

- Docker

### Running the Project

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to start the project:

   ```bash
   docker compose up --build
   ```

This command builds the Docker containers and starts the necessary services.

### Accessing the Application

Once the project is up and running, open your browser and go to:

```
http://localhost:3000
```

Here, you can test the Named Entity Recognition system by creating a local account, entering text and seeing the entities recognized.

### Accessing admin dashboard

Go to:

```
http://localhost:8000
```

and log in with these credentials

```
username: admin
password: password
```
