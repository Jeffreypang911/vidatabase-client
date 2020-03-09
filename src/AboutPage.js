import React, { Component } from "react";
import CTVNewsImage from "./assets/CTVnews";
import CityNewsImage from "./assets/CityNews";
import PCAFacebookImage from "./assets/PCAfacebook";
import styled from "styled-components";

const mainContainer = {
  fontSize: "14px",
  fontFamily: "arial, sans-serif",
  fontWeight: "",
  color: "#5c5c5c",
  backgroundColor: "white",
  padding: "4%"
};

const boarderContainer = {
  padding: "4%",
  backgroundColor: "#ededed"
};
const textDiv = {
  // backgroundColor: "green",
  // paddingTop: "2%",
  paddingBottom: "2%"
};
const imageCard = {
  textAlign: "center",
  // margin: "2%",
  width: "100%"
  // backgroundColor: "pink"
};
const imageBoarer = {
  padding: "5%"
};
const image = {
  maxWidth: "100%",
  maxHeight: "100%"
};

const linkContainer = {
  paddingTop: "2%",
  paddingBottom: "2%"

  // backgroundColor: "#ededed"
};

// const imageContainer = {
//   display: "flex",
//   flexDirection: "row",
//   backgroundColor: "#ededed"
// };

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ededed;
  @media (max-width: 515px) {
    flex-direction: column;
  }
`;

const description = {
  fontWeight: "bold",
  marginBottom: "5%"
  // backgroundColor: "grey"
};

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={boarderContainer}>
        <div style={mainContainer}>
          <div style={textDiv}>
            My goal of this project is to build a non-biased dataset that can
            educate the Vancouver car community of where vehicle inspections are
            given and other ticket related statistics. Often these inspection
            notices are given to vehicles by police stating they do not comply
            with the BC Motor Vehicle Act. The owners of said vehicles then need
            to get their car inspected (costing from $300-$400) to prove they
            are innocent. My vehicle was given this inspection notice in late
            2019.
            <br /> <br />
            The information and charts derived from the submitted dataset can
            hopefully help the community learn what areas the police are
            targeting, as well as what brands of cars most often ticketed and
            even time of day that tickets are being issued. These statistics can
            only be as accurate as the data that is submitted.
            <br /> <br />
            Below are some links that help highlight the issues:
          </div>
          <ImageContainer>
            <div style={imageCard}>
              <a
                href="https://bc.ctvnews.ca/sports-car-enthusiasts-believe-they-re-being-unfairly-targeted-by-vancouver-police-1.4331471?fbclid=IwAR3UzcEcTgh28omI2RkswO1XP-rHo2I9VWLtfconWELtnoIhjmh7-3GHx-M"
                target="_blank"
              >
                <div style={imageBoarer}>
                  <img style={image} src={CTVNewsImage}></img>
                </div>
              </a>
              <div style={description}>CTV News Coverage</div>
            </div>
            <div style={imageCard}>
              <a
                href="https://www.citynews1130.com/2020/03/05/sports-car-drivers-believe-targeted-vancouver/"
                target="_blank"
              >
                <div style={imageBoarer}>
                  <img style={image} src={CityNewsImage}></img>
                </div>
              </a>
              <div style={description}>CityNews Coverage</div>
            </div>
            <div style={imageCard}>
              <a
                href="https://www.facebook.com/pcacanadawest/posts/3236815123012907"
                target="_blank"
              >
                <div style={imageBoarer}>
                  <img style={image} src={PCAFacebookImage}></img>
                </div>
              </a>
              <div style={description}>PCA Facebook Post</div>
            </div>
          </ImageContainer>
          <div style={linkContainer}>
            Other Useful Links:
            <br />
            <a
              href="http://www.bclaws.ca/civix/document/id/complete/statreg/96318_00"
              target="_blank"
            >
              BC Motor Vehicle Act
            </a>
            <br />
            <a
              href="https://vancouver.ca/police/assets/pdf/2020-business-plan.pdf?fbclid=IwAR0FwQ5C4pQ8IdRgmHTNQTwYIOwat8tq2Qv8bWaqDembnP54XgUEA64dcLw"
              target="_blank"
            >
              VPD 2020 Stratigic Business Plan
            </a>
            <br />
            <a
              href="https://www.unece.org/fileadmin/DAM/trans/doc/2007/wp29grb/ECE-TRANS-WP29-GRB-45-inf01e.pdf?fbclid=IwAR1WvKtXZFFNNAOWm06XmXTqvvqmuZabUJhG0_PrreUaV_iLZvflYrlEJZ8"
              target="_blank"
            >
              ISO5130 Vehicle Acoustics
            </a>
          </div>

          <div style={textDiv}>
            I spent a lot of time building this. The database/domain costs are
            fronted by myself. I am wishing to only help the community I care
            about - we share a common passion for cars and I hope someone out
            there will find this useful. As long as people use it I will
            continue to put hours into it to improve the UX/UI and fix bugs, as
            well as clean up the dataset when obviously false information is
            submitted. <br />
            <br />
            Thank you for visiting! <br />
            <br />
            Jeffrey P
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;

// CityNews coverage of two incidents:
// <iframe
//   width="560"
//   height="315"
//   src="https://www.youtube.com/embed/3uj1-anjA5A"
//   frameborder="0"
//   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//   allowfullscreen
// ></iframe>
// CTV News coverage of stock Fiat getting a VI:
// https://bc.ctvnews.ca/sports-car-enthusiasts-believe-they-re-being-unfairly-targeted-by-vancouver-police-1.4331471?fbclid=IwAR3UzcEcTgh28omI2RkswO1XP-rHo2I9VWLtfconWELtnoIhjmh7-3GHx-M
// <br /> <br />
// Facebook Post by PCA Canada West:
// <img width="560" src="http://i.imgur.com/63I5bsX.jpg"></img>
// <br /> <br />
// Link to BC Motor Vehicle Act:
// http://www.bclaws.ca/civix/document/id/complete/statreg/96318_00
