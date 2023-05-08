import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { useEffectAsync } from "../../reactHelper";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const items = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function LinkService({ label, itemLinked, handleCallBack }) {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [linked, setLinked] = useState();

  useEffectAsync(async () => {
    const tab = [];
    if (active) {
      if (itemLinked.Monday === 1) tab.push("Monday");
      if (itemLinked.Tuesday === 1) tab.push("Tuesday");
      if (itemLinked.Wednesday === 1) tab.push("Wednesday");
      if (itemLinked.Thursday === 1) tab.push("Thursday");
      if (itemLinked.Friday === 1) tab.push("Friday");
      if (itemLinked.Saturday === 1) tab.push("Saturday");
      if (itemLinked.Sunday === 1) tab.push("Sunday");
      setLinked(tab);
    }
  }, [active]);

  const onChange = async (event) => {
    const oldValue = linked;
    const newValue = event.target.value;
    if (!newValue.find((it) => it < 0)) {
      const results = [];
      newValue
        .filter((it) => !oldValue.includes(it))
        .forEach((added) => {
          //console.log("ADDED::", added);
          handleCallBack(added, 1);

          //  const body = {user:baseId,endpointAll:added}
          results.push(added);
        });
      oldValue
        .filter((it) => !newValue.includes(it))
        .forEach((removed) => {
          //console.log("REMOVED:", removed);
          handleCallBack(removed, 0);
          results.push(removed);
        });
      await Promise.all(results);
      setLinked(newValue);
    }
  };
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        open={open}
        onChange={onChange}
        onOpen={() => {
          setActive(true);
          setOpen(true);
        }}
        onClose={() => setOpen(false)}
        value={linked || []}
        multiple
        MenuProps={MenuProps}
      >
        {items
          ? items.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))
          : [...Array(3)].map((_, i) => (
              <MenuItem key={-i - 1} value={-i - 1}>
                <Skeleton
                  variant="text"
                  width={`${Math.floor(Math.random() * 30 + 30)}%`}
                />
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}
