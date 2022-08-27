import React from "react";
import { Form, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import Button from "../../../Shared/Button";
import Text from "../../../Shared/Text";
import InputField from "../../../Shared/InputField";
import Images from "../../../Constants/ImgConstants";
import styles from "./style.module.scss";

export default function LoginForm({ formik }) {
  return (
    <div className={styles.authRightSideInner}>
      <img
        className={`mb-5 mx-auto ${styles.RightSideLogoImg}`}
        src={Images.LOGO_IMG}
        alt={""}
      />
      <div className={styles.rightSideBody}>
        <Text className={`mb-5 ${styles.pageHeading}`}>Forgot Password?</Text>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Text className="mb-2">EMAIL</Text>
            <InputField
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formik.values && formik.values.email}
              onHandleChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helpertext={formik.errors.email}
            />
            <div className="d-flex mt-5">
              <Button
                type="submit"
                size={"sm"}
                variant="outline"
                onHandleClick={formik.handleSubmit}
              >
                Submit
              </Button>
              <Link to="/login">Sign in</Link>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}
