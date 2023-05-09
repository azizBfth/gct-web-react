import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Time from "./Time";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accidentsActions } from "../../store";

export default function Message({ message, lang }) {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    //console.log("number", sliceNumber);
    const [loading, setLoading] = useState(false);
    const [isTime, setIsTime] = useState(false);
    const [gctMessage, setGctMessage] = useState(message);


    const [reqTimer, setReqTimer] = useState(
         120000
      );
    const [basculeTimer, setBasculeTimer] = useState(
     60000
      );

      useEffect(() => {
        let interval = setInterval(() => {
            setIsTime(!isTime)

       
    
        }, basculeTimer);
        return () => {
          clearInterval(interval);
        };
      }, [basculeTimer, isTime]);


      useEffect(() => {
        let interval = setInterval(async () => {
          //console.log("ENTER TO REQUEST TIMER");
    
          setLoading(true);
          try {
            const response = await fetch(
              `${process.env.REACT_APP_URL_NAME}/accidents`,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              dispatch(accidentsActions.setItems(data));
              
            //  console.log("data from use effect ...........", data.message);
              setGctMessage(data.message)
              return;
            }
          } finally {
            setLoading(false);
          }
          console.log("REQUEST TIMER");
        }, reqTimer);
        return () => {
          clearInterval(interval);
        };
      }, [dispatch, reqTimer]);
    
  return (
    <>
      <div>
        {isTime ? (<Time />):(
        <Marquee
          speed={10}

          style={{
            height: "100%",
            width: "100%",
            color: "whitesmoke",
            fontSize: "50px",
          }}
          direction={lang === "Fr" ? "left" : "right"}
          gradient={false}
          //direction={direction}
        >
          {gctMessage}
        </Marquee>)}
      </div>
    </>
  );
}
