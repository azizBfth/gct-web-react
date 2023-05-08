import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectAsync } from "../../reactHelper";
import { getWithExpiry } from "../util/localstorage";
import ErrorDialog from "./ErrorDialog";

const LinkItem = ({
  label,
  endpointAll,
  linkedItem,
  baseId,
  keyBase,
  keyLink,
  handleCallBack,
  keyGetter = (item) => item._id,
  titleGetter = (item) =>
    endpointAll === "stop"
      ? item.stop_name
      : endpointAll === "trip"
      ? item.trip_headsign
      : endpointAll === "calendar"
      ? item.name
      : endpointAll === "stoptime"
      ? item.name
      : endpointAll === "vehicle"
      ? item.name
      : endpointAll === "route"
      ? item.route_long_name
      : item.agency_name,
}) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState();
  const [linked, setLinked] = useState();
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
  useEffectAsync(async () => {
    if (active) {
      const response = await fetch(
        `${process.env.REACT_APP_URL_NAME}/${endpointAll}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
          },
        }
      );
      if (response.ok) {
        setItems(await response.json());
        return
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
    }
  }, [active]);

  useEffectAsync(async () => {
    if (active && linkedItem) {
      //console.log("ENTER TO SET ITEMS ", linkedItem);
      setLinked(
        endpointAll === "stop"
          ? linkedItem.stop_id
          : endpointAll === "trip"
          ? linkedItem.trip_id
          : endpointAll === "calendar"
          ? linkedItem.service_id
          : endpointAll === "stoptime"
          ? linkedItem.stoptime_id
          : endpointAll === "vehicle"
          ? linkedItem.vehicle_id
          : endpointAll === "route"
          ? linkedItem.route_id
          : linkedItem.agency_id
      );
      //console.log("End Linked");
    } else {
      //console.log("LINKED IS EMPTY");
    }
  }, [active]);

  const onChange = async (event) => {
    const newValue = event.target.value;
    setLinked(newValue);
    handleCallBack(
      endpointAll === "stop"
        ? "stop_id"
        : endpointAll === "trip"
        ? "trip_id"
        : endpointAll === "calendar"
        ? "service_id"
        : endpointAll === "stoptime"
        ? "stoptime_id"
        : endpointAll === "vehicle"
        ? "vehicle_id"
        : endpointAll === "route"
        ? "route_id"
        : "agency_id",
      event.target.value
    );
  };

  return (
<>
<FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        open={open}
        onOpen={() => {
          setActive(true);
          setOpen(true);
        }}
        onClose={() => setOpen(false)}
        value={linked || ""}
        onChange={onChange}
      >
        {items
          ? items.map((item) => (
              <MenuItem key={keyGetter(item)} value={keyGetter(item)}>
                {titleGetter(item)}
              </MenuItem>
            ))
          : [...Array(3)].map((_, i) => (
              <MenuItem key={-i - 1} value={-i - 1}>
                <Skeleton
                  variant="text"
                  width={`${Math.floor(Math.random() * 30 + 30)}%`}
                />
              </MenuItem>
            ))}
      </Select>
    </FormControl>
       <ErrorDialog
       style={{ transform: "none" }}
       open={opening}
       errorMsg={errorMsg}
       onResult={handleOpeningResult}
     /></>
  );
};

export default LinkItem;
