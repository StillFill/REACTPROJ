/* tslint:disable ordered-imports jsx-no-lambda*/
import * as React from "react";
import { FormControl } from "react-bootstrap";
import "./Input.css";

const handleClearInput = (onChange: any) => {
  onChange({ target: { value: "" } });
};

const Input = ({ onChange, ...props }: { onChange: any; value: string }) => (
  <div className="input-wrapper">
    <i className="fa fa-search search-icon" />
    <FormControl onChange={onChange} {...props} />
    <i
      className="fa fa-times remove-button"
      onClick={() => handleClearInput(onChange)}
    />
  </div>
);

export default Input;
