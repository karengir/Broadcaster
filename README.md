[![Build Status](https://travis-ci.com/karengir/Broadcaster.svg?branch=develop)](https://travis-ci.com/karengir/Broadcaster)
[![Coverage Status](https://coveralls.io/repos/github/karengir/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/karengir/Broadcaster?branch=develop)

## Broadcaster

Broadcaster is platform on which a user is able to aware a concern to the Government or report an incident.

## Homepage

https://karengir.github.io/Broadcaster/UI/html/index.html

### User Interface (UI)

- HTML
- CSS
- Javascript

### Required Features

- A user can create their own account. https://karengir.github.io/Broadcaster/UI/html/signUp.html
- A user can Log into their own account.https://karengir.github.io/Broadcaster/UI/html/LogIn.html
- A user can create a record(As a red-flag or an intervention). https://karengir.github.io/Broadcaster/UI/html/createRecord.html
- A user can see the number of their records that have been Solved, are yet to be solved and the Rejected ones. https://karengir.github.io/Broadcaster/UI/html/userProfile.html
- A user can see all the records that they have created.https://karengir.github.io/Broadcaster/UI/html/myRecords.html
- A user can be able to edit the record that they have created. https://karengir.github.io/Broadcaster/UI/html/editRecord.html
- A user can be able to delete a record they have created.https://karengir.github.io/Broadcaster/UI/html/myRecords.html
- An admin can Log into their account.
- An admin can be able to view all the records created and is can edit their statuses.

### Optional Features

- A user can be able to upload an image or a video while creating a record.https://karengir.github.io/Broadcaster/UI/html/createRecord.html

### Api Endpoints

| Routes                               | Method | Description                           |
| ------------------------------------ | ------ | ------------------------------------- |
| /api/v1/auth/signup                  | POST   | Sign up                               |
| /api/v1/auth/signin                  | POST   | Sign In                               |
| /api/v1/red-flags/                   | POST   | Create Record                         |
| /api/v1/red-flags/red-flags          | GET    | Get all records                       |
| /api/v1/red-flags/:recordId          | GET    | Get specific record                   |
| /api/v1/red-flags/:recordId          | DELETE | Delete specific record                |
| /api/v1/red-flags/:recordId/location | PATCH  | Edit the location of a recod          |
| /api/v1/red-flags/:recordId/comment  | PATCH  | Edit the comment of a specific record |

### Pivotal Tracker Stories

https://www.pivotaltracker.com/n/projects/2418036

### Backend Frameworks and other useful tools used

- Node js
- Express
- Mocha
- babel
- Travis

### Installation Guide

- To be able to use the system, clone it using: `git clone https://github.com/karengir/Broadcaster.git and cd into the directory Broadcaster`
- After Installing, download all the project dependencies using `npm i`
- After downloading all the dependencies, create a `.env` file, in which you will specify the port on which your project will be running.
- After all that, you can run the project using `npm start`
- To test the enpoint, you will need to use postman as the testing tool and using `npm test`
