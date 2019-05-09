# FBLA Competitive Event: Coding & Programming Code Repository

> This computer program is built to manage the issuance of e-books to a class of students.

    Major functionalities includes
    The AP Statistics Book Tracker allows teachers to create an account, track and issue books to their class of students.

It also allows students to create an account, view issued books and run a report.
Five AP Statistics books have been chosen for the teacher to use.
The teacher can edit the book when they want to and then create multiple copies of that book. The teacher can then develop student accounts, and assign book copies to the students.

Additionally, the teacher can look at a weekly report of all the transactions that have occurred. This website provides a simple and easy way for teachers to give books to students & students to view their issued books.
Generate or print weekly report to show to whom books are assigned.
Used various control types including text boxes, drop down, buttons, nav bar, email, password, date picker, etc.
Appropriate validations were used where ever necessary.

Data is stored persistently using a document-oriented NoSQL database called MongoDB.

This is a full stack application using modern software/technologies:

IDE - VSCode Editor

Javascript (ES6+ Syntax), HTML5 , CSS

Postman HTTP Client

Data is stored persistently using a document-oriented NoSQL database called MongoDB - Mongoose / MongoDB / Atlas

Heroku & Git Deployment

This is a full stack application using Node, Express, Mongodb, React and Redux

## App Info

### Author

Sanjay Mohandas
[10th Grade - Lambert High School][suwanee, ga]

### Version

1.0.0

### License

This project is prepared by Sanjay Mohandas for FBLA Competitive Event: Coding & Programming

## Quick Start

Install the following software

Install nodsjs latest version https://nodejs.org/en/

Install VS Code as text Editor VS Code – IDE: https://code.visualstudio.com

Install Git https://git-scm.com/

Install Visual Studio Code: Extensions & settings
https://code.visualstudio.com/docs/editor/integrated-terminal
Extensions:
ES7 React/Redux/GraphQL/React-Native snippets

MongoDB on Cloud setup with Atlas
NoSQL DB- MongoDB Atlas: https://www.mongodb.com/cloud

Postman HTTP client: https://www.getpostman.com/

Source Control: https://github.com/

Create free Website account in Heroku and code can deployed to:
https://signup.heroku.com/login

Additional Source of information:

    Bootstrap:  https://www.w3schools.com/bootstrap/default.asp

    Udemy Course: Full Stack React, Redux & Node.js https://www.udemy.com/share/1000JOBEUbeF5VRn4=/

    React Router DOM: https://www.npmjs.com/package/react-router-dom

    Redux: https://redux.js.org/api/createstore

    Node.js: https://nodejs.org/en/

    Passport JWT: https://www.npmjs.com/package/passport-jwt

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

You will need to create a keys_dev.js in the server config folder with

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
```
