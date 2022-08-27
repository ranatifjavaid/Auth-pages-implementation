import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.scss";

export default function Text(props) {
  const {
    opacity,
    children,
    className,
    extraSmallLight,
    extraSmallWhite,
    smallLight,
    smallWhite,
    smallRed,
    seaGreen,
    mediumLight,
    mediumSeaGreen,
    mediumBrown,
    onClick,
  } = props;

  const styleClass = classNames(`${className}`, {
    [styles.extraSmallLight]: extraSmallLight,
    [styles.extraSmallWhite]: extraSmallWhite,
    [styles.smallLight]: smallLight,
    [styles.smallWhite]: smallWhite,
    [styles.smallRed]: smallRed,
    [styles.mediumLight]: mediumLight,
    [styles.mediumBrown]: mediumBrown,
    [styles.seaGreen]: seaGreen,
    [styles.mediumSeaGreen]: mediumSeaGreen,
    [`opacity-${opacity}`]: opacity,
    [styles.mediumWhite]:
      !extraSmallLight &&
      !extraSmallWhite &&
      !smallLight &&
      !smallWhite &&
      !smallRed &&
      !seaGreen &&
      !mediumLight &&
      !mediumSeaGreen &&
      !mediumBrown,
  });
  return (
    <p className={styleClass} onClick={onClick}>
      {children}
    </p>
  );
}

Text.propTypes = {
  className: PropTypes.string,
  extraSmallLight: PropTypes.bool,
  extraSmallWhite: PropTypes.bool,
  smallLight: PropTypes.bool,
  smallWhite: PropTypes.bool,
  smallRed: PropTypes.bool,
  mediumLight: PropTypes.bool,
  mediumBrown: PropTypes.bool,
  seaGreen: PropTypes.bool,
  mediumSeaGreen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.oneOf(["25", "50", "75", "100"]),
  onClick: PropTypes.func,
};
Text.defaultProps = {
  children: "",
  className: "",
  extraSmallLight: false,
  extraSmallWhite: false,
  smallLight: false,
  smallWhite: false,
  smallRed: false,
  mediumLight: false,
  mediumBrown: false,
  opacity: null,
  onClick: () => {},
};
