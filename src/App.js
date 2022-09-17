import { React, useState, useRef } from "react";
import { MainContext } from "./context";
import {
  AppBar,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import UserInputForm from "./components/UserInputForm.js";
import PayBackPlanTable from "./components/PayBackPlanTable.js";
import ModalInfo from "./components/ModalInfo.js";
import { format } from "date-fns";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import "./App.css";

function App() {
  const [installmentCount, setInstallmentCount] = useState(0);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loanType, setLoanType] = useState("I");
  const [installmentPaymentType, setInstallmentPaymentType] = useState(30);
  const [remainingTotalAmountDebt, setRemainingTotalAmountDebt] = useState(0);
  const [profit, setProfit] = useState(0.0228);
  const [kkdf, setKkdf] = useState(0.15);
  const [bsmv, setBsmv] = useState(0.1);
  const [paybackPlanArray, setPaybackPlanArray] = useState([]);

  const data = {
    installmentCount,
    setInstallmentCount,
    installmentAmount,
    setInstallmentAmount,
    totalAmount,
    loanType,
    setLoanType,
    setTotalAmount,
    remainingTotalAmountDebt,
    setRemainingTotalAmountDebt,
    installmentPaymentType,
    setInstallmentPaymentType,
    profit,
    setProfit,
    kkdf,
    setKkdf,
    bsmv,
    setBsmv,
    paybackPlanArray,
    setPaybackPlanArray,
  };

  const modalRef = useRef();

  return (
    <MainContext.Provider value={data}>
      <div className="App">
        <Grid container>
          <ModalInfo ref={modalRef}></ModalInfo>
          <AppBar
            style={{ background: "rgb(0 0 0 / 23%)" }}
            position="relative"
          >
            <Toolbar variant="dense">
              <Box
                component="img"
                sx={{
                  height: "80%",
                  width: "100%",
                  maxHeight: { xs: 22, md: 25 },
                  maxWidth: { xs: 22, md: 25 },
                }}
                src="./imgs/fimple_icon.png"
              ></Box>
              <Typography style={{ marginLeft: "10px" }} variant="h6">
                Fimple Practicum
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => modalRef.current.handleOpen()}
                >
                  <InfoRoundedIcon />
                </IconButton>
              </Box>
              <Box align="right">
                <Typography> {format(new Date(), "P")}</Typography>
              </Box>
            </Toolbar>
          </AppBar>
          {/* <Typography variant="h3" style={{ padding: 15, color: "White" }}>
          Geri Ödeme Planı
        </Typography> */}
          <Grid
            spacing={2}
            container
            style={{ padding: 16, margin: "auto", maxWidth: "95%" }}
          >
            <Grid item xs={3}>
              <Paper>
                <UserInputForm></UserInputForm>
              </Paper>
            </Grid>
            <br></br>
            <Grid item xs={9}>
              <Paper>
                <PayBackPlanTable></PayBackPlanTable>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MainContext.Provider>
  );
}

export default App;
