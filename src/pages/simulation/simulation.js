import React from "react";
import Icons1 from "../../resources/images/icons1.jpeg";
import Icons2 from "../../resources/images/icons2.jpeg";

import "./simulation.css";
import Header from "./Header";
export default function Simulation() {
  return (
    <>
      <Header />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
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
              height: "100%",
              width: "20%",
            }}
          ></div>
          <div
            style={{
              height: "100%",
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
                height: "70%",
                width: "100%",
                backgroundColor: "green",
              }}
            ></div>
          </div>
          <div
            style={{
              height: "100%",
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
              <h2>رسالة اليوم</h2>
              <h2>MESSAGE DE JOUR</h2>
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
            <h2>عدد الايام بدون حوادث عمل</h2>
            <h2>Nombre des jours sansaccident de travail</h2>
            <div
              style={{
                height: "20%",
                width: "60%",
                backgroundColor: "grey",
                color: "blue",
              }}
            ></div>
            <img alt="" className="logo" src={Icons2} />
          </div>
          <div
            style={{
              height: "100%",
              width: "40%",
            }}
          >
            <div
              style={{
                height: "70%",
                width: "70%",
                backgroundColor: "red",
                border: "5px solid white",
                margin: "15%",
                
                
              }}
            >
              <h2>إرتداء وسائل الوقاية إجباري</h2>
              <h2>PORTER VOS EQUIPEMENTS DE PROTECTION</h2>
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
            <h2>العدد الجملي لحوادث الشغل</h2>
            <h2>Nombre total d'accident de travail</h2>
            <div
              style={{
                height: "20%",
                width: "60%",
                backgroundColor: "grey",
                color: "blue",
              }}
            ></div>
            <img alt="" className="logo" src={Icons1} />
          </div>
        </div>
      </main>
    </>
  );
}
