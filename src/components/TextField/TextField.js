import { useId } from "react";
import classes from "./TextField.module.scss";

const TextField = ({
  label = "label",
  placeholder = "placeholder",
  value = "",
  onChange = () => {},
  error = false,
  prefix = "",
  ...props
}) => {
  const id = useId();

  return (
    <div className={`${classes.TextField} ${error ? classes.Error : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className={classes.Input}>
        {prefix.length > 0 && <div className={classes.Prefix}>{prefix}</div>}
        <input
          className={prefix.length > 0 ? classes.HavePrefix : ""}
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          spellCheck="false"
          {...props}
        />
      </div>
    </div>
  );
};

export default TextField;
