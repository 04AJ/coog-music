## Hosted Web App Link: https://coog-music.vercel.app/

# Prerequisites
If you choose to run this project locally you will need the following installed:
- Visual Studio Code (or other IDE of choice)
- MySql Workbench
- NodeJS (version 18.3 or newer)
Note: it's very important to have the specific version of node installed for the application to work.

If you don't have these installed, you can download them from the following links:
- Visual Studio Code: https://code.visualstudio.com/download
- MySql Workbench:  https://dev.mysql.com/downloads/workbench/
- NodeJS: https://nodejs.org/en/download/

# Setting up the Database Locally
- Open MySQL Workbench and create a new database schema for the web application.
- Import the provided database schema from the SQL dump file provided with the web application.

# Configuring the Application
- Open the repository on your IDE 
- Create a new File named: .env , this file will contain the connection string of your database:
- Create another file named .env.local, this file will contain an environment variable for the application to be able to upload tracks.

# Run the application locally with the following commands
    npm install
    npm run dev

## Open http:://localhost:3000 with your browser to view the web application on your local server.
