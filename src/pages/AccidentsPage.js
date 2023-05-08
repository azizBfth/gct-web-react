import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import { useEffectAsync } from "../reactHelper";
import { getWithExpiry } from "../common/util/localstorage";
import SearchHeader, {
  filterByKeyword,
} from "../common/components/SearchHeader";

import CollectionActions from "../common/components/CollectionActions";
import { accidentsActions } from "../store";
import TableShimmer from "../common/components/TableShimmer";
import { useDispatch, useSelector } from "react-redux";
import CollectionFab from "../settings/CollectionFab";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../common/components/ErrorDialog";

const AccidentsPage = () => {
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
  //console.log("items ", items);
  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        ACCIDENTS
      </Typography>

      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#D3D3D3" }}>
            <TableCell>NAME</TableCell>

            <TableCell>MESSAGE</TableCell>
            <TableCell>NBR JRS SANS ACC</TableCell>
            <TableCell>NBR TOTALE ACC </TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {!loading && _accidents ? (
            <TableRow key={_accidents._id}>
              <TableCell>{_accidents.name}</TableCell>

              <TableCell>{_accidents.message}</TableCell>
              <TableCell>{_accidents.nbr_jours_sans_accident}</TableCell>
              <TableCell>{_accidents.nbr_totale_accidents}</TableCell>
              <TableCell>{_accidents.temperature}</TableCell>

              <TableCell padding="none">
                <CollectionActions
                  itemId={_accidents._id}
                  editPath="/settings/accident"
                  endpoint="accidents"
                  action={accidentsActions}
                  removable={false}
                />
              </TableCell>
            </TableRow>
          ) : (
            <TableShimmer columns={3} endAction />
          )}
        </TableBody>
      </Table>
      <ErrorDialog
        style={{ transform: "none" }}
        open={opening}
        errorMsg={errorMsg}
        onResult={handleOpeningResult}
      />
    </>
  );
};

export default AccidentsPage;
