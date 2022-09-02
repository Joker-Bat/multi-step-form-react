import { useState, useEffect } from "react";
import classes from "./App.module.scss";

import EdenLogo from "./assets/LOGO.png";
import { useStore } from "./store";
import { updateSteps } from "./store/actions";

import Step1 from "./components/Steps/Step1";
import Step2 from "./components/Steps/Step2";
import Step3 from "./components/Steps/Step3";
import Step4 from "./components/Steps/Step4";
import ProgressBar from "./components/ProgressBar/ProgressBar";

function App() {
  const [{ currentPosition }, dispatch] = useStore();

  const [states] = useState([
    {
      component: <Step1 />,
    },
    {
      component: <Step2 />,
    },
    {
      component: <Step3 />,
    },
    {
      component: <Step4 />,
    },
  ]);

  useEffect(() => {
    dispatch(updateSteps(states));
  }, [dispatch, states]);

  return (
    <div className={classes.App}>
      <div className={classes.Logo}>
        <img src={EdenLogo} alt="logo" />
        <h1>Eden</h1>
      </div>

      <div className={classes.ProgressBar}>
        <ProgressBar />
      </div>

      <div className={classes.Form}>{states[currentPosition].component}</div>
    </div>
  );
}

export default App;
