import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import Text from "../Text";
import Icon from "../../Constants/IconConstants";
import Button from "../Button";
import styles from "./style.module.scss";

export default function PricingCards({
  pricingCardValue,
  setPricingCardValue,
  obj,
  setPlanData,
  selectPlan,
}) {
  return (
    <Card
      onCardClick={() => {
        setPricingCardValue(obj.id);
        setPlanData(obj);
      }}
      className={`mb-3 ${styles.princingCardDesign} ${
        pricingCardValue == obj.id ? `${styles.active}` : ""
      }`}
    >
      <Text className={styles.cardHeading}>{obj && obj.name}</Text>
      <Text className={styles.cardAmmount}>
        {obj && obj.amount === 0 ? "Free" : `$${obj && obj.amount}`}
      </Text>
      {obj.trial && (
        <>
          <Text className={styles.cardModuleListing}>
            Trial days :{" "}
            {(obj && obj.trial_period_days === 0) ||
            obj.trial_period_days === null
              ? 0
              : obj && obj.trial_period_days}
          </Text>
          <Text className={styles.cardModuleListing}>
            Trial price : $
            {(obj && obj.trial_price === 0) || obj.trial_price === null
              ? 0
              : obj && obj.trial_price}
          </Text>
        </>
      )}

      {obj &&
        obj?.PlanPermissions?.map((temp) => {
          return (
            <div key={temp.Module.name} className="text-start">
              {temp.isAllowedAccess ? (
                <Text className={styles.cardModuleListing}>
                  {Icon.CHECK_CIRCLE_ICON}
                  {temp.Module.name}
                </Text>
              ) : (
                <Text className={styles.cardModuleListing}>
                  {Icon.CROSS_CIRCLE_ICON}
                  {temp.Module.name}
                </Text>
              )}
            </div>
          );
        })}
      {selectPlan ? <Button variant="outline">Select Plan</Button> : null}
    </Card>
  );
}

Button.propTypes = {
  selectPlan: PropTypes.bool,
  // setPricingCardValue: PropTypes.func,
  // setPlanData: PropTypes.func,

};
Button.defaultProps = {
  selectPlan: false,
};
