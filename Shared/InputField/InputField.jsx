import React, { useState } from "react";
import PropTypes from "prop-types";
import Text from "../Text";
import styles from "./style.module.scss";
import Images from "../../Constants/ImgConstants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function InputField(props) {
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
    readOnly,
    multiple
  } = props;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className={`${styles.inputFormDiv} ${inputFormDiv}`}>
      <input
        // type={passwordShown ? "password" :"text"}
        type={type === "password" && passwordShown ? "text" : type}
        accept={accept}
        placeholder={placeholder}
        name={name}
        className={`${styles.inputDesign} ${className}`}
        disabled={disabled}
        onChange={onHandleChange}
        autoComplete="off"
        value={value}
        ref={ref}
        min={min}
        max={max}
        readOnly={readOnly}
        multiple={multiple}
      />
      {error ? <Text className={styles.errorMessage}>{helpertext}</Text> : null}

      {type === "password" ? (
        !passwordShown ? (
          <VisibilityOffIcon
            onClick={togglePassword}
            className={styles.ViewICon}
          />
        ) : (
          <VisibilityIcon
            onClick={togglePassword}
            className={styles.ViewICon}
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}

InputField.propTypes = {
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
  readOnly: PropTypes.bool,
  multiple: PropTypes.bool,
};

InputField.defaultProps = {
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
  readOnly: false,
  multiple: false,
};
