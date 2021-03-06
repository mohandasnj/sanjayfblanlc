const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");

// Load Ebook model
const Ebook = require("../../models/Ebook");
// Load User model
const User = require("../../models/User");

// Load Input validation
const validateEbookInput = require("../../validation/ebook");

// @route   GET api/ebook/test
// @desc    Tests ebook route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "eBook Works" }));

/// @route  GET api/ebooks/:book_name
// @desc    Get ebook by name
// @access  Private
router.get(
  "/:book_name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Ebook.find({
      bookname: req.params.book_name
    })
      .then(ebooks => {
        if (!ebooks) {
          errors.noebooks = "There are no ebooks";
          return res.status(404).json(errors);
        }

        res.json(ebooks);
      })
      .catch(err => res.status(404).json({ ebook: "There are no ebooks" }));
  }
);

/// @route  GET api/ebooks
// @desc    Get ebook
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({
      _id: req.user.id
    })
      .then(user => {
        if (!user) {
          errors.noebooks = "There are no ebooks";
          return res.status(404).json(errors);
        }

        Ebook.find({
          bookname: user.bookname
        })
          .then(ebooks => {
            if (!ebooks) {
              errors.noebooks = "There are no ebooks";
              return res.status(404).json(errors);
            }

            res.json(ebooks);
          })
          .catch(err => res.status(404).json({ ebook: "There are no ebooks" }));
      })
      .catch(err =>
        res.status(404).json({ user: "There are no ebooks in the user record" })
      );
  }
);

/// @route  POST api/ebooks
// @desc    Create an ebook for the teacher
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate Ebook
    const { errors, isValid } = validateEbookInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    //console.log(req.user.id);
    //console.log(req.body.bookname);
    //console.log(req.body.author);
    const ebookFields = {};
    //ebookFields.teacherid = req.user.id;
    ebookFields.bookname = req.body.bookname;
    ebookFields.author = req.body.author;
    ebookFields.datepublished = req.body.datepublished;
    ebookFields.isbn13 = req.body.isbn13;

    User.findOne({
      _id: req.user.id
    }).then(user => {
      if (!user) {
        errors.noebooks = "There are no user";
        return res.status(404).json(errors);
      }
      //console.log(userFields.bookname);
      User.findOneAndUpdate(
        {
          _id: req.user.id
          // $and: [
          //   { bookname: ebookFields.bookname },
          //   { teacherid: ebookFields.teacherid }
          // ]
        },
        { $set: { bookname: ebookFields.bookname } },
        { new: true }
      )
        .then
        //ebook => res.json(ebook)
        ();
    });
    // .catch(err =>
    //   res.status(404).json({ user: "There are no ebooks in the user record" })
    // );
    Ebook.findOne({
      bookname: req.body.bookname
      // $and: [
      //   { bookname: ebookFields.bookname },
      //   { teacherid: ebookFields.teacherid }
      // ]
    })
      .then(ebook => {
        if (!ebook) {
          // Create
          // Save redemption code
          new Ebook(ebookFields).save().then(ebook => res.json(ebook));
        } else {
          Ebook.findOneAndUpdate(
            {
              bookname: req.body.bookname
              // $and: [
              //   { bookname: ebookFields.bookname },
              //   { teacherid: ebookFields.teacherid }
              // ]
            },
            { $set: ebookFields },
            { new: true }
          ).then(ebook => res.json(ebook));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
