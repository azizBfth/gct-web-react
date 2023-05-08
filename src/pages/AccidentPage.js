import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from '../common/components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const AccidentPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [item, setItem] = useState();

  const validate = () =>
    
    item.message &&
   
    item.nbr_totale_accidents &&
 
    item.nbr_jours_sans_accident;

  return (
    <EditItemView
      endpoint="accidents"
      item={item}
      setItem={setItem}
      validate={validate}
    //  breadcrumbs={['settingsTitle', 'sharedDriver']}
    >
      {item && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{t('sharedRequired')}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
             
              <TextField
                value={item.nbr_jours_sans_accident || ''}
                onChange={(event) =>
                  setItem({ ...item, nbr_jours_sans_accident: event.target.value })
                }
               // label={t('sharedName')}
               label= "Nbr Jrs Sans Accident"
              />
              <TextField
                value={item.nbr_totale_accidents || ''}
                onChange={(event) =>
                  setItem({ ...item, nbr_totale_accidents: event.target.value })
                }
                label= "nbr_totale_accidents"
                />
         
              <TextareaAutosize 
               maxRows={6}
               minRows={2}

               aria-label="MESSAGE"
               
               style={{ "width": "100%" }}
               value={item.message || ''}
               onChange={(event) =>
                 setItem({ ...item, message: event.target.value })
               }
              // label={t('sharedName')}
              label= "Message " />
             
            </AccordionDetails>
          </Accordion>
      
      
        </>
      )}
    </EditItemView>
  );
};

export default AccidentPage;
