import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import "react-day-picker/lib/style.css";
import SubmissionForum from "./SubmissionForum";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import AdminConsole from "./AdminConsole";

const navTitleStyle = {
  textDecoration: "none",
  fontSize: "25px",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: "bold",
  color: "#5c5c5c"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AdminConsole />
      // <Router>
      //   <div>
      //     <div
      //       style={{
      //         fontSize: "10px",
      //         fontWeight: "bold",
      //         color: "#5c5c5c",
      //         fontFamily: "Arial, Helvetica, sans-serif",
      //         paddingBottom: "4px"
      //       }}
      //     >
      //       VEHICLE INSPECTION DATABASE
      //     </div>
      //     <nav>
      //       <div className="navBar">
      //         <div>
      //           <Link style={navTitleStyle} to={"/"} className="nav-link">
      //             HOME
      //           </Link>
      //         </div>
      //         <div>
      //           <Link
      //             style={navTitleStyle}
      //             to={"/submission"}
      //             className="nav-link"
      //           >
      //             SUBMISSION
      //           </Link>
      //         </div>
      //         <div>
      //           <Link style={navTitleStyle} to={"/about"} className="nav-link">
      //             ABOUT
      //           </Link>
      //         </div>
      //       </div>
      //     </nav>
      //     <hr />
      //     <Switch>
      //       <Route exact path="/" component={HomePage} />
      //       <Route path="/submission" component={SubmissionForum} />
      //       <Route path="/about" component={AboutPage} />
      //     </Switch>
      //   </div>
      // </Router>
    );
  }
}

export default App;
