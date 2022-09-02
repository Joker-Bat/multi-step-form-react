import classes from "./Steps.module.scss";

import { useStore } from "../../store";
import CustomButton from "../CustomButton/CustomButton";

const Step4 = () => {
  const [{ userDetails }] = useStore();

  const handleRedirectToProfile = () => {
    window.open("https://github.com/Joker-Bat", "_blank");
  };

  return (
    <div className={classes.Container}>
      <div className={classes.CircleContainer}>
        <div className={classes.Circle}>
          <div className={classes.Check}></div>
        </div>
      </div>

      <h1 className={classes.HeaderText}>
        Congratulations, {userDetails.displayName}
      </h1>
      <p className={classes.SubText}>
        You have completed onboarding, you can start using Eden!
      </p>

      <div className={classes.Step4Button}>
        <CustomButton title="Launch Eden" onClick={handleRedirectToProfile} />
      </div>
    </div>
  );
};

export default Step4;
