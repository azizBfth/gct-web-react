import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "../../common/components/LocalizationProvider";
import { getWithExpiry } from "../util/localstorage";
import ErrorDialog from "./ErrorDialog";

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
  },
}));

const TripStopTimeAction = ({ itemId, editPath, item, stops }) => {
  //console.log("ACTION /////", action);
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const t = useTranslation();

  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [stopTimeItem, setStopTimeItem] = useState({
    arrival_time: "23:59",
    departure_time: "23:56",
    name: "",
    pickup_type: 1,
    stop_headsign: '',
    stop_id: '',
    stop_sequence: 1,
    trip_id: '',
  });
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");
  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
 
  const handleTripStopTimePost = async (body) => {
    let url = `${process.env.REACT_APP_URL_NAME}/stoptime`;
    //console.log("ENTER TO POST ELEM")

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
    // console.log("OKOK");
      navigate(`${editPath}`, { state: { trip_id: item._id } });
      setMenuAnchorEl(null);
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
  };
  const handleTripStopTimeGet = async (body) => {
    let url = `${process.env.REACT_APP_URL_NAME}/stoptime?tripId=${item._id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithExpiry('TOKEN')}`,
      },
    });

    if (response.ok) {
      response
        .clone()
        .json()
        .then((data) => {
          // console.log("TRIP ID",item._id,"StopTime By ID", data);
          if (data.length === 0) {
            handleTripStopTime();
          } else {
            navigate(`${editPath}`, { state: { trip_id: item._id } });
            setMenuAnchorEl(null);
          }
        });
      return;
    }
    if (response.status === 401) {
      setErrorMsg("UNAUTHORIZED");
      setOpening(true);
      //console.log("UNAUTHORIZED::", response.status);
      navigate('/login');
    } else {
      setErrorMsg(await response.text());
      setOpening(true);
      throw Error(await response.text());
    }
  };
  const handleTripStopTime = () => {
   // console.log("ENTER TO FETCH STOPS")
    stops.forEach((element) => {
     // console.log("trip headsign", item.trip_headsign);
     // console.log("element.stop_name", element.stop_name);
      let seq =
        item.trip_headsign === "KERKENNAH" && element.stop_name === "SFAX"
          ? 1
          : item.trip_headsign === "KERKENNAH" &&
            element.stop_name === "KERKENNAH"
          ? 2
          : item.trip_headsign === "SFAX" && element.stop_name === "KERKENNAH"
          ? 1
          : 2;
      //console.log("seq", seq);
      const elem = {
        arrival_time: "23:59",
        departure_time: "23:59",
        name: element.stop_name,
        pickup_type: 1,
        stop_headsign: element.stop_name === 'SFAX' ? 'KERKENNAH' : 'SFAX',
        stop_id: element._id,
        stop_sequence: seq,

        trip_id: item._id,
      };
      handleTripStopTimePost(elem);

      // console.log("ELEM TO PUSH", elem);
    });
  };

  return (
    <>
      {phone ? (
        <>
          <IconButton
            size="small"
            onClick={(event) => setMenuAnchorEl(event.currentTarget)}
          >
            <MoreTimeIcon fontSize="small" />
          </IconButton>
          <Menu
            open={!!menuAnchorEl}
            anchorEl={menuAnchorEl}
            onClose={() => setMenuAnchorEl(null)}
          >
            <MenuItem onClick={handleTripStopTimeGet}>
              stopTimes
            </MenuItem>
          </Menu>
        </>
      ) : (
        <div className={classes.row}>
          <IconButton size="small" onClick={handleTripStopTimeGet}>
            <MoreTimeIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
    </>
  );
};

export default TripStopTimeAction;
