import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "reactstrap";
import { loginUser } from "../../../Store/Auth/actions";
import Text from "../../../Shared/Text/Text";
import LoginForm from "./LoginForm";
import Modal from "../../../Shared/Modal";
import Heading from "../../../Shared/Heading";
import Button from "../../../Shared/Button";
import SVG from "../../../Constants/svgConstants";
import styles from "./style.module.scss";

export default function Login(props) {
  const dispatch = useDispatch();
  const elements = useElements();
  const tenantId = useSelector((state) => state.Auth.tenantId);
  const [paymentCardModal, setPaymentCardModal] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [packagePrice, setPackagePrice] = useState("");
  const [disablePayButton, setDisablePayButton] = useState(false);
  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    password: Yup.string().required("Please enter password"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
          tenantId: tenantId,
          resetForm: formik.resetForm,
          setDisablePayButton: setDisablePayButton,
          setPaymentCardModal: setPaymentCardModal,
          setPackagePrice: setPackagePrice,
          setConfirmationPopup: setConfirmationPopup,
          setPackagePrice: setPackagePrice,
        })
      );
    },
  });

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        <Col xl="7" className={styles.authLeftSide}>
          <div className={styles.topTextLogo}>
            <span className={styles.topLogo}>{SVG.LOGIN_LOGO}</span>
            <Text>The Place You can learn Every Thing.</Text>
            <div className="text-center">
              <span className={styles.bottomImage}>
                {SVG.DARK_LOGIN}
              </span>
            </div>
          </div>
        </Col>
        <Col xl="5" className={styles.authRightSide}>
          <LoginForm formik={formik} />
        </Col>
      </Row>
    </Container>
  );
}
