import React from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import styles from "./style.module.scss";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";
import Icon from "../../Constants/IconConstants";

export default function IconInputField(props) {
  const {
    placeholder,
    type,
    onHandleChange,
    value,
    name,
    className,
    error,
    disabled,
    helpertext,
    inputFormDiv,
    ref,
    accept,
    min,
    max,
  } = props;

  return (
    <div className={`${styles.inputFormDiv} ${inputFormDiv}`}>
      <Input
        id="input-with-icon-adornment"
        type={type}
        accept={accept}
        placeholder={placeholder}
        name={name}
        className={`${styles.inputDesign} ${className} iconInputField`}
        disabled={disabled}
        onChange={onHandleChange}
        autoComplete="off"
        value={value}
        ref={ref}
        min={min}
        max={max}
        // startAdornment={
        //   <InputAdornment
        //     position="start"
        //     className={`${styles.inputAdornmentDesign}`}
        //   >
        //     <span>{Icon.EYE_ICON}</span>
        //   </InputAdornment>
        // }
      />
      {error ? <Text className={styles.errorMessage}>{helpertext}</Text> : null}
    </div>
  );
}

IconInputField.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputFormDiv: PropTypes.string,
  disabled: PropTypes.bool,
  helpertext: PropTypes.string,
  error: PropTypes.bool,
  onHandleChange: PropTypes.func,
  type: PropTypes.any,
  accept: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

IconInputField.defaultProps = {
  placeholder: "",
  type: "",
  // value: "",
  name: "",
  inputFormDiv: "",
  // onHandleChange: () => { },
  className: null,
  disabled: null,
  helpertext: null,
  error: true,
};
