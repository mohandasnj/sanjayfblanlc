const express = require("express");
const router = express.Router();

const passport = require("passport");

// Load Student model
const Student = require("../../models/Student");
// Load Trackbook model
const Trackbook = require("../../models/Trackbook");
// Load user model
const User = require("../../models/User");

// Load Input validation
const validateStudentInput = require("../../validation/student");

// @route   GET api/students/test
// @desc    Tests student route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Student Works" }));

// @route   POST api/students/create
// @desc    create student
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log("Inside API");
    const { errors, isValid } = validateStudentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const studentFields = {};
    studentFields.teacherid = req.user.id;
    if (req.body.studentid) studentFields.studentid = req.body.studentid;
    if (req.body.firstname) studentFields.firstname = req.body.firstname;
    if (req.body.middleinitial)
      studentFields.middleinitial = req.body.middleinitial;
    if (req.body.lastname) studentFields.lastname = req.body.lastname;
    if (req.body.email) studentFields.email = req.body.email.toLowerCase();
    if (req.body.grade) studentFields.grade = req.body.grade;
    studentFields.date = Date.now();

    Student.findOne({
      $and: [
        { email: req.body.email.toLowerCase() }
        //{ teacherid: trackebookFields.teacherid }
      ]
    }).then(student => {
      if (
        student.studentid.toLowerCase() !== req.body.studentid.toLowerCase()
      ) {
        errors.email =
          "That student email " +
          req.body.email.toLowerCase() +
          " already exists";
        res.status(400).json(errors);
      }
    });

    Student.findOne({
      $and: [
        { studentid: req.body.studentid }
        //{ teacherid: trackebookFields.teacherid }
      ]
    }).then(student => {
      if (student) {
        errors.studentid =
          "That student ID " + req.body.studentid + " already exists";
        res.status(400).json(errors);
      } else {
        // Create
        // Check if student exists
        Student.findOne({
          $and: [
            { email: studentFields.email }
            //{ teacherid: trackebookFields.teacherid }
          ]
        }).then(student => {
          if (student) {
            errors.email = "That student already exists";
            res.status(400).json(errors);
          }

          // Save student
          new Student(studentFields).save().then(student => res.json(student));
        });
      }
    });
  }
);

// @route   POST api/students/edit
// @desc    Edit student
// @access  Private
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log("Inside API");
    const { errors, isValid } = validateStudentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const studentFields = {};
    studentFields.teacherid = req.user.id;
    if (req.body.studentid) studentFields.studentid = req.body.studentid;
    if (req.body.firstname) studentFields.firstname = req.body.firstname;
    if (req.body.middleinitial)
      studentFields.middleinitial = req.body.middleinitial;
    if (req.body.lastname) studentFields.lastname = req.body.lastname;
    if (req.body.email) studentFields.email = req.body.email.toLowerCase();
    if (req.body.grade) studentFields.grade = req.body.grade;
    studentFields.date = Date.now();
    let email_id = "";
    //console.log("1>>" + studentFields.email);
    Student.findOne({ studentid: req.body.studentid }).then(student => {
      if (student) {
        email_id = student.email;
        //console.log("2>>" + email_id);
      }
    });
    Student.findOne({ email: req.body.email.toLowerCase() }).then(student => {
      if (
        student.studentid.toLowerCase() !== req.body.studentid.toLowerCase()
      ) {
        errors.email =
          "That student email " +
          req.body.email.toLowerCase() +
          " already exists";
        studentFields.email = email_id;
        res.status(400).json(errors);
      }
    });

    Student.findOne({ studentid: req.body.studentid }).then(student => {
      if (student) {
        //Update
        //console.log("3>>" + studentFields.email);
        Student.findOneAndUpdate(
          {
            //$and: [{ email: req.body.email }, { studentid: req.body.studentid }]
            studentid: req.body.studentid
          },
          { $set: studentFields },
          { new: true }
        ).then(student => res.json(student));
      } else {
        // Send error if student doesn't exists to update
        // Student.findOne({ email: studentFields.email }).then(student => {
        //   if (student) {
        //     errors.email = "That student already exists";
        //     res.status(400).json(errors);
        //   }

        //   // Save student
        //   new Student(studentFields).save().then(student => res.json(student));
        // });
        errors.studentid = "Student ID doesn't exists to update";
        res.status(400).json(errors);
      }
    });
  }
);

// @route   POST api/students
// @desc    create or edit student
// @access  Private
router.post(
  "/:studentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log("Inside API");
    const { errors, isValid } = validateStudentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const studentFields = {};
    studentFields.teacherid = req.user.id;
    if (req.body.studentid) studentFields.studentid = req.body.studentid;
    if (req.body.firstname) studentFields.firstname = req.body.firstname;
    if (req.body.middleinitial)
      studentFields.middleinitial = req.body.middleinitial;
    if (req.body.lastname) studentFields.lastname = req.body.lastname;
    if (req.body.email) studentFields.email = req.body.email.toLowerCase();
    if (req.body.grade) studentFields.grade = req.body.grade;
    studentFields.date = Date.now();

    Student.findOne({ email: req.body.email.toLowerCase() }).then(student => {
      if (
        student.studentid.toLowerCase() !== req.body.studentid.toLowerCase()
      ) {
        errors.handle = "That student email already exists";
        res.status(400).json(errors);
      }
    });

    Student.findOne({ studentid: req.body.studentid }).then(student => {
      if (student) {
        // Update

        Student.findOneAndUpdate(
          {
            //$and: [{ email: req.body.email }, { studentid: req.body.studentid }]
            studentid: req.body.studentid
          },
          { $set: studentFields },
          { new: true }
        ).then(student => res.json(student));
      } else {
        // Create
        // Check if student exists
        Student.findOne({ email: studentFields.email }).then(student => {
          if (student) {
            errors.handle = "That student already exists";
            res.status(400).json(errors);
          }

          // Save student
          new Student(studentFields).save().then(student => res.json(student));
        });
      }
    });
  }
);

/// @route  GET api/students/all
// @desc    Get all students
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Student.find({ teacherid: req.user.id })
      .sort({ lastname: 1, firstname: 1 })
      .then(students => {
        if (!students) {
          errors.nostudents = "There are no students";
          return res.status(404).json(errors);
        }
        res.json(students);
      })
      .catch(err => res.status(404).json({ student: "There are no students" }));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get("/studentid/:studentid", (req, res) => {
  const errors = {};

  Student.find({ studentid: req.params.studentid })
    .then(student => {
      if (!student) {
        errors.nostudent = "There is no student for studentid";
        res.status(404).json(errors);
      }

      res.json(student);
    })
    .catch(err => res.status(404).json(err));
});

// @route  DELETE api/students/studentid/:id
// @desc   delete a student by id
// @access  Private
router.delete(
  "/studentid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOneAndRemove({
      _id: req.params.id
    })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
