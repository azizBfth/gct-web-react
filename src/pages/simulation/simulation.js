import React, { useEffect, useState } from "react";

import { getWithExpiry } from "../../common/util/localstorage";

import { accidentsActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icons1 from "../../resources/images/icons1.jpeg";
import Icons2 from "../../resources/images/icons2.jpeg";

import "./simulation.css";
import Header from "./Header";
import Message from "./message";
import ErrorDialog from "../../common/components/ErrorDialog";
import { useEffectAsync } from "../../reactHelper";
export default function Simulation() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const _accidents = useSelector((state) => state.accidents.items);
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_NAME}/accidents`,
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
            dispatch(accidentsActions.setItems(data));
          });
        setItems(await response.json());
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
    } finally {
      setLoading(false);
    }
  }, []);
  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };

  return (
    <>
      <Header />
      <main
        style={{
          //  display: "flex",
          //flexDirection: "column",
          height: "84%",
          backgroundColor: "#fefee2",
          color: "blue",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            color: "green",
          }}
        >
          <div
            style={{
              height: "60%",
              width: "20%",
            }}
          ></div>
          <div
            style={{
              height: "60%",
              width: "60%",
              backgroundColor: "green",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "30%",
                width: "100%",
                backgroundColor: "#fefee2",
                alignItems: "center",
                justifyContent: "space-between",
                color: "blue",
              }}
            >
              <h2 className="size">DATE/HEURE/TEMPERATURE</h2>
              <h2 className="size">التاريخ / التوقيت / درجة الحرارة</h2>
            </div>
            <div
              style={{
                display: "flex",
                height: "70%",
                width: "100%",
                // backgroundColor: "red",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "20%",
                  backgroundColor: "#686868",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <h1
                className="tempMsg"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    color: "blue",
                  }}
                >
                  {_accidents.temperature} °C{" "}
                </h1>
              </div>
              <div className="tempMsg"
                style={{
                  height: "100%",
                  width: "80%",
                  backgroundColor: "grey",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Message message={_accidents.message} lang={_accidents.lang} />
              </div>
            </div>
          </div>
          <div
            style={{
              height: "60%",
              width: "20%",
            }}
          >
            <div
              style={{
                height: "20%",
                width: "100%",
              }}
            ></div>
            <div
              style={{
                height: "80%",
                width: "100%",
                color: "blue",
              }}
            >
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                className="size"
              >
                رسالة اليوم
              </h2>
              <h2 className="size"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                MESSAGE DE JOUR
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: "40%",
            color: "blue",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}
          >
 <div style={{
              height: "60%",
              width: "100%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}>
    <h2 className="size"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              عدد الايام بدون حوادث عمل
            </h2>
            <h2 className="size"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                textAlign:"center"

              }}
            >
              Nombre des jours sans accident de travail
            </h2>
            </div>

            <div style={{
              height: "40%",
              width: "100%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}>
         <div
              style={{
                height: "50%",
                width: "60%",
                backgroundColor: "grey",
                color: "white",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                className="size"
              >
                {_accidents.nbr_jours_sans_accident}
              </h1>
            </div>
            </div>


          
            
          </div>
          <div
            style={{
              height: "100%",
              width: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                height: "70%",
                width: "70%",
                backgroundColor: "red",
                border: "2px solid white",
                color: "white",
              }}
            >
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                className="size"
              >
                إرتداء وسائل الوقاية إجباري
              </h2>
              <div>
                <h2 className="size"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    textAlign: "center",
                  }}
                >
                  PORTER VOS EQUIPEMENTS DE PROTECTION
                </h2>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}
          >
            <div style={{
              height: "60%",
              width: "100%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}>
    <h2 className="size"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              العدد الجملي لحوادث الشغل
            </h2>
            <h2 className="size"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                textAlign:"center"

              }}
            >
              Nombre total d'accidents de travail
            </h2>
            </div>

            <div style={{
              height: "40%",
              width: "100%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}>
         <div
              style={{
                height: "50%",
                width: "60%",
                backgroundColor: "grey",
                color: "white",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <h1
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  textAlign:"center"
                }}
                className="size"
              >
                {_accidents.nbr_totale_accidents}
              </h1>
            </div>
            </div>
        
         
         
   
          
          </div>
        </div>


        <div
          style={{
            display: "flex",
            height: "20%",
            color: "blue",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}
          >
           
           
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img alt="" className="logo" src={Icons2} />
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
          
          </div>
          <div
            style={{
              height: "100%",
              width: "30%",
              backgroundColor: "#fefee2",
              color: "blue",
            }}
          >
    
      
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img alt="" className="logo" src={Icons1} />
            </div>
          </div>
        </div>
      </main>
      <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
    </>
  );
}
