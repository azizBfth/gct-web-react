import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffectAsync } from "../../reactHelper";
import { getWithExpiry } from "../util/localstorage";
import ErrorDialog from "./ErrorDialog";

const CheckItem = ({ endpoint, label, action, id, state }) => {
  const [active, setActive] = useState(false);
  const [checkedValue, setCheckedValue] = useState("");

  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
  async function getItemById(){
console.log("agencyID", id,"STATE",state)

    const item = state.filter(element => element._id === id) 

    //console.log("CHECK ITEM FROM STATE",item)
    if(item.length >0){
     setCheckedValue(
       label === "calendar"
         ? item[0].name
         : label === "route"
         ? item[0].route_long_name
         : label === "vehicle"
         ? item[0].name
         : label === "trip"
         ? item[0].trip_short_name:
         label === "trip_id"
         ? item[0].trip_id
         : label === "stop"
         ? item[0].stop_code
         : item[0].agency_name
     );
    }
    else{
        //console.log("ENTER TO FETCH")

        setActive(true);

        try {
            const response = await fetch(
              `${process.env.REACT_APP_URL_NAME}/${endpoint}`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
                },
              }
            );
            if (response.ok) {
              response
                .clone()
                .json()
                .then((data) => {
                  if(data){
                    setCheckedValue(
                      label === "calendar"
                        ? data.name
                        : label === "route"
                        ? data.route_long_name
                        : label === "vehicle"
                        ? data.name
                        : label === "trip"
                        ? data.trip_short_name
                        : label === "stop"
                        ? data.stop_name
                        : data.agency_name
                    );
                  }else{
                    setCheckedValue(""); //throw Error(await response.text());

                  }
          
                });
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
          } finally {
            setActive(false);
          }
    }
    
     }

     useEffectAsync(async ()=>{
        getItemById();

     },[])

 

  return <>{checkedValue}
    <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
  </>;
};

export default CheckItem;
