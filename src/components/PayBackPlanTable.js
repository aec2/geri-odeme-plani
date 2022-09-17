import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { MainContext, useContext } from "../context";

function createData2(
  installmentCount,
  installmentAmount,
  totalAmount,
  remainingTotalAmountDebt,
  profit,
  kkdf,
  bsmv
) {
  return {
    installmentCount,
    installmentAmount,
    totalAmount,
    remainingTotalAmountDebt,
    profit,
    kkdf,
    bsmv,
  };
}

export default function PayBackPlanTable() {
  const { paybackPlanArray } = useContext(MainContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Taksit No</TableCell>
            <TableCell align="left">Taksit Tutarı&nbsp;(₺)</TableCell>
            <TableCell align="left">Ana Para&nbsp;(₺)</TableCell>
            <TableCell align="left">Kalan Ana Para&nbsp;(₺)</TableCell>
            <TableCell align="left">Kâr Tutarı&nbsp;(₺)</TableCell>
            <TableCell align="left">KKDF&nbsp;(₺)</TableCell>
            <TableCell align="left">BSMV&nbsp;(₺)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paybackPlanArray.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.InstallmentCount}
              </TableCell>
              <TableCell align="left">{row.installmentAmount}</TableCell>
              <TableCell align="left">{row.installmentPrincipal}</TableCell>
              <TableCell align="left">{row.remainingPrincipal}</TableCell>
              <TableCell align="left">{row.profit}</TableCell>
              <TableCell align="left">{row.kkdf}</TableCell>
              <TableCell align="left">{row.bsmv}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}