const express = require("express");
const router = express.Router();
const passport = require("passport");
const crypto = require("crypto");

// Load Ebook model
const Ebook = require("../../models/Ebook");
// Load Trackbook model
const Trackbook = require("../../models/Trackbook");
// Load User model
const User = require("../../models/User");
// Load Student model
const Student = require("../../models/Student");

// Load Input validation
const validateTrackBookInput = require("../../validation/trackbook");
const validateTrackRedemptionCodeInput = require("../../validation/trackredemptioncode");

// @route   GET api/trackbooks/test
// @desc    Tests trackbooks route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "trackbook works" }));

// Second Page to display all redemption codes with no student assignments:
// {$and: [{bookname: "Barron's AP Statistics" },{ studentid: "" }]}

// Third page to get all students natching book name and assigned students with redemption code:
// {$and: [{bookname: "Barron's AP Statistics" },{ studentid: {$ne: ""} }]}

/// @route  GET api/trackbooks
// @desc    Get non issued books by bookname
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const trackebookFields = {};
    trackebookFields.teacherid = req.user.id;
    if (req.body.bookname) {
      trackebookFields.bookname = req.body.bookname;
    } else {
      trackebookFields.bookname = "Barron's AP Statistics";
    }
    Trackbook.find({
      $and: [
        { bookname: trackebookFields.bookname },
        { teacherid: trackebookFields.teacherid }
      ]
    })
      .then(trackebook => {
        if (!trackebook) {
          errors.trackebook = "There are no ebooks";
          return res.status(404).json(errors);
        }
        res.json(trackebook);
      })
      .catch(err =>
        res.status(404).json({ trackebook: "There are no ebooks" })
      );
  }
);

/// @route  GET api/trackbooks/unassigned
// @desc    Get non issued books by bookname
// @access  Private
router.get(
  "/unassigned",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const trackebookFields = {};
    //console.log(req.user.id);
    Ebook.findOne({
      teacherid: req.user.id
    })
      .then(ebooks => {
        if (!ebooks) {
          errors.trackebook = "There are no ebooks";
        }
        //console.log(ebooks);
        trackebookFields.bookname = ebooks.bookname;
        //console.log("ebooks.bookname:" + ebooks.bookname);

        //console.log(trackebookFields.bookname);
        trackebookFields.teacherid = req.user.id;
        // if (req.body.bookname) {
        //   trackebookFields.bookname = req.body.bookname;
        // } else {
        //   trackebookFields.bookname = "Barron's AP Statistics";
        // }
        Trackbook.find({
          $and: [
            { bookname: trackebookFields.bookname },
            { studentid: "" },
            { teacherid: trackebookFields.teacherid }
          ]
        })
          .sort({ issueddate: 1 })
          .then(trackebook => {
            if (!trackebook) {
              errors.trackebook = "There are no ebooks";
              return res.status(404).json(errors);
            }
            res.json(trackebook);
          });
        // .catch(err =>
        //   res.status(404).json({ trackebook: "There are no ebooks" })
        // )
      })
      .catch(err => (errors.trackebook = "There are no ebooks"));
  }
);

// @route  GET api/trackbooks/assinged
// @desc    Get all issued books by bookname
// @access  Private
router.get(
  "/assigned/:book_name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const trackebookFields = {};
    Ebook.findOne({
      teacherid: req.user.id,
      bookname: req.params.book_name
    })
      .then(ebooks => {
        if (!ebooks) {
          errors.trackebook = "There are no ebooks";
        }
        trackebookFields.bookname = ebooks.bookname;
        trackebookFields.teacherid = req.user.id;

        Trackbook.find({
          $and: [
            { bookname: trackebookFields.bookname },
            { studentid: { $ne: "" } },
            { teacherid: trackebookFields.teacherid }
          ]
        })
          .sort({ studentid: 1 })
          .then(trackebook => {
            if (!trackebook) {
              errors.trackebook = "There are no ebooks";
              return res.status(404).json(errors);
            }
            res.json(trackebook);
          });
      })
      .catch(err => (errors.trackebook = "There are no ebooks"));
  }
);

