import React from "react";
import Button from "../../../Shared/Button";
import Text from "../../../Shared/Text";
import InputField from "../../../Shared/InputField";
import styles from "./style.module.scss";
import { Form, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import Images from "../../../Constants/ImgConstants";

export default function LoginForm({ formik }) {
  return (
    <div className={styles.authRightSideInner}>
      <img
        className={`mb-5 mx-auto ${styles.RightSideLogoImg}`}
        src={Images.LOGIN_LOGO}
        alt={""}
      />
      <Text mediumLight className="text-right">
        Not a member?{" "}
        <Link to="/signup">
          <b>Sign up</b>
        </Link>
      </Text>
      <div className={styles.rightSideBody}>
        <Text className={`mb-5 ${styles.pageHeading}`}>Sign in</Text>
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
            <Text className="mb-2">PASSWORD</Text>
            <InputField
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formik.values && formik.values.password}
              onHandleChange={formik.handleChange}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helpertext={formik.errors.password}
            />
            <div className="d-flex mt-5">
              <Button
                type="submit"
                size={"sm"}
                variant="outline"
                onHandleClick={formik.handleSubmit}
              >
                Sign in
              </Button>
              <Link to="/resetPassword">Forgot Password?</Link>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}
