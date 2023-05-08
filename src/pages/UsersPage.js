import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useCatch, useEffectAsync } from "../reactHelper";
import { getWithExpiry, setWithExpiry } from "../common/util/localstorage";
import SearchHeader, {
  filterByKeyword,
} from "../common/components/SearchHeader";

import CollectionActions from "../common/components/CollectionActions";
import { sessionActions, usersActions } from "../store";
import TableShimmer from "../common/components/TableShimmer";
import { useDispatch, useSelector } from "react-redux";
import CollectionFab from "../settings/CollectionFab";
import { useTranslation } from "../common/components/LocalizationProvider";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../common/components/ErrorDialog";

const UsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const _users = useSelector((state) => state.users.items);

  //console.log("USERS FROM STORE", _users);
  const _isAdministrator = useSelector(
    (state) => state.session.user.administrator
  );
  const t = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opening, setOpening] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error !!");

  const handleOpeningResult = (opening) => {
    setOpening(false);
    if (opening) {
    }
  };
  const handleLogin = useCatch(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_NAME}/session`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "admin",
            password: "123456789",
          }),
        }
      );
      if (response.ok) {
        const user = await response.json();
        setWithExpiry("TOKEN", user.token.data, user.token.expiresIn);
        dispatch(sessionActions.updateUser(user));
        navigate("/");
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
    } catch (error) {}
  });
  useEffectAsync(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  //console.log("itemms ", items);
  return (
    <>
        <Typography
        variant="h2"
        component="h2"
        align="center"
        
      >
        USERS
      </Typography>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />

      <Table>
        <TableHead >
          <TableRow style={{backgroundColor: "#D3D3D3"}}>
            <TableCell>EMAIL</TableCell>
            <TableCell>ADMINISTRATOR</TableCell>

            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && _users && _users.length > 0 ? (
            _users.filter(filterByKeyword(searchKeyword)).map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.administrator ? "TRUE" : "FALSE"}</TableCell>

                <TableCell padding="none">
                  <CollectionActions
                    itemId={item._id}
                    editPath="/settings/user"
                    endpoint="user"
                    action={usersActions}
                    removable={true}

                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableShimmer columns={3} endAction />
          )}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/user" />
      <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
    </>
  );
};

export default UsersPage;
