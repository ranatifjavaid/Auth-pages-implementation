import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.scss";

export default function Card(props) {
  const { children, className, onCardClick, cardLayout } = props;
  const styleClass = classNames(className, {
    [styles.cardLayout]: cardLayout,
  });
  return (
    <div
      className={`card ${styleClass} ${styles.cardDesign} ${className}`}
      onClick={onCardClick}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  cardLayout: PropTypes.bool,
  onCardClick: PropTypes.func,
};
Card.defaultProps = {
  className: "",
  onCardClick: () => {},
  cardLayout: false,
};
