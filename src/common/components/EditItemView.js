import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import {
  Container,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
  TextField,
} from "@mui/material";
import { useCatch, useEffectAsync } from "../../reactHelper";
import { useTranslation } from "../../common/components/LocalizationProvider";
import PageLayout from "../../common/components/PageLayout";
import { getWithExpiry } from "../util/localstorage";
import ErrorDialog from "./ErrorDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-evenly",
    "& > *": {
      flexBasis: "33%",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
}));

const EditItemView = ({
  children,
  endpoint,
  item,
  setItem,
  defaultItem,
  validate,
  onItemSaved,
  breadcrumbs,
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const t = useTranslation();

  const { id } = useParams();
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
  useEffectAsync(async () => {
    if (!item) {
      if (id) {
        const response = await fetch(
          `${process.env.REACT_APP_URL_NAME}/${endpoint}/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
            },
          }
        );
        if (response.ok) {
          response.clone()
          .json()
          .then((data) => {
            if(endpoint==="user"){
              delete data.password

              setItem(data)
              console.log("USER ITEM Data ::",data)

            }else{
              setItem(data)

            }
            
          });

         

          return;
        }
        if (response.status === 401) {
          setErrorMsg("UNAUTHORIZED");
          setOpening(true);
          //console.log("UNAUTHORIZED::", response.status);
          navigate("/login");
        } else {
//console.log("ERROR");
          setOpening(true);

          throw Error(await response.text());
        }
      } else {
        setItem(defaultItem || {});
      }
    }
  }, [id, item, defaultItem]);

  const handleSave = useCatch(async () => {
    let url = `${process.env.REACT_APP_URL_NAME}/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }
   // console.log("ITEM:::::", getWithExpiry("TOKEN"));
    const response = await fetch(url, {
      method: !id ? "POST" : "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
      },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      if (onItemSaved) {
        onItemSaved(await response.json());
      }
      navigate(-1);
      return;
    }
    if (response.status === 401) {
      setErrorMsg("UNAUTHORIZED");
      setOpening(true);
      //console.log("UNAUTHORIZED::", response.status);
      navigate("/login");
    } else {
      setErrorMsg(await response.text());
      setOpening(true);
      throw Error(await response.text());
    }
  });

  return (
    <>
      <PageLayout breadcrumbs={breadcrumbs}>
        <Container maxWidth="xs" className={classes.container}>
          {item ? (
            children
          ) : (
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Skeleton width="10em" />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={-i} width="100%">
                    <TextField />
                  </Skeleton>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          <div className={classes.buttons}>
            <Button
              type="button"
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={!item}
            >
              {t("sharedCancel")}
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={handleSave}
              disabled={!item || !validate()}
            >
              {t("sharedSave")}
            </Button>
          </div>
        </Container>
      </PageLayout>
      <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
    </>
  );
};

export default EditItemView;
