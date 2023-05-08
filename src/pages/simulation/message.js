
import React from "react";
import Marquee from "react-fast-marquee";

export default function Message({message,lang}){


return <>

<div>
<Marquee
      speed={10}
        style={{
          height: "100%",
          width:"100%",
          color: "whitesmoke",
          fontSize:"50px"
          
        }}
        direction={lang==="Fr"?"left":"right"}
        gradient={false}
        //direction={direction}
      >
        {message}
      </Marquee>
    </div>
</>


}