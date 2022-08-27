import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "reactstrap";
import { resetPassword } from "../../../Store/Auth/actions";
import Text from "../../../Shared/Text/Text";
import ResetPassword from "./ResetPasswordForm";
import Icon from "../../../Constants/IconConstants";
import styles from "./style.module.scss";
import SVG from "../../../Constants/svgConstants";

export default function Login(props) {
  const dispatch = useDispatch();
  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    enableReinitialize: true,
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      await dispatch(
        resetPassword({
          email: values.email,
          resetForm: formik.resetForm,
        })
      );
    },
  });

  return (
    <Container fluid>
      <Row>
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
          <ResetPassword formik={formik} />
        </Col>
      </Row>
    </Container>
  );
}
