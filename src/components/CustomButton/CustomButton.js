import classes from "./CustomButton.module.scss";

const CustomButton = ({
  title = "Submit",
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button className={classes.Button} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default CustomButton;
