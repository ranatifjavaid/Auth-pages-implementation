import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import './style.scss';

const ModalBox = props => {
  const { children, onClose, isOpen, className, size } = props;
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      isOpen={isOpen}
      onClosed={onClose}
      className={`modalDesign ${className}`}
    >
      {children}
    </Modal>
  );
};

ModalBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
};
ModalBox.defaultProps = {
  className: '',
  size: '',
  isOpen: false,
  onClose: () => { },
};

export default React.memo(ModalBox);
