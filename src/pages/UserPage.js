import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,

} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditItemView from "../common/components/EditItemView";
import { useTranslation } from "../common/components/LocalizationProvider";
import LinkField from "../common/components/LinkField";
import { formatNotificationTitle } from "../common/util/formatter";
import bcrypt from 'bcryptjs-react';
const useStyles = makeStyles((theme) => ({
  details: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [item, setItem] = useState({});

  const validate = () => item.email && item.username;
  return (
    <EditItemView
      endpoint="user"
      item={item}
      setItem={setItem}
      validate={validate}
      //  breadcrumbs={['settingsTitle', 'sharedDriver']}
    >
      {item && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{t("sharedRequired")}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
           
               <TextField
                value={item.username || ""}
                onChange={(event) =>
                  setItem({ ...item, username: event.target.value })
                }
                // label={t('sharedName')}
                label="UserName"
              />
   <TextField
                value={item.email || ""}
                onChange={(event) =>
                  setItem({ ...item, email: event.target.value })
                }
                // label={t('sharedName')}
                label="Email"
              />

              <TextField
                type="password"
                onChange={(event) =>
                  setItem({ ...item, password: event.target.value })
                }
                label={t("userPassword")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.administrator}
                    onChange={(e) =>
                      setItem({ ...item, administrator: e.target.checked })
                    }
                  />
                }
                label={t("userAdmin")}
                // disabled={!item.administrator}
              />
            </AccordionDetails>
          </Accordion>
    
        </>
      )}
    </EditItemView>
  );
};

export default UserPage;
