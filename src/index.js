import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";

import {
  COUNTRY_OPTIONS_LIST,
  VI_TYPE_LIST,
  POLICE_OFFICER_LIST,
  POLICE_VEHICLE_LIST,
  YES_NO_LIST,
  TICKET_TYPE_LIST
} from "./consts.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      ticketNumber: "",
      infractionType: "",
      policeOfficer: "",
      policeVehicle: "",
      policeAgression: "",
      measuringEquipment: "",
      isBrakesChecked: false,
      isCouplingDevicesChecked: false,

      // isAgreementChecked: false,
      hasFirstNameError: true,
      hasLastNameError: true,
      hasTicketNumberError: true,
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
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const {
      hasFirstNameError,
      hasLastNameError,
      hasTicketNumberError,
      hasInfractionTypeError,
      hasPoliceOfficerError,
      hasPoliceVehicleError,
      hasMeasuringEquipment,
      firstName,
      lastName,
      ticketNumber,
      infractionType,
      policeOfficer,
      policeVehicle,
      measuringEquipment,
      isBrakesChecked,
      isCouplingDevicesChecked
    } = this.state;
    if (
      !hasFirstNameError &&
      !hasLastNameError &&
      !hasTicketNumberError &&
      !hasPoliceOfficerError &&
      !hasPoliceVehicleError &&
      !hasInfractionTypeError &&
      !hasMeasuringEquipment
    ) {
      console.log("+_+_+_+_+_+_+__+_+_+_+_+_");

      console.log(
        firstName,
        lastName,
        ticketNumber,
        infractionType,
        policeOfficer,
        policeVehicle,
        measuringEquipment,
        isBrakesChecked,
        isCouplingDevicesChecked
      );
      alert("yayyyy");
    }
  }

  render() {
    const {
      // name,
      lastName,
      firstName,
      ticketNumber,
      infractionType,
      policeOfficer,
      policeVehicle,
      measuringEquipment,
      isBrakesChecked,
      isCouplingDevicesChecked,

      description,
      agreement,
      isAgreementChecked,
      country,
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
                    className="icon icon-person"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
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
                  <span style={labelContentStyle}>Peace Officer</span>
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
                  <span style={labelContentStyle}>Police Vehicle</span>
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
                    Did the officer use proper measuring equipment when giving
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
                  &nbsp;
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
                  &nbsp;
                  <span style={labelContentStyle}>country</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Select
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "country",
                      name: "country"
                    }}
                    value={country} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    showSearch={true}
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasMovieError: res, validate: false })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={COUNTRY_OPTIONS_LIST} // Required.[Array of Object(s)].Default: [].
                    classNameSelect="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    classNameOptionListContainer="" // Optional.[String].Default: "".
                    classNameOptionListItem="" // Optional.[String].Default: "".
                    customStyleSelect={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    customStyleOptionListContainer={{
                      maxHeight: "200px",
                      overflow: "auto",
                      fontSize: "14px"
                    }} // Optional.[Object].Default: {}.
                    customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                    onChange={(res, e) => {
                      this.setState({ country: res.id });
                      console.log(e);
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // selectHtml={<div>{countryItem.name}</div>} // Optional.[Html].Default: none. The custom html that will display when user choose. Use it if you think the default html is ugly.
                    // selectOptionListItemHtml={COUNTRY_OPTIONS_LIST.map(
                    //   (i, k) => {
                    //     return (
                    //       <div
                    //         key={k}
                    //         onClick={() => {
                    //           this.handleSelectChange(i.id);
                    //         }}
                    //       >
                    //         <span className="icon icon-person" />{i.name}
                    //       </div>
                    //     );
                    //   }
                    // )} // Optional.[Html].Default: none. The custom select options item html that will display in dropdown list. Use it if you think the default html is ugly.
                    validationOption={{
                      name: "Country or Region", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
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
                  &nbsp;
                  <span style={labelContentStyle}>description</span>
                </div>
                <div style={{ flex: "6 6 0px" }}>
                  <Textarea
                    attributesWrapper={{}}
                    attributesInput={{
                      id: "description",
                      name: "description",
                      placeholder: "Place your description here ^-^"
                      // maxLength: '10',
                      // cols: '10',
                      // rows: '10',
                    }}
                    value={description} // Optional.[String].Default: "".
                    disabled={false} // Optional.[Bool].Default: false.
                    // maxLength="10" // Optional.[String | Number].Default: 524288.
                    // cols="10" // Optional.[String | Number].Default: 2.
                    // rows="10" // Optional.[String | Number].Default: 2.
                    placeholder="Place your description here ^-^" // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({
                        hasDescriptionError: res,
                        validate: false
                      })
                    } // Optional.[Func].Default: none. Return the validation result.
                    classNameInput="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    customStyleInput={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{}} // Optional.[Object].Default: {}.
                    onChange={(description, e) => {
                      this.setState({ description });
                      console.log(e);
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {
                      console.log(e);
                    }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      name: "Description", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
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
