import React, { Component } from "react";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import firebase from "firebase";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import L from "leaflet";

import {
  VI_TYPE_LIST,
  POLICE_OFFICER_LIST,
  POLICE_VEHICLE_LIST,
  YES_NO_LIST,
  CAR_MAKE,
  YEAR,
  TIME
} from "./consts.js";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const MyMarker = props => {
  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup();
    }
  };
  return <Marker ref={initMarker} {...props} />;
};

class SubmissionForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,

      firstName: "",
      lastName: "",
      ticketNumber: "",
      carYear: "",
      carMake: "",
      carDescription: "",
      infractionType: "",
      policeOfficer: "",
      policeVehicle: "",
      isCarModified: "",
      isBrakesChecked: false,
      isCouplingDevicesChecked: false,
      isExhaustChecked: false,
      isFuelSystemChecked: false,
      isLightsChecked: false,
      isLoadSecurityChecked: false,
      isSuspensionChecked: false,
      isTiresChecked: false,
      isWheelsRimsChecked: false,
      isWipersChecked: false,
      isOtherChecked: false,
      infractionDate: undefined,
      infractionTime: undefined,
      incidentDescription: "",
      currentPos: "",
      instagramHandle: "",
      hasFirstNameError: true,
      hasLastNameError: true,
      hasTicketNumberError: true,
      hasCarYearError: true,
      hasCarMakeError: true,
      hasInfractionTypeError: true,
      hasPoliceOfficerError: true,
      hasPoliceVehicleError: true,
      hasisCarModifiedError: true,
      hasMeasuringEquipmentError: true,
      validate: false
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
  }
  handleDayChange(day) {
    this.setState({ infractionDate: day });
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    var userRef = firebase.database().ref("users");
    e.preventDefault();
    this.toggleValidating(true);
    const {
      hasFirstNameError,
      hasLastNameError,
      hasTicketNumberError,
      hasinfractionTimeError,
      hasCarYearError,
      hasCarMakeError,
      hasInfractionTypeError,
      hasPoliceOfficerError,
      hasPoliceVehicleError,
      hasisCarModifiedError,
      firstName,
      lastName,
      ticketNumber,
      carYear,
      carMake,
      carDescription,
      infractionDate,
      infractionType,
      infractionTime,
      policeOfficer,
      policeVehicle,
      isCarModified,
      currentPos,
      incidentDescription,
      instagramHandle,
      isBrakesChecked,
      isCouplingDevicesChecked,
      isExhaustChecked,
      isFuelSystemChecked,
      isLightsChecked,
      isLoadSecurityChecked,
      isSuspensionChecked,
      isTiresChecked,
      isWheelsRimsChecked,
      isWipersChecked,
      isOtherChecked
    } = this.state;
    if (
      !hasFirstNameError &&
      !hasLastNameError &&
      !hasTicketNumberError &&
      !hasCarYearError &&
      !hasCarMakeError &&
      !hasPoliceOfficerError &&
      !hasPoliceVehicleError &&
      !hasInfractionTypeError &&
      !hasinfractionTimeError &&
      !hasisCarModifiedError
    ) {
      const violations = {
        isBrakesChecked: isBrakesChecked,
        isCouplingDevicesChecked: isCouplingDevicesChecked,
        isExhaustChecked: isExhaustChecked,
        isFuelSystemChecked: isFuelSystemChecked,
        isLightsChecked: isLightsChecked,
        isLoadSecurityChecked: isLoadSecurityChecked,
        isSuspensionChecked: isSuspensionChecked,
        isTiresChecked: isTiresChecked,
        isWheelsRimsChecked: isWheelsRimsChecked,
        isWipersChecked: isWipersChecked,
        isOtherChecked: isOtherChecked
      };
      const instagramText = instagramHandle.replace("@", "");
      const userData = {
        creationDateUnix: new Date().getTime() / 1000,
        firstName: firstName,
        lastName: lastName,
        infractionDate: infractionDate,
        infractionTime: infractionTime,
        carYear: carYear,
        carMake: carMake,
        carDescription: carDescription,
        ticketNumber: ticketNumber,
        infractionType: infractionType,
        policeOfficer: policeOfficer,
        policeVehicle: policeVehicle,
        isCarModified: isCarModified,
        violations: violations,
        currentPos: currentPos,
        incidentDescription: incidentDescription,
        instagramHandle: instagramText
      };
      function writeUserData(userData) {
        var newUserRef = userRef.push();
        newUserRef.set(userData);
      }
      console.log(userData);
      alert(userData);
      writeUserData(userData);
    }
  }

  render() {
    const {
      lastName,
      firstName,
      ticketNumber,
      infractionTime,
      carYear,
      carMake,
      instagramHandle,
      carDescription,
      infractionType,
      policeOfficer,
      policeVehicle,
      isCarModified,
      isBrakesChecked,
      isCouplingDevicesChecked,
      isExhaustChecked,
      isFuelSystemChecked,
      isLightsChecked,
      isLoadSecurityChecked,
      isSuspensionChecked,
      isTiresChecked,
      isWheelsRimsChecked,
      isWipersChecked,
      isOtherChecked,
      incidentDescription,
      validate
    } = this.state;
    const rowStyle = {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: "2%",
      fontSize: "14px"
    };
    const rowWrapperStyle = {
      display: "table",
      width: "100%"
    };
    const rowContainerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      borderBottom: "1px solid #e5e5e5"
    };
    const labelStyle = {
      display: "inline-block"
    };
    const labelContentStyle = {
      verticalAlign: "middle"
    };

    const titleStyle = {
      // alignItems: "center",
      // justifyContent: "space-between",
      // padding: "2%",
      textDecoration: "none",
      fontSize: "25px",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontWeight: "bold",
      color: "#5c5c5c"
    };

    return (
      <div
        style={{
          minHeight: "1000px",
          padding: "10px",
          border: "200px solid #e5e5e5",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        {" "}
        <div style={{ textAlign: "center" }}>
          <h1 style={titleStyle}>VI NOTICE SUBMISSION</h1>
        </div>
        <div
          style={{
            paddingLeft: "20%",
            paddingRight: "20%",
            textAlign: "center"
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "grey",
              marginBottom: "50px"
            }}
          >
            Submit your VI information to be a part of the dataset. Use your
            ticket to fill out as much as you can. Your information will be
            analysed and added to the database to create statistics on the home
            page that everyone can use.
          </div>
        </div>
        <form onSubmit={this.validateForm}>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Name</span>
                </div>
                <div style={{ flex: "6 6 0px", margin: "10px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "firstName",
                      firstName: "firstName",
                      type: "text",
                      placeholder: "First Name"
                    }}
                    onBlur={() => {}}
                    value={firstName}
                    validate={validate}
                    validationCallback={res =>
                      this.setState({ hasFirstNameError: res, validate: false })
                    }
                    onChange={(firstName, e) => {
                      this.setState({ firstName });
                    }}
                    validationOption={{
                      name: "First name", // To display in the Error message. i.e Please enter your ${name}.
                      check: true, // To determin if you need to validate.
                      required: true // To determin if it is a required field.
                    }}
                  />
                </div>
                <div style={{ flex: "6 6 0px", margin: "10px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "lastName",
                      lastName: "lastName",
                      type: "text",
                      placeholder: "Last Name"
                    }}
                    onBlur={() => {}}
                    value={lastName} // Optional.[String].Default: "".
                    validate={validate} //is it validating? Boolen
                    validationCallback={res =>
                      this.setState({ hasLastNameError: res, validate: false })
                    }
                    onChange={(lastName, e) => {
                      this.setState({ lastName });
                    }}
                    validationOption={{
                      name: "Last name", // To display in the Error message. i.e Please enter your ${name}.
                      check: true, // To determin if you need to validate.
                      required: true // To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-bookmark"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />

                  <span style={labelContentStyle}>
                    Date and Time <br></br>of Infraction
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <div>
                    <DayPickerInput
                      onDayChange={this.handleDayChange}
                      dayPickerProps={{
                        month: new Date(2020, 2),
                        showWeekNumbers: true,
                        todayButton: "Today"
                      }}
                      style={{ padding: "10px" }}
                    />
                  </div>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesInput={{
                      id: "infractionTime",
                      name: "infractionTime"
                    }}
                    value={infractionTime} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    showSearch={true}
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasinfractionTimeError: res,
                        validate: false
                      })
                    }
                    optionList={TIME}
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }}
                    customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                    onChange={(res, e) => {
                      this.setState({ infractionTime: res.id });
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}}
                    validationOption={{
                      name: "time of infraction", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-bookmark"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>
                    Year and Make <br></br>of Vehicle
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesInput={{
                      id: "carYear",
                      name: "carYear"
                    }}
                    value={carYear} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    showSearch={true}
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasCarYearError: res, validate: false })
                    }
                    optionList={YEAR}
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }}
                    customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                    onChange={(res, e) => {
                      this.setState({ carYear: res.id });
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}}
                    validationOption={{
                      name: "car year", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesInput={{
                      id: "carMake",
                      name: "carMake"
                    }}
                    value={carMake} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    showSearch={true}
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasCarMakeError: res, validate: false })
                    }
                    optionList={CAR_MAKE}
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }}
                    customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                    onChange={(res, e) => {
                      this.setState({ carMake: res.id });
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}}
                    validationOption={{
                      name: "car make", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-insert-drive-file"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>
                    Description of Car Model, <br></br>Modifications, Ect.{" "}
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "carDescription",
                      name: "carDescription",
                      placeholder: "Describe Your Car, Mods, Etc.",
                      maxLength: "1000",
                      cols: "10",
                      rows: "3"
                    }}
                    value={carDescription}
                    disabled={false}
                    validate={validate}
                    onChange={(carDescription, e) => {
                      this.setState({ carDescription });
                    }}
                    onBlur={e => {}}
                    validationOption={{
                      name: "Description",
                      check: true,
                      required: true,
                      type: "string"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />

                  <span style={labelContentStyle}>Ticket Number</span>
                </div>

                <div style={{ flex: "6 6 0px", margin: "10px" }}>
                  <Textbox
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "ticketNumber",
                      ticketNumber: "ticketNumber",
                      type: "text",
                      placeholder: "Ticket Number"
                    }}
                    onBlur={() => {}}
                    value={ticketNumber} // Optional.[String].Default: "".
                    validate={validate} //is it validating? Boolen
                    validationCallback={res =>
                      this.setState({
                        hasTicketNumberError: res,
                        validate: false
                      })
                    }
                    onChange={(ticketNumber, e) => {
                      this.setState({ ticketNumber });
                    }}
                    validationOption={{
                      name: "Ticket number", // To display in the Error message. i.e Please enter your ${name}.
                      check: true, // To determin if you need to validate.
                      required: true // To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span style={labelContentStyle}>Infraction Type</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    disabled={false}
                    value={infractionType} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasInfractionTypeError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={VI_TYPE_LIST}
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={(infractionType, e) => {
                      this.setState({ infractionType });
                    }}
                    validationOption={{
                      name: "infraction type", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span style={labelContentStyle}>Police Officer</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    disabled={false}
                    value={policeOfficer} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasPoliceOfficerError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={POLICE_OFFICER_LIST}
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={(policeOfficer, e) => {
                      this.setState({ policeOfficer });
                    }}
                    validationOption={{
                      name: "police officer", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span style={labelContentStyle}>Police Vehicle Type</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    disabled={false}
                    value={policeVehicle} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasPoliceVehicleError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={POLICE_VEHICLE_LIST}
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={(policeVehicle, e) => {
                      this.setState({ policeVehicle });
                    }}
                    validationOption={{
                      name: "police vehicle", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span style={labelContentStyle}>Is Your Car Modified?</span>
                </div>

                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    disabled={false}
                    value={isCarModified} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasisCarModifiedError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={YES_NO_LIST}
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={isCarModified => {
                      this.setState({ isCarModified });
                    }}
                    validationOption={{
                      name: "answer", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-assignment-late"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>Defect/Violation</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Checkbox
                    checked={isBrakesChecked}
                    onBlur={() => {}}
                    onChange={(isBrakesChecked, e) => {
                      this.setState({ isBrakesChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Brakes
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isCouplingDevicesChecked}
                    onBlur={() => {}}
                    onChange={(isCouplingDevicesChecked, e) => {
                      this.setState({ isCouplingDevicesChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Coupling Devices
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isExhaustChecked}
                    onBlur={() => {}}
                    onChange={(isExhaustChecked, e) => {
                      this.setState({ isExhaustChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Exhaust
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isFuelSystemChecked}
                    onBlur={() => {}}
                    onChange={(isFuelSystemChecked, e) => {
                      this.setState({ isFuelSystemChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Fuel System
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isLightsChecked}
                    onBlur={() => {}}
                    onChange={(isLightsChecked, e) => {
                      this.setState({ isLightsChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Lights
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isLoadSecurityChecked}
                    onBlur={() => {}}
                    onChange={(isLoadSecurityChecked, e) => {
                      this.setState({ isLoadSecurityChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Load Security
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isSuspensionChecked}
                    onBlur={() => {}}
                    onChange={(isSuspensionChecked, e) => {
                      this.setState({ isSuspensionChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Suspension
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isTiresChecked}
                    onBlur={() => {}}
                    onChange={(isTiresChecked, e) => {
                      this.setState({ isTiresChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Tires
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isWheelsRimsChecked}
                    onBlur={() => {}}
                    onChange={(isWheelsRimsChecked, e) => {
                      this.setState({ isWheelsRimsChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Wheels/Rims
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isWipersChecked}
                    onBlur={() => {}}
                    onChange={(isWipersChecked, e) => {
                      this.setState({ isWipersChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Wipers
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  <Checkbox
                    checked={isOtherChecked}
                    onBlur={() => {}}
                    onChange={(isOtherChecked, e) => {
                      this.setState({ isOtherChecked });
                    }}
                    labelHtml={
                      <div style={{ color: "#4a4a4a", marginTop: "2px" }}>
                        Other
                      </div>
                    }
                    validationOption={{
                      check: false,
                      required: false
                    }}
                  />
                  '
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-assignment-late"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>
                    Pin where the VI was given:
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <link
                    rel="stylesheet"
                    href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"
                  />
                  <Map
                    center={[49.25, -123.1]}
                    zoom={12}
                    onClick={this.handleClick}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.currentPos && (
                      <MyMarker position={this.state.currentPos}>
                        <Popup position={this.state.currentPos}>
                          <b>My VI Location:</b>
                          <br></br>
                          Latatude:{" "}
                          {JSON.stringify(this.state.currentPos.lat, null, 2)},
                          <br></br>
                          Longitude:{" "}
                          {JSON.stringify(this.state.currentPos.lng, null, 2)}
                        </Popup>
                      </MyMarker>
                    )}
                  </Map>
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-insert-drive-file"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>Description of Incident</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "incidentDescription",
                      name: "incidentDescription",
                      placeholder: "Describe What Happened",
                      maxLength: "1000",
                      cols: "10",
                      rows: "7"
                    }}
                    value={incidentDescription}
                    disabled={false}
                    validate={validate}
                    onChange={(incidentDescription, e) => {
                      this.setState({ incidentDescription });
                    }}
                    onBlur={e => {}}
                    validationOption={{
                      name: "Description",
                      check: true,
                      required: true,
                      type: "string"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  <span
                    className="icon icon-insert-drive-file"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  <span style={labelContentStyle}>
                    Instagram Handle <br></br> (Optional)
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "instagramHandle",
                      name: "instagramHandle",
                      placeholder: "@CarGuy_420",
                      maxLength: "1000",
                      cols: "10",
                      rows: "1"
                    }}
                    value={instagramHandle}
                    disabled={false}
                    validate={validate}
                    onChange={(instagramHandle, e) => {
                      this.setState({ instagramHandle });
                    }}
                    onBlur={e => {}}
                    validationOption={{
                      name: "Instagram",
                      check: true,
                      required: false,
                      type: "string"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "10px" }} />
          <div
            className={`my-button my-button__red save-button`}
            onClick={this.validateForm}
          >
            SUBMIT
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}

export default SubmissionForum;
