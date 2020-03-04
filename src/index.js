import React, { Component } from "react";
import ReactDOM from "react-dom";
// import DatePicker from "react-datepicker";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";
// import "react-datepicker/dist/react-datepicker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      ticketNumber: "",
      carYear: "",
      carMake: "",
      infractionType: "",
      policeOfficer: "",
      policeVehicle: "",
      policeAgression: "",
      measuringEquipment: "",
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
      description: "",
      currentPos: "",

      // isAgreementChecked: false,
      hasFirstNameError: true,
      hasLastNameError: true,
      hasTicketNumberError: true,
      hasCarYearError: true,
      hasCarMakeError: true,
      hasInfractionTypeError: true,
      hasPoliceOfficerError: true,
      hasPoliceVehicleError: true,
      hasPoliceAgressionError: true,
      hasMeasuringEquipmentError: true,

      // hasDescriptionError: true,
      // hasMovieError: true,
      // hasAgreementError: true,
      validate: false
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ currentPos: e.latlng });
    console.log(this.state.currentPos);
  }
  handleDayChange(day) {
    this.setState({ infractionDate: day });
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    const infractionDateString = () => {
      return this.state.infractionDate.toDateString();
    };
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
      hasMeasuringEquipmentError,
      firstName,
      lastName,
      ticketNumber,
      carYear,
      carMake,
      infractionType,
      infractionTime,
      policeOfficer,
      policeVehicle,
      measuringEquipment,
      currentPos,
      description,
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
      !hasMeasuringEquipmentError &&
      !hasinfractionTimeError
    ) {
      const violations = [
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
      ];

      const userData = {
        firstName: firstName,
        lastName: lastName,
        infractionDate: infractionDateString(),
        infractionTime: infractionTime,
        carYear: carYear,
        carMake: carMake,
        ticketNumber: ticketNumber,
        infractionType: infractionType,
        policeOfficer: policeOfficer,
        policeVehicle: policeVehicle,
        measuringEquipment: measuringEquipment,
        violations: violations,
        currentPos: currentPos,
        description: description
      };
      console.log(userData);
      alert("yayyyy");
    }
  }

  render() {
    const {
      // name,
      lastName,
      firstName,
      ticketNumber,
      infractionTime,
      carYear,
      carMake,
      infractionType,
      policeOfficer,
      policeVehicle,
      measuringEquipment,
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
      description,
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

    // let countryItem;
    // COUNTRY_OPTIONS_LIST.filter(i => {
    //   if (String(i.id) == String(country)) {
    //     countryItem = i;
    //   }
    // });

    return (
      <div
        style={{
          minHeight: "1000px",
          padding: "10px",
          border: "200px solid #e5e5e5"
        }}
      >
        <h1>VI NOTICE SUBMISSION</h1>
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
                    value={firstName} // Optional.[String].Default: "".
                    validate={validate} //is it validating? Boolen
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
                  {/* <Select
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
                      console.log(e);
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}}
                    validationOption={{
                      name: "car year", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    }}
                  /> */}
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
                      console.log(e);
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
                      console.log(e);
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
                      console.log(e);
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
                  <span style={labelContentStyle}>
                    Did the officer use measuring <br></br>equipment when giving
                    you the VI?
                  </span>
                </div>

                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    disabled={false}
                    value={measuringEquipment} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasMeasuringEquipmentError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={YES_NO_LIST}
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={measuringEquipment => {
                      this.setState({ measuringEquipment });
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
                    Please Move the Pin to Where <br></br>the Location of the VI
                    was Given:
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
                          Current location:{" "}
                          <pre>
                            {JSON.stringify(this.state.currentPos, null, 2)}
                          </pre>
                        </Popup>
                      </MyMarker>
                    )}
                  </Map>
                  {/* <Map center={[49.25, -123.1]} zoom={12}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[49.25, -123.1]}
                      draggable={true}
                      onDragend={this.updatePosition}
                    >
                      <Popup>
                        A pretty CSS3 popup.
                        <br />
                        Easily customizable.
                      </Popup>
                    </Marker>
                  </Map> */}
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
                    Description of Incident <br></br> (Optional)
                  </span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "description",
                      name: "description",
                      placeholder: "Describe What Happened",
                      maxLength: "1000",
                      cols: "10",
                      rows: "7"
                    }}
                    value={description} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    // maxLength="10" // Optional.[String | Number].Default: 524288.
                    // cols="10" // Optional.[String | Number].Default: 2.
                    // rows="10" // Optional.[String | Number].Default: 2.
                    placeholder="Place your description here ^-^" // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    onChange={(description, e) => {
                      this.setState({ description });
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      name: "Description", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: false, // Optional.[Bool].Default: true. To determin if it is a required field.
                      type: "string" // Optional.[String].Default: "string". Validation type, options are ['string', 'number'].
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // min: 2, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                      // max: 10, // Optional.[Number].Default: 0. Validation of max length when validationOption['type'] is string, max amount when validationOption['type'] is number.
                      // length: 2, // Optional.[Number].Default: 0. Validation of exact length of the value.
                      // reg: /^\d{18}|\d{15}$/, // Optional.[Bool].Default: "". Custom regex.
                      // regMsg: 'failed in reg.test(${value})', // Optional.[String].Default: "". Custom regex error message.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                      // customFunc: res => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                      //   if (res != 'banana') {
                      //     return 'Description cannot be other things but banana';
                      //   }
                      //   return true;
                      // }
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
            validate!
          </div>
          <input type="submit" style={{ display: "none" }} />
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
