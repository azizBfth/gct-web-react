import React from "react";
import Icons1 from "../../resources/images/icons1.jpeg";
import Icons2 from "../../resources/images/icons2.jpeg";

import "./simulation.css";
import Header from "./Header";
import Message from "./message";
export default function Simulation() {
  return (
    <>
      <Header />
      <main
        style={{
          //  display: "flex",
          //flexDirection: "column",
          height: "100%",
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
              <h2>DATE/HEURE/TEMPERATURE</h2>
              <h2>التاريخ / التوقيت / درجة الحرارة</h2>
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
                  backgroundColor: "black",
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
                >
                  29°C
                </h1>
              </div>
              <div
                style={{
                  height: "100%",
                  width: "80%",
                  backgroundColor: "green",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Message />
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
                height: "30%",
                width: "100%",
              }}
            ></div>
            <div
              style={{
                height: "70%",
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
              >
                رسالة اليوم
              </h2>
              <h2
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
            height: "60%",
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
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              عدد الايام بدون حوادث عمل
            </h2>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              Nombre des jours sansaccident de travail
            </h2>
            <div
              style={{
                height: "20%",
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
              >
                61
              </h1>
            </div>
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
              display:"flex",
              alignItems:"center",
              justifyContent:"space-around"
            }}
          >
            <div
              style={{
                height: "50%",
                width: "70%",
                backgroundColor: "red",
                border: "5px solid white",
                color: "white",
              }}
            >
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                إرتداء وسائل الوقاية إجباري
              </h2>
              <div
          
              >
                <h2
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}>PORTER VOS EQUIPEMENTS DE PROTECTION</h2>
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
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              العدد الجملي لحوادث الشغل
            </h2>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              Nombre total d'accident de travail
            </h2>
            <div
              style={{
                height: "20%",
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
              >
                61
              </h1>
            </div>
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
    </>
  );
}