// @route  GET api/trackbooks/assinged
// @desc    Get all issued books by bookname
// @access  Private
router.get(
  "/assigned",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const trackebookFields = {};
    Ebook.findOne({
      teacherid: req.user.id
    })
      .then(ebooks => {
        if (!ebooks) {
          errors.trackebook = "There are no ebooks";
        }
        trackebookFields.bookname = ebooks.bookname;
        trackebookFields.teacherid = req.user.id;

        Trackbook.find({
          $and: [
            { bookname: trackebookFields.bookname },
            { studentid: { $ne: "" } },
            { teacherid: trackebookFields.teacherid }
          ]
        })
          .sort({ studentid: 1 })
          .then(trackebook => {
            if (!trackebook) {
              errors.trackebook = "There are no ebooks";
              return res.status(404).json(errors);
            }
            res.json(trackebook);
          });
      })
      .catch(err => (errors.trackebook = "There are no ebooks"));
  }
);

// @route  GET api/trackbooks/weeklyreport
// @desc    Get all issued books for last one week
// @access  Private
router.get(
  "/weeklyreport",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const trackebookFields = {};
    Ebook.findOne({
      teacherid: req.user.id
    })
      .then(ebooks => {
        if (!ebooks) {
          errors.trackebook = "There are no ebooks";
        }
        trackebookFields.bookname = ebooks.bookname;
        trackebookFields.teacherid = req.user.id;

        var today = new Date();
        var sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        //console.log(sevenDaysAgo);

        Trackbook.find({
          $and: [
            { bookname: trackebookFields.bookname },
            { studentid: { $ne: "" } },
            { teacherid: trackebookFields.teacherid },
            { issueddate: { $gte: sevenDaysAgo } }
          ]
        })
          .sort({ studentid: 1 })
          .then(trackebook => {
            if (!trackebook) {
              errors.trackebook = "There are no ebooks";
              return res.status(404).json(errors);
            }
            res.json(trackebook);
          });
      })
      .catch(err => (errors.trackebook = "There are no ebooks"));
  }
);

/// @route  POST api/trackbooks
// @desc    Assign ebook copy to a student
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate Ebook
    const { errors, isValid } = validateTrackBookInput(req.body, "");

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    // const newredemptioncode = crypto
    //   .randomBytes(16)
    //   .toString("hex")
    //   .toUpperCase();

    const trackebookFields = {};
    trackebookFields.teacherid = req.user.id;
    trackebookFields.bookname = req.body.bookname;
    if (req.body.studentid) {
      trackebookFields.studentid = req.body.studentid;
    } else {
      trackebookFields.studentid = "";
    }

    if (req.body.redemptioncode) {
      trackebookFields.redemptioncode = req.body.redemptioncode;
    } else {
      trackebookFields.redemptioncode = "";
    }
    trackebookFields.issueddate = Date.now();
    Trackbook.findOneAndRemove({
      $and: [
        { bookname: trackebookFields.bookname },
        { teacherid: req.user.id },
        { studentid: trackebookFields.studentid }
      ]
    })
      .then(
        Trackbook.findOne({
          redemptioncode: trackebookFields.redemptioncode
        }).then(trackebook => {
          if (!trackebook) {
            // Assign a ebook copy to a student
            new Trackbook(trackebookFields)
              .save()
              .then(trackebook => res.json(trackebook));
          } else {
            Trackbook.findOneAndUpdate(
              {
                $and: [
                  { bookname: trackebookFields.bookname },
                  { redemptioncode: trackebookFields.redemptioncode },
                  { teacherid: req.user.id },
                  { studentid: "" }
                ]
              },
              { $set: trackebookFields },
              { new: true }
            )
              .then(trackebook => res.json(trackebook))
              .catch(err => res.status(404).json(err));
          }
        })
        //.catch(err => res.status(404).json(err));
      )
      .catch(err => res.status(404).json(err));
  }
);

