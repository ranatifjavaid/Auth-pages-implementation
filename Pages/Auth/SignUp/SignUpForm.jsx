import React, { useState, useEffect } from "react";
import { Form, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Button from "../../../Shared/Button";
import Text from "../../../Shared/Text";
import InputField from "../../../Shared/InputField";
import PhoneInputField from "../../../Shared/PhoneInputField";
import Images from "../../../Constants/ImgConstants";
import styles from "./style.module.scss";
import { style } from "@mui/system";

export default function SignUpForm({ formik, acedmyUniqueId }) {
  const [value, setValue] = useState(formik.values.phoneNo);
  useEffect(() => {
    formik.values.phoneNo = value;
  }, [value]);
  return (
    <div className={styles.authRightSideInner}>
      <img
        className={`mb-5 mx-auto ${styles.RightSideLogoImg}`}
        src={Images.LOGO_IMG}
        alt={""}
      />
      <Text mediumLight className="text-right">
        Not a member?{" "}
        <Link to="/login">
          <b>Sign In</b>
        </Link>
      </Text>
      <div className={styles.rightSideBody}>
        <Text className={`mb-5 ${styles.pageHeading}`}>Sign Up</Text>
        <FormikProvider value={formik}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl="6">
                <Text className="mb-2">FIRST NAME</Text>
                <InputField
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formik.values && formik.values.firstName}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.firstName && formik.errors.firstName
                  )}
                  helpertext={formik.errors.firstName}
                />
              </Col>
              <Col xl="6">
                <Text className="mb-2">LAST NAME</Text>
                <InputField
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={formik.values && formik.values.lastName}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.lastName && formik.errors.lastName
                  )}
                  helpertext={formik.errors.lastName}
                />
              </Col>
            </Row>
            {acedmyUniqueId === undefined ? (
              <>
                <Text className="mb-2">ORGANIZATION NAME</Text>
                <InputField
                  type="text"
                  placeholder="Enter your organization name"
                  name="organizationName"
                  value={formik.values && formik.values.organizationName}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.organizationName &&
                      formik.errors.organizationName
                  )}
                  helpertext={formik.errors.organizationName}
                />
                <Text className="mb-2">INDUSTRY</Text>
                <InputField
                  type="text"
                  placeholder="Enter your industry name"
                  name="industry"
                  value={formik.values && formik.values.industry}
                  onHandleChange={formik.handleChange}
                  error={Boolean(
                    formik.touched.industry && formik.errors.industry
                  )}
                  helpertext={formik.errors.industry}
                />
              </>
            ) : null}
            <Text className="mb-2">EMAIL</Text>
            <InputField
              type="text"
              placeholder="Enter your email"
              name="email"
              value={formik.values && formik.values.email}
              onHandleChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helpertext={formik.errors.email}
              // onBlur={getUserByEmaail}
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
            <Text className="mb-2">Phone:</Text>

            <div className="phoneInput">
              <PhoneInputField
                country={"us"}
                value={value ? value : formik.values.phoneNo}
                setValue={setValue}
              />
            </div>
            <InputField
              className="d-none"
              type="text"
              name="phoneNo"
              value={value ? value : formik.values.phoneNo}
              error={Boolean(formik.touched.phoneNo && formik.errors.phoneNo)}
              helpertext={formik.errors.phoneNo}
            />
            <div className="d-flex mt-5">
              <Button
                type="button"
                size={"sm"}
                variant="outline"
                onHandleClick={() => {
                  formik.handleSubmit();
                }}
              >
                Proceed
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}
