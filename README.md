# qeemtee-traveller-app
QeemTee Fullstack exercise in Ract + Redux - Nodejs - MongoDB
This Repo uses Yarn Workspace.
There are currently two worskapces. One for Node Backend, other for React frontend.

Following are the general instructions
1. Run *yarn install* to install dependencies
2. Include *.env* file at the root to include secret keys in order for node backend to run.
   It should include following keys
# APP Settings
APP_PORT_DEV = 8080
FILE_SIZE = 15mb

# DataBase Credentials
DB_NAME_DEV = qeemtee-dev
DB_HOST_DEV = localhost
DB_PORT_DEV = 27017

3. At root, run *npm run start-backend:dev* to start node backend.

Note: React front end is incomplete.
