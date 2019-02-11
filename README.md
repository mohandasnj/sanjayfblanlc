#  FBLA Competitive Event: Coding & Programming Code Repository

> This computer program is built to manage the issuance of e-books to a class of students.
	Major functionalities includes 
	Allows teachers to register & login.
	Track student name and grade in school with ability to enter/view/edit.
	Track the redemption codes for each individual copy of the e-book with ability to enter/view/edit codes.
	Track the issuance of e-books for a student--a redemption code may be used only once and paired with the student.
	Generate or print weekly report to show to whom books are assigned.
	Used various control types including text boxes, drop down, buttons, nav bar, email, password, date picker, etc.
	Appropriate validations were used where ever necessary.

Data is stored persistently using a document-oriented NoSQL database called MongoDB. This is a full stack application using:
	Node
	Express
	Mongodb
	React
	Redux

## App Info

### Author

Sanjay Mohandas
[10th Grade - Lambert High School]
[Suwanee, GA]


### Version

1.0.0

### License

This project is prepared by Sanjay Mohandas for FBLA Competitive Event: Coding & Programming

## Quick Start

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


