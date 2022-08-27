import React from "react";
import { Col, Row } from "reactstrap";
import { useFormik } from "formik";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Form, FormikProvider } from "formik";
import * as Yup from "yup";
import Modal from "../Modal";
import Heading from "../Heading";
import Text from "../Text";
import InputField from "../InputField";
import Button from "../Button";

export default function CreditDebitCard({
  actionPay,
  isOpen,
  onClose,
  disablePayButton,
  packagePrice,
  setDisablePayButton,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const paymentCardSchema = Yup.object().shape({
    name: Yup.string()
      .max(16, "Name should not exceed 16 characters")
      .required("Please enter name")
      .matches(/\S/, "Invalid name"),
    address: Yup.string()
      .max(16, "Address should not exceed 16 characters")
      .required("Please enter address")
      .matches(/\S/, "Invalid address"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    enableReinitialize: true,
    validationSchema: paymentCardSchema,
    onSubmit: async (values) => {
      setDisablePayButton(true);
      if (elements && stripe) {
        const cardElement = elements.getElement(CardElement);
        stripe.createToken(cardElement).then((res) => {
          if (res.token) {
            actionPay({
              name: values.name,
              address: values.address,
              token: res.token.id,
              last4: res.token.card.last4,
              brand: res.token.card.brand,
              resetForm: formik.resetForm,
            });
          }
        });
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading pageHeading>Credit/Debit Card</Heading>
      <FormikProvider value={formik}>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            {packagePrice !== undefined ? (
              <Text className="mb-4">{packagePrice}</Text>
            ) : null}
            <Col xl="12">
              <Heading className="mb-3" subHeadingSize>
                Enter name
              </Heading>
            </Col>
            <Col xl="12">
              <InputField
                className="w-100"
                type="text"
                placeholder="Please enter name"
                name="name"
                value={formik.values && formik.values.name}
                onHandleChange={formik.handleChange}
                error={Boolean(formik.touched.name && formik.errors.name)}
                helpertext={formik.errors.name}
              />
            </Col>
            <Col xl="12">
              <Heading className="mb-3" subHeadingSize>
                Enter Address
              </Heading>
            </Col>
            <Col xl="12">
              <InputField
                className="w-100"
                type="text"
                placeholder="Please enter address"
                name="address"
                value={formik.values && formik.values.address}
                onHandleChange={formik.handleChange}
                error={Boolean(formik.touched.address && formik.errors.address)}
                helpertext={formik.errors.address}
              />
            </Col>
            <Col xl="12">
              <Heading className="mb-3" subHeadingSize>
                Card Number
              </Heading>
            </Col>
            <Col xl="12">
              <div className="stripeFieldDesign mb-4">
                <CardElement
                  options={{
                    style: {
                      base: {
                        color: "grey",
                      },
                    },
                  }}
                />
              </div>
            </Col>
            <Col xl="12" className="text-right">
              <Button
                type="button"
                className="mr-2"
                onHandleClick={() => {
                  onClose();
                  formik.resetForm();
                  setDisablePayButton(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={disablePayButton}
                type="submit"
                onHandleClick={formik.handleSubmit}
              >
                Pay
              </Button>
            </Col>
          </Row>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
