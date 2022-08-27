import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import { isValidPhoneNumber } from "react-phone-number-input";
import { registerUser } from "../../../Store/Auth/actions";
import { signUpPackagePlan } from "../../../Store/TenatPricingPlan/actions";
import Text from "../../../Shared/Text/Text";
import SignUpForm from "./SignUpForm";
import PricingCards from "../../../Shared/PricingCards/PricingCards";
import Button from "../../../Shared/Button";
import { useParams } from "react-router-dom";
import SVG from "../../../Constants/svgConstants";
import styles from "./style.module.scss";
import CreditDebitCard from "../../../Shared/CreditDebitCard/CreditDebitCard";

export default function SignUp(props) {
  const dispatch = useDispatch();
  const acedmyUniqueId = useParams().id;
  const [pricingPlans, setPricingPlans] = useState(0);
  const [pricingCardValue, setPricingCardValue] = useState();
  const [stripeCard, setStripeCard] = useState(false);
  const [planData, setPlanData] = useState(false);
  const [disableProceedButton, setDisableProceedButton] = useState(false);
  const [disablePayButton, setDisablePayButton] = useState(false);
  const tenatPricingPlan = useSelector(
    (state) => state.TenatPricingPlanReducers.tenantPlan
  );
  useEffect(() => {
    dispatch(signUpPackagePlan({ acedmyUniqueId: acedmyUniqueId }));
  }, []);
  const loginUserSchema = Yup.object().shape({
    isOrganization: Yup.boolean().default(
      acedmyUniqueId === undefined ? true : false
    ),
    isIndustry: Yup.boolean().default(
      acedmyUniqueId === undefined ? true : false
    ),
    firstName: Yup.string()
      .max(16, "First name should not exceed 16 characters")
      .required("Please enter first name")
      .matches(/\S/, "Invalid first name"),
    lastName: Yup.string()
      .max(16, "Last name should not exceed 16 characters")
      .required("Please enter last name")
      .matches(/\S/, "Invalid last name"),
    organizationName: Yup.mixed().when(["isOrganization"], {
      is: false,
      then: Yup.mixed(),
      otherwise: Yup.string()
        .max(25, "Organization name must be less than 25 characters")
        .required("Please enter organization name")
        .matches(/\S/, "Invalid organization"),
    }),
    industry: Yup.mixed().when(["isIndustry"], {
      is: false,
      then: Yup.mixed(),
      otherwise: Yup.string()
        .max(25, "Industry name must be less than 25 characters")
        .required("Please enter industry name")
        .matches(/\S/, "Invalid industry"),
    }),
    email: Yup.string()
      .email("Please enter valid email address")
      .required("Please enter email address")
      .matches(/\S/, "Invalid email"),
    password: Yup.string()
      .required("Please enter password")
      .matches(
        /^(?=(?:.*[A-Z].*){1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters,  One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    phoneNo: Yup.number()
      .nullable()
      .required("Please enter phone number")
      .min(1000000000, "Phone must be more than 10 digits"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      organizationName: "",
      industry: "",
      email: "",
      password: "",
      phoneNo: "",
    },
    enableReinitialize: true,
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      // if (values.phone && isValidPhoneNumber(values.phone)) {
      setPricingPlans(1);
      // } else {
      //   toast.error("Please enter valid number");
      // }
    },
  });
  const signUpFunc = () => {
    setDisableProceedButton(true);
    if (pricingCardValue == undefined) {
      toast.error("Please select plan");
    } else {
      if (planData.name === "Free") {
        setDisableProceedButton(true);
        dispatch(
          registerUser({
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            organizationName: formik.values.organizationName,
            industry: formik.values.industry,
            email: formik.values.email,
            password: formik.values.password,
            phoneNo: formik.values.phoneNo,
            childPlanId: pricingCardValue,
            companyId: tenatPricingPlan.companyId,
            setStripeCard: setStripeCard,
            resetForm: formik.resetForm,
            setDisableButton: (value) => setDisableProceedButton(value),
          })
        );
      } else {
        setStripeCard(true);
      }
    }
  };
  console.log("formik", formik);
  return (
    <Container fluid>
      {pricingPlans === 0 ? (
        <Row style={{ minHeight: "100vh" }}>
          <Col xl="7" className={styles.authLeftSide}>
            <div className={styles.topTextLogo}>
              <span className={styles.topLogo}>{SVG.LOGIN_LOGO}</span>
              <Text>The Place You can learn Every Thing.</Text>
              <div className="text-center">
                <span className={styles.bottomImage}>
                  {localStorage.getItem("dark") === "true" ||
                  localStorage.getItem("dark") === null
                    ? SVG.LIGHT_LOGIN
                    : SVG.DARK_LOGIN}
                </span>
              </div>
            </div>
          </Col>
          <Col xl="5" className={styles.authRightSide}>
            <SignUpForm formik={formik} acedmyUniqueId={acedmyUniqueId} />
          </Col>
        </Row>
      ) : (
        <Row
          className={`justify-content-center ${styles.pricingCardBackground}`}
          style={{ minHeight: "100vh" }}
        >
          <Col xl="10">
            <div className={`${styles.signUpTopDiv}`}>
              <span className={`${styles.topLogo} ms-0`}>{SVG.LOGIN_LOGO}</span>
              <Button
                className={`ml-auto ${styles.backBtn}`}
                onHandleClick={() => setPricingPlans(0)}
              >
                Back
              </Button>
            </div>
            <div className={styles.topTextLogo}>
              <Text>The Place You can learn Every Thing.</Text>
            </div>
          </Col>
          <Col xl="10" className="text-center">
            <div className="mb-3">
              <Text className={styles.packageName}>
                {tenatPricingPlan?.plans?.name}
              </Text>
              <Text className={styles.packageDis}>
                {tenatPricingPlan?.plans?.description}
              </Text>
            </div>
            <Row className="justify-content-center">
              {tenatPricingPlan &&
                tenatPricingPlan.plans &&
                tenatPricingPlan.plans.ChildPlans.map((obj) => {
                  return (
                    <Col xl="3" key={obj.id}>
                      <PricingCards
                        pricingCardValue={pricingCardValue}
                        setPricingCardValue={(e) => setPricingCardValue(e)}
                        setPlanData={setPlanData}
                        obj={obj}
                        selectPlan={true}
                      />
                    </Col>
                  );
                })}
            </Row>
            <Button
              // disabled={disableProceedButton}
              className="mt-5 mb-5"
              onHandleClick={() => signUpFunc()}
            >
              Register
            </Button>
          </Col>
        </Row>
      )}
      <CreditDebitCard
        isOpen={stripeCard}
        onClose={() => setStripeCard(false)}
        disablePayButton={disablePayButton}
        setDisablePayButton={setDisablePayButton}
        actionPay={(e) => {
          setDisablePayButton(true);
          dispatch(
            registerUser({
              firstName: formik.values.firstName,
              lastName: formik.values.lastName,
              organizationName: formik.values.organizationName,
              industry: formik.values.industry,
              email: formik.values.email,
              password: formik.values.password,
              phoneNo: formik.values.phoneNo,
              childPlanId: pricingCardValue,
              companyId: tenatPricingPlan.companyId,
              name: e.name,
              address: e.address,
              token: e.token,
              last4: e.last4,
              brand: e.brand,
              setStripeCard: setStripeCard,
              resetForm: formik.resetForm,
              setDisableButton: setDisablePayButton,
            })
          );
        }}
      />
    </Container>
  );
}
