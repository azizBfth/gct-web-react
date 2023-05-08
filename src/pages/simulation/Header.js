import React from "react";
import GctLogo1 from '../../resources/images/logo1.jpeg';
import GctLogo2 from '../../resources/images/logo2.jpeg';


import "./header.css";
export default function Header() {
  return (
    <header className="header">
      <div>
      <img alt="" className="logo" src={GctLogo2} />

      </div>{" "}
      <div>
      <img alt="" className="logo" src={GctLogo1} />

      </div>{" "}
    </header>
  );
}
