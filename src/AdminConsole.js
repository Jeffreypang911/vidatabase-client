import React, { Component } from "react";
import firebase from "firebase";

class AdminConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      hello: "helloworld"
    };
  }

  componentDidMount = () => {
    let ref = firebase.database().ref("users/");
    ref.once("value").then(res => {
      // Async request to Firebase
      if (res.val() !== undefined) {
        this.setState({ userData: res.val(), loading: false });
      }
    });
  };

  deleteUser = uuid => {
    let ref = firebase.database().ref("users/");
    ref.child(uuid).remove();
    this.componentDidMount();
  };

  render() {
    return (
      <div>
        {Object.keys(this.state.userData).map(userIDValue => {
          return (
            <div style={{ margin: "2%" }}>
              <div
                style={{
                  backgroundColor: "#ededed",
                  borderStyle: "solid",
                  padding: "2%",
                  paddingBottom: "0%"
                }}
              >
                <div>
                  <b>USER ID:</b> {userIDValue}
                </div>

                <div>
                  <b>FIRST NAME:</b>{" "}
                  {this.state.userData[userIDValue].firstName}
                </div>
                <div>
                  <b>LAST NAME:</b> {this.state.userData[userIDValue].lastName}
                </div>
                <div>
                  <b>CAR DESCRIPTION: </b>
                  {this.state.userData[userIDValue].carDescription}
                </div>
                <div>
                  <b>INCIDENT DESCRIPTION: </b>
                  {this.state.userData[userIDValue].incidentDescription}
                </div>
                <div>
                  <b>CAR MAKE: </b>
                  {this.state.userData[userIDValue].carMake}
                </div>
                <div>
                  <b>CAR YEAR: </b>
                  {this.state.userData[userIDValue].carYear}
                </div>
                <div>
                  <b>CREATION DATE UNIX: </b>
                  {this.state.userData[userIDValue].creationDateUnix}
                </div>

                <div>
                  <b>INFRACTION TIME: </b>
                  {this.state.userData[userIDValue].infractionTime}
                </div>
                <div>
                  <b>INSTAGRAM: </b>
                  {this.state.userData[userIDValue].instagramHandle}
                </div>
                <div>
                  <b>IS CAR MODIFIED?: </b>
                  {this.state.userData[userIDValue].isCarModified}
                </div>
                <div>
                  <b>POLICE OFFICER: </b>
                  {this.state.userData[userIDValue].policeOfficer}
                </div>
                <div>
                  <b>POLICE VEHICLE: </b>
                  {this.state.userData[userIDValue].policeVehicle}
                </div>
                <div>
                  <b>TICKET NUMBER: </b>
                  {this.state.userData[userIDValue].ticketNumber}
                </div>
                <br></br>
                <button
                  onClick={() => {
                    this.deleteUser(userIDValue);
                  }}
                  style={{ backgroundColor: "#f78f8f" }}
                >
                  DELETE
                </button>
                <br />
                <br />
                <br />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AdminConsole;
