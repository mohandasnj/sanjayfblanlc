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

/// @route  GET api/ebooks
// @desc    Get ebook
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //console.log("Inside get");
    Ebook.find({
      teacherid: req.user.id
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
    ebookFields.teacherid = req.user.id;
    ebookFields.bookname = req.body.bookname;
    ebookFields.author = req.body.author;
    ebookFields.datepublished = req.body.datepublished;
    ebookFields.isbn13 = req.body.isbn13;

    Ebook.findOne({
      teacherid: ebookFields.teacherid
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
              teacherid: ebookFields.teacherid
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