/// @route  POST api/trackbooks/addebook
// @desc    Create ebook copy without student
// @access  Private
router.post(
  "/addebook",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validate Ebook
    const { errors, isValid } = validateTrackRedemptionCodeInput(req.body, "");

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    // const newredemptioncode = crypto
    //   .randomBytes(16)
    //   .toString("hex")
    //   .toUpperCase();

    const trackebookFields = {};
    trackebookFields.teacherid = req.user.id;
    trackebookFields.bookname = req.body.bookname;
    trackebookFields.redemptioncode = req.body.redemptioncode;
    trackebookFields.studentid = "";

    trackebookFields.issueddate = Date.now();
    //console.log(newredemptioncode);
    Trackbook.findOne({ redemptioncode: trackebookFields.redemptioncode })
      .then(trackebook => {
        if (!trackebook) {
          // Create
          // Save redemptioncode
          new Trackbook(trackebookFields)
            .save()
            .then(trackebook => res.json(trackebook));
        } else {
          Trackbook.findOneAndUpdate(
            {
              $and: [
                { bookname: trackebookFields.bookname },
                { redemptioncode: trackebookFields.redemptioncode },
                { teacherid: req.user.id },
                { studentid: "" }
              ]
            },
            { $set: trackebookFields },
            { new: true }
          )
            .then(trackebook => res.json(trackebook))
            .catch(err => res.status(404).json(err));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

/// @route  POST api/trackbooks/redemptioncode/:redemptioncode
// @desc    Edit ebook copy
// @access  Private
router.post(
  "/redemptioncode/:redemptioncode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.redemptioncode);
    // Validate Ebook
    const { errors, isValid } = validateTrackRedemptionCodeInput(
      req.body,
      req.params.redemptioncode
    );

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const newredemptioncode = crypto
      .randomBytes(16)
      .toString("hex")
      .toUpperCase();

    const trackebookFields = {};
    trackebookFields.teacherid = req.user.id;
    trackebookFields.bookname = req.body.bookname;
    if (req.body.studentid) {
      trackebookFields.studentid = req.body.studentid;
    } else {
      trackebookFields.studentid = "";
    }

    trackebookFields.redemptioncode = newredemptioncode;
    trackebookFields.issueddate = Date.now();

    Trackbook.findOne({ redemptioncode: req.params.redemptioncode })
      .then(trackebook => {
        if (trackebook) {
          // Update
          Trackbook.findOneAndUpdate(
            {
              $and: [
                { bookname: req.body.bookname },
                { redemptioncode: req.params.redemptioncode },
                { teacherid: req.user.id }
              ]
            },
            { $set: trackebookFields },
            { new: true }
          )
            .then(trackebook => res.json(trackebook))
            .catch(err => res.status(404).json(err));
        } else {
          console.log("Inside");
          errors.handle = "No ebook found fo rthe Redemption Code";
          res.status(400).json(errors);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/trackbooks/redemptioncode/:id
// @desc   delete an unassigned ebook copy by id
// @access  Private
router.delete(
  "/redemptioncode/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trackbook.findOneAndRemove({
      _id: req.params.id
    })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/trackbooks/studentid/:id
// @desc   delete an issued ebook by id
// @access  Private
router.delete(
  "/studentid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Trackbook.findOneAndRemove({
      _id: req.params.id
    })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  "/bystudentid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOne({ _id: req.params.id })
      .then(student => {
        if (!student) {
          errors.nostudent = "There is no student for studentid";
          res.status(404).json(errors);
        } else {
          Trackbook.findOneAndRemove({
            studentid: student.studentid
          }).then(() => res.json({ success: true }));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
