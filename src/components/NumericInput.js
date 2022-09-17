import React, { useImperativeHandle, useRef } from "react";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { NumericFormat } from "react-number-format";
import { MainContext, useContext } from "../context";

function NumericInput(props) {
  const { value = "", handleChange = () => {}, ...params } = props;

  const { setTotalAmount } = useContext(MainContext);

  return (
    <NumericFormat
      value={value}
      decimalScale={2}
      decimalSeparator={","}
      thousandSeparator={"."}
      onValueChange={(values) => {
        handleChange(setTotalAmount(values.floatValue));
      }}
      customInput={TextField}
      InputProps={{
        endAdornment: <InputAdornment position="end">₺</InputAdornment>,
      }}
      required
      {...params}
    />
  );
}

export default NumericInput;
