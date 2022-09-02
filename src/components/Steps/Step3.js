import { useState, useEffect, useRef } from "react";
import classes from "./Steps.module.scss";

import { HiUserGroup } from "react-icons/hi";
import { RiUserFill } from "react-icons/ri";

import { updateDetails, nextPosition } from "../../store/actions";
import { useStore } from "../../store";
import CustomButton from "../CustomButton/CustomButton";

const PURPOSE_OPTIONS = {
  PERSONAL: "PERSONAL",
  TEAM: "TEAM",
};

const Step3 = () => {
  const [{ userDetails }, dispatch] = useStore();

  const [purpose, setPurpose] = useState("");
  const [hasError, setHasError] = useState(false);

  const timerRef = useRef();

  useEffect(() => {
    setPurpose(userDetails.purpose);
  }, [userDetails.purpose]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setPurpose(e.currentTarget.dataset.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      purpose !== PURPOSE_OPTIONS.PERSONAL &&
      purpose !== PURPOSE_OPTIONS.TEAM
    ) {
      setHasError(true);
      timerRef.current = setTimeout(() => setHasError(false), 200);
      return;
    }

    dispatch(updateDetails({ purpose }));
    dispatch(nextPosition());
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.HeaderText}>How are you planning to use Eden?</h1>
      <p className={classes.SubText}>
        We'll streamline your setup experience accordingly.
      </p>

      <form className={classes.Form} onSubmit={handleSubmit}>
        <div className={classes.OptionsContainer}>
          <div
            className={`${classes.Option} ${
              purpose === PURPOSE_OPTIONS.PERSONAL ? classes.Selected : ""
            } ${hasError ? classes.Error : ""}`}
            data-name={PURPOSE_OPTIONS.PERSONAL}
            onClick={handleChange}
          >
            <div className={classes.Icon}>
              <RiUserFill />
            </div>
            <h3 className={classes.Heading}>For myself</h3>
            <p className={classes.Info}>
              Write better. Think more clearly. Stay organized.
            </p>
          </div>
          <div
            className={`${classes.Option} ${
              purpose === PURPOSE_OPTIONS.TEAM ? classes.Selected : ""
            } ${hasError ? classes.Error : ""}`}
            data-name={PURPOSE_OPTIONS.TEAM}
            onClick={handleChange}
          >
            <div className={classes.Icon}>
              <HiUserGroup />
            </div>
            <h3 className={classes.Heading}>With my team</h3>
            <p className={classes.Info}>
              Wikis, docs, tasks & projects, all in one place.
            </p>
          </div>
        </div>

        <CustomButton title="Create Workspace" type="submit" />
      </form>
    </div>
  );
};

export default Step3;
