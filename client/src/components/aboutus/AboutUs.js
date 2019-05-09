import React, { Component } from "react";

class AboutUs extends Component {
  render() {
    return (
      //PAGE HEADER

      <section id="about">
        <header id="page-header">
          <div className="container">
            <div className="row">
              <div class="col-md-12 m-auto text-center">
                <h1>About Us</h1>
                <p>AP Statistics Book Tracker</p>
              </div>
            </div>
          </div>
        </header>
        <div className="container" />
        <div class="row">
          <div class="col-md-6 mt-4">
            <h1 className="text-center">Purpose/Description</h1>
            <p>
              The AP Statistics Book Tracker allows teachers to create an
              account, track and issue books to their class of students. It also
              allows students to create an account, view issued books and run a
              report. Five AP Statistics books have been chosen for the teacher
              to use. The teacher can edit the book when they want to and then
              create multiple copies of that book. The teacher can then develop
              student accounts, and assign book copies to the students.
              Additionally, the teacher can look at a weekly report of all the
              transactions that have occurred. This website provides a simple
              and easy way for teachers to give books to students & students to
              view their issued books.
            </p>
          </div>
          <div class="col-md-6 mt-4">
            <h1 className="text-center">Developer</h1>
            <p>
              My name is Sanjay Mohandas and I am Sophomore at Lambert High
              school, located in Suwanee, Georgia. FBLA has given me an
              opportunity to create a website that can help teachers provide
              books to students electronically. So, I decided to participate in
              it, since I love to code. My dream is to go into the Computer
              Science field, and code impactful websites, apps, etc. I would be
              glad to answer any questions or concerns regarding the website.
            </p>
            <p class="mt-4">Contact: mohandasnj@gmail.com</p>
          </div>
        </div>
      </section>
    );
  }
}

export default AboutUs;
