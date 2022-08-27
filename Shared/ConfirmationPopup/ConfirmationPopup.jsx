import React from "react";
import Text from "../Text";
import Heading from "../Heading";
import Button from "../Button";
import Modal from "../Modal/Modal";

export default function ConfirmationPopup(props) {
  const {
    heading,
    discription,
    closeModal,
    handleDispatch,
    onClose,
    isOpen,
    btnDisable,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading pageHeading>{heading}</Heading>
      <Text>{discription}</Text>
      <div className="modelFutterBtn text-right mt-3">
        <Button
          size="sm"
          onHandleClick={handleDispatch}
          disabled={btnDisable}
          type="button"
        >
          Yes
        </Button>
        <Button className="cancleBtn" size="sm" onHandleClick={closeModal}>
          No
        </Button>
      </div>
    </Modal>
  );
}
