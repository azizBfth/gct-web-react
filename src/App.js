import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import { accidentsActions,usersActions } from "./store";
import theme from "./theme";
import Drawer from "./drawer/drawer";
import { useNavigate } from "react-router-dom";
import { getWithExpiry } from "./common/util/localstorage";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Token, setToken] = useState(null);

  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const url = `${process.env.REACT_APP_URL_NAME}`;
  const _isAdministrator = useSelector((state) => state.session.user.administrator);

  const fetchAccidentsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_NAME}/accidents`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      if (response.ok) {
        dispatch(accidentsActions.update(await response.json()));
      }
      if (response.status === 401) {
        //console.log("UNAUTHORIZED::", response.status);
        navigate("/login");
      } else {
        // throw Error(await response.text());
      }
    } catch (error) {
      //console.log("there is an error ");
    }
  };

  const fetchUsersData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_NAME}/user`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getWithExpiry("TOKEN")}`,
        },
      });
      if (response.ok) {
        response
          .clone()
          .json()
          .then((data) => {
            //console.log("data users", data);
            dispatch(usersActions.setItems(data));
            //console.log("USERS DISPATCHED");
          });
        return
      }
      
    } finally {
    }
  };
 

  useEffect(() => {
    if (getWithExpiry("TOKEN") == null) {
      navigate("/login");
    } else {
      fetchAccidentsData();
   

      if(_isAdministrator){
        fetchUsersData();
      }
    }
  }, []);

  return <Drawer />;
}
export default App;
