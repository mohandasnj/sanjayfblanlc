import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentEbook } from "./actions/ebookActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import AboutUs from "./components/aboutus/AboutUs";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import NLCPreSubmission from "./components/auth/NLCPreSubmission";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardStudent from "./components/dashboardstudent/DashboardStudent";
import CreateEbook from "./components/create-ebook/CreateEbook";
import EditEbook from "./components/edit-ebook/EditEbook";
import AddEbookCopy from "./components/ebook-transactions/AddEbookCopy";
import IssueEbook from "./components/ebook-transactions/IssueEbook";
import CreateStudent from "./components/student/CreateStudent";
import EditStudent from "./components/student/EditStudent";
import ViewEBook from "./components/view-ebook/ViewEbook";
import InterViewEBook from "./components/view-ebook/InterViewEBook";
import InterEditStudent from "./components/student/InterEditStudent";
import WeeklyReport from "./components/reports/WeeklyReport";
import WRIssuedBooks from "./components/reports/WRIssuedBooks";
import StudentWeeklyReport from "./components/reports/StudentWeeklyReport";
import SWRIssuedBooks from "./components/reports/SWRIssuedBooks";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current ebook
    store.dispatch(clearCurrentEbook());
    // Redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/NLCPreSubmission"
                component={NLCPreSubmission}
              />
              <Route eaxct path="/aboutus" component={AboutUs} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboardStudent"
                  component={DashboardStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-ebook"
                  component={CreateEbook}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-ebook" component={EditEbook} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-ebook-copy"
                  component={AddEbookCopy}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/issue-ebook"
                  component={IssueEbook}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-student"
                  component={CreateStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/weekly-report"
                  component={WeeklyReport}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/issued-books"
                  component={WRIssuedBooks}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/student-weekly-report"
                  component={StudentWeeklyReport}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/student-issued-books"
                  component={SWRIssuedBooks}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  // path="/edit-student/:studentid"
                  path="/inter-edit-student/:studentid"
                  component={InterEditStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  // path="/edit-student/:studentid"
                  path="/edit-student"
                  component={EditStudent}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  // path="/inter-view-ebook/:bookname"
                  path="/inter-view-ebook/:bookname"
                  component={InterViewEBook}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  // path="/view-ebook/:bookname"
                  path="/view-ebook"
                  component={ViewEBook}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
