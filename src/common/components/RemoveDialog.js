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

const RemoveDialog = ({ open, endpoint, itemId, onResult, action }) => {
  //console.log("ACTION: ", action);
  const classes = useStyles();
  const t = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemove = useCatch(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL_NAME}/${endpoint}/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      }
    );
    if (response.ok) {
      dispatch(action.remove(itemId));

      onResult(true);
    }
    if (response.status === 401) {
      //console.log("UNAUTHORIZED::", response.status);
      navigate("/login");
    } else {
      throw Error(await response.text());
    }
  });

  return (
    <Snackbar
      open={open}
      autoHideDuration={snackBarDurationLongMs}
      onClose={() => onResult(false)}
      message={t("sharedRemoveConfirm")}
      action={
        <Button size="small" className={classes.button} onClick={handleRemove}>
          {t("sharedRemove")}
        </Button>
      }
    />
  );
};

export default RemoveDialog;
