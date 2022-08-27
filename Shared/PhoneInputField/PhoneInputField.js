import React from "react";
import PropTypes from "prop-types";
import PhoneInput, { isValidPhoneNumber } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import "./style.scss";

export default function PhoneInputField(props) {
  const { country, value, setValue, className, placeholder } = props;
  return (
    <PhoneInput
      className={className}
      placeholder={placeholder}
      country={country}
      value={value}
      onChange={setValue}
    />
  );
}
PhoneInputField.defaultProps = {
  country: "us",
  value: "",
  setValue: "",
  className: "",
  placeholder: "Enter phone number",
};
PhoneInputField.propTypes = {
  country: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
