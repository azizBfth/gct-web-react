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

const LinkField = ({
  label,
  endpointAll,
  endpointLinked,
  baseId,
  keyBase,
  keyLink,
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
    if (active) {
      const response = await fetch(
        `${process.env.REACT_APP_URL_NAME}/${endpointLinked}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLinked(data.map((it) => it._id));
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

  const createBody = (linkId, endpoint) => {
    //console.log("ENDPOINT:::", endpoint);

    const body =
      endpoint === "agency"
        ? { user: baseId, agency: linkId }
        : endpoint === "trip"
        ? { user: baseId, trip: linkId }
        : endpoint === "stop"
        ? { user: baseId, stop: linkId }
        : endpoint === "stoptime"
        ? { user: baseId, stoptime: linkId }
        : endpoint === "vehicle"
        ? { user: baseId, vehicle: linkId }
        : endpoint === "calendar"
        ? { user: baseId, calendar: linkId }
        : { user: baseId, route: linkId };
    //console.log("BODY ", body);
    return body;
  };

  const onChange = async (event) => {
    const oldValue = linked;
    const newValue = event.target.value;
    if (!newValue.find((it) => it < 0)) {
      const results = [];
      newValue
        .filter((it) => !oldValue.includes(it))
        .forEach((added) => {
          //console.log("ADDED::", added, "userID", baseId);
          //  const body = {user:baseId,endpointAll:added}
          results.push(
            fetch(`${process.env.REACT_APP_URL_NAME}/user/${endpointAll}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
              },
              body: JSON.stringify(createBody(added, endpointAll)),
            })
          );
        });
      oldValue
        .filter((it) => !newValue.includes(it))
        .forEach((removed) => {
          //console.log("REMOVED:", removed, "Endpoint:", endpointAll);

          results.push(
            fetch(`${process.env.REACT_APP_URL_NAME}/user/${endpointAll}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
              },
              body: JSON.stringify(createBody(removed, endpointAll)),
            })
          );
        });
      await Promise.all(results);
      setLinked(newValue);
    }
  };

  return (<>
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
        value={linked || []}
        onChange={onChange}
        multiple
      >
        {items && linked
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
      />
  </>
   
  );
};

export default LinkField;
