import React, { Component } from "react";
import { Textbox } from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./styles.css";

class Name extends React.Component {
  render() {
    return (
      <div>
        <div style={{ flex: "6 6 0px", margin: "10px" }}>
          <Textbox
            attributesWrapper={{}}
            attributesInput={{
              id: "firstName",
              firstName: "firstName",
              type: "text",
              placeholder: "First Name"
            }}
            value={firstName} // Optional.[String].Default: "".
            disabled={false} // Optional.[Bool].Default: false.
            validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
            validationCallback={res =>
              this.setState({ hasNameError: res, validate: false })
            }
            onChange={(name, e) => {
              this.setState({ name });
              console.log(e);
            }} // Required.[Func].Default: () => {}. Will return the value.
            onBlur={e => {
              console.log(e);
            }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
            // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
            // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
            validationOption={{
              name: "First Name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
              check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
              required: true // Optional.[Bool].Default: true. To determin if it is a required field.
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
            value={lastName} // Optional.[String].Default: "".
            disabled={false} // Optional.[Bool].Default: false.
            validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
            validationCallback={res =>
              this.setState({ hasLastNameError: res, validate: false })
            }
            onChange={(lastName, e) => {
              this.setState({ lastName });
              console.log(e);
            }}
            validationOption={{
              name: "Last Name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
              check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
              required: true // Optional.[Bool].Default: true. To determin if it is a required field.
            }}
          />
        </div>
      </div>
    );
  }
}

export default Name;
