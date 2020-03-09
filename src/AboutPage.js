import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";
import "react-day-picker/lib/style.css";
import SubmissionForum from "./SubmissionForum";
import HomePage from "./HomePage";
const textStyle = {
  fontSize: "18px",
  fontFamily: "Helvetica, sans-serif",
  fontWeight: "bold",
  color: "#5c5c5c"
};
class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={textStyle}>
        <div>
          My goal of this project is to build a non-biased dataset that can help
          the Vancouver car community know where vehicle inspections (or VI for
          short) are given. Often these inspection notices are given to vehicles
          by uneducated cops stating they do not comply with the BC Motor
          Vehicle Act. The owners of said vehicles then need to get their car
          inspected (costing from $300-$400) to prove they are innocent. My
          Ontario plated vehicle was given this inspection notice, which was a
          deciding factor to move back to Ontario where I have never been ticked
          in my 11 years of driving.
          <br /> <br />
          The information and charts derived from the submitted dataset can help
          the community learn what areas the police are targeting, as well as
          what brands of cars most often ticketed and even time of day that
          tickets are being issued. These statistics can only be as accurate as
          <br /> <br />
          Below are some information that help highlight the issues.
          <br /> <br />
        </div>
        CityNews coverage of two incidents:
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/3uj1-anjA5A"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        CTV News coverage of stock Fiat getting a VI:
        https://bc.ctvnews.ca/sports-car-enthusiasts-believe-they-re-being-unfairly-targeted-by-vancouver-police-1.4331471?fbclid=IwAR3UzcEcTgh28omI2RkswO1XP-rHo2I9VWLtfconWELtnoIhjmh7-3GHx-M
        <br /> <br />
        Facebook Post by PCA Canada West:
        <img width="560" src="http://i.imgur.com/63I5bsX.jpg"></img>
        <br /> <br />
        Link to BC Motor Vehicle Act:
        http://www.bclaws.ca/civix/document/id/complete/statreg/96318_00
        <div>
          I spent way too much time building this but I am not paid to build or
          maintain this application. The database and domain costs are fronted
          by myself. I am wishing to only help the community I care about - we
          share a common passion for cars and I hope someone out there will find
          this useful. As long as people use it I will continue to put hours
          into it to improve the UX/UI and fix bugs, as well as clean up the
          dataset when obviously false information is submitted. Thank you for
          visiting! Jeffrey
        </div>
      </div>
    );
  }
}

export default AboutPage;
