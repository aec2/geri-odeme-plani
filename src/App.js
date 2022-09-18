import { React, useState } from "react";
import { MainContext } from "./context/context";
import { Grid } from "@mui/material";
import UserInputForm from "./components/UserInputForm.js";
import PayBackPlanTable from "./components/PayBackPlanTable.js";
import ApplicationBar from "./components/ApplicationBar.js";
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

  return (
    <MainContext.Provider value={data}>
      <div className="App">
        <Grid container>
          <ApplicationBar></ApplicationBar>
          <Grid
            spacing={2}
            container
            style={{ padding: 16, margin: "auto", maxWidth: "95%" }}
          >
            <Grid item xs={3}>
              <UserInputForm></UserInputForm>
            </Grid>
            <br></br>
            <Grid item xs={9}>
              <PayBackPlanTable></PayBackPlanTable>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MainContext.Provider>
  );
}

export default App;
