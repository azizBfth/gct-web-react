import React from "react";
import Button from "@mui/material/Button";
import { Snackbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "./LocalizationProvider";
import { useCatch } from "../../reactHelper";
import { snackBarDurationLongMs } from "../util/duration";
import { getWithExpiry } from "../util/localstorage";
import { useDispatch } from "react-redux";
import { stopsActions } from "../../store";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "auto",
    marginTop: 0,
    marginBottom: 0,
    color: theme.palette.colors.negative,
  },
}));

const ErrorDialog = ({ open,   onResult ,errorMsg }) => {
  //console.log("ACTION: ", action);
  const classes = useStyles();

  const handleRemove = useCatch(async () => {
    
   onResult(false)
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={snackBarDurationLongMs}
      onClose={() => onResult(false)}
      message={errorMsg}
    
    />
  );
};

export default ErrorDialog;
