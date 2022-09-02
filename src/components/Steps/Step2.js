import { useState } from "react";
import classes from "./Steps.module.scss";

import TextField from "../TextField/TextField";
import CustomButton from "../CustomButton/CustomButton";

import { useStore } from "../../store";
import { updateDetails, nextPosition } from "../../store/actions";

const Step2 = () => {
  const [{ userDetails }, dispatch] = useStore();

  const [details, setDetails] = useState({
    workspaceName: userDetails.workspaceName,
    workspaceUrl: userDetails.workspaceUrl,
  });

  const [error, setError] = useState({
    workspaceName: false,
    workspaceUrl: false,
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

    if (!(details.workspaceName.length > 0)) {
      setError((prev) => ({ ...prev, workspaceName: true }));
      hasError = true;
    } else {
      setError((prev) => ({ ...prev, workspaceName: false }));
    }

    if (hasError) return;

    dispatch(updateDetails(details));
    dispatch(nextPosition());
  };

  return (
    <div className={classes.Container}>
      <h1 className={classes.HeaderText}>
        Lets set up a home for all your work
      </h1>
      <p className={classes.SubText}>
        You can always create another workspace later.
      </p>

      <form className={classes.Form} onSubmit={handleSubmit}>
        <div className={classes.InputField}>
          <TextField
            label="Workspace Name"
            placeholder="Eden"
            name="workspaceName"
            value={details.workspaceName}
            onChange={handleChange}
            error={error.workspaceName}
          />
        </div>

        <div className={classes.InputField}>
          <TextField
            label={
              <>
                Workspace URL
                <span className={classes.Optional}>(optional)</span>
              </>
            }
            placeholder="Example"
            name="workspaceUrl"
            value={details.workspaceUrl}
            onChange={handleChange}
            error={error.workspaceUrl}
            prefix="www.eden.com/"
          />
        </div>

        <CustomButton title="Create Workspace" type="submit" />
      </form>
    </div>
  );
};

export default Step2;
