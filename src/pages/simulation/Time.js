import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../common/components/ErrorDialog";

import './simulation.css'
export default function Time() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const navigate = useNavigate()
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };

  function getCurrentTime(separator = ':') {
    let today = new Date();

    let date=new Date().toISOString().split("T")[0]

    let hr = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let sec = String(today.getSeconds()).padStart(2, '0');

    //console.log("CURENT TME",hr,":",min)

    return `${date} ${hr}${separator}${min}${separator}${sec}`;
  }
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, []);


  return (<>
  <div
  className="tempMsg"
      style={{
        paddingLeft: '10px',
        paddingRight: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between' ,
        color: 'red',
        height: '100%',
      }}
    >
      <div>{currentTime}</div>
     
    </div>
    <ErrorDialog
    style={{ transform: "none" }}
    open={opening}
    errorMsg={errorMsg}
    onResult={handleOpeningResult}
  />
  </>
    
  );
}
