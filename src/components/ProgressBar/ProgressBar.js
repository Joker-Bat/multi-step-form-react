import classes from "./ProgressBar.module.scss";

import { useStore } from "../../store";
import { updatePosition } from "../../store/actions";

const ProgressBar = () => {
  const [{ currentPosition, steps }, dispatch] = useStore();

  const handleChangePosition = (index) => {
    if (currentPosition === index) return;
    dispatch(updatePosition(index));
  };

  return (
    <div className={classes.ProgressBar}>
      {steps.map((_, curIndex) => {
        return (
          <div
            className={`${classes.Cell} ${
              curIndex <= currentPosition ? classes.Active : ""
            } ${curIndex < currentPosition ? classes.Done : ""} `}
            key={curIndex}
          >
            <span
              className={`${classes.Circle} ${classes.Active}`}
              onClick={() => handleChangePosition(curIndex)}
            >
              {curIndex + 1}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
