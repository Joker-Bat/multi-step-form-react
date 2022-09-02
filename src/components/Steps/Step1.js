import { useState } from "react";
import classes from "./Steps.module.scss";

import TextField from "../TextField/TextField";
import CustomButton from "../CustomButton/CustomButton";

import { updateDetails, nextPosition } from "../../store/actions";
import { useStore } from "../../store";

const Step1 = () => {
  const [{ userDetails }, dispatch] = useStore();

  const [details, setDetails] = useState({
    fullName: userDetails.fullName,
    displayName: userDetails.displayName,
  });

  const [error, setError] = useState({
    fullName: false,
    displayName: false,
  });

  const handleChange = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!(details.fullName.length > 0)) {
      setError((prev) => ({ ...prev, fullName: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, fullName: false }));
    }

    if (!(details.displayName.length > 0)) {
      setError((prev) => ({ ...prev, displayName: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, displayName: false }));
    }

    if (hasError) return;

    dispatch(updateDetails(details));
    dispatch(nextPosition());
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.HeaderText}>Welcome! First things first...</h1>
      <p className={classes.SubText}>You can always change them later.</p>
      <form className={classes.Form} onSubmit={handleSubmit}>
        <div className={classes.InputField}>
          <TextField
            label="Full Name"
            placeholder="Steve Jobs"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            error={error.fullName}
          />
        </div>

        <div className={classes.InputField}>
          <TextField
            label="Display Name"
            placeholder="Steve"
            name="displayName"
            value={details.displayName}
            onChange={handleChange}
            error={error.displayName}
          />
        </div>

        <CustomButton title="Create Workspace" type="submit" />
      </form>
    </div>
  );
};

export default Step1;
