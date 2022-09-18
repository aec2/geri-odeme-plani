import * as React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { MainContext, useContext } from "../context";
import { PaybackPlanCalculator } from "../helpers/BusinessHelper.js";
import {
  maxMaturityDateErrorDemandCredit,
  minRealEstateLoanAmount,
  maxRealEstateLoanAmount,
  minPersonalFinanceLoanAmount,
  maxPersonalFinanceLoanAmount,
} from "../helpers/Constants";
import NumericInput from "./NumericInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserInputForm() {
  const {
    installmentCount,
    setInstallmentCount,
    totalAmount,
    loanType,
    setLoanType,
    installmentPaymentType,
    setInstallmentPaymentType,
    profit,
    setProfit,
    kkdf,
    setKkdf,
    bsmv,
    setBsmv,
    setPaybackPlanArray,
  } = useContext(MainContext);

  const [taxInputDisabled, setTaxInputDisabled] = useState(false);

  const notify = () =>
    toast.warn(maxMaturityDateErrorDemandCredit, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const fillTable = () => {
    if (loanType === "I" && installmentCount > 24) {
      setPaybackPlanArray([]);
      notify(); // notifies in case of personal credit loans payment period is more then 24
      return;
    }

    var paybackplan = PaybackPlanCalculator(
      profit,
      installmentCount,
      totalAmount,
      kkdf,
      bsmv,
      installmentPaymentType,
      loanType === "K"
    );
    setPaybackPlanArray(paybackplan);
  };

  return (
    <div>
      <Paper style={{ padding: 16 }}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={10} md={12}>
            <NumericInput
              autoFocus
              fullWidth
              label="Kredi Tutarı(Ana para)"
              margin="dense"
              name="totalAmount"
              value={totalAmount}
              error={
                (loanType === "I" &&
                  (totalAmount > maxPersonalFinanceLoanAmount ||
                    totalAmount < minPersonalFinanceLoanAmount)) ||
                (loanType === "K" &&
                  (totalAmount > maxRealEstateLoanAmount ||
                    totalAmount < minRealEstateLoanAmount))
              }
              helperText={
                loanType === "K"
                  ? `${minRealEstateLoanAmount} - ${maxRealEstateLoanAmount} TL arası bir tutar giriniz.`
                  : `${minPersonalFinanceLoanAmount} - ${maxPersonalFinanceLoanAmount} TL arası bir tutar giriniz.`
              }
            ></NumericInput>
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="preparation_time"
              fullWidth
              type="number"
              label="Taksit Sayısı"
              value={installmentCount}
              onChange={(e) => setInstallmentCount(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="profit_rate"
              fullWidth
              type="number"
              label="Kâr oranı"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="loan_type"
              fullWidth
              select
              value={loanType}
              label="Kredi Türü"
              onChange={(e) => {
                setLoanType(e.target.value);
                setTaxInputDisabled(e.target.value === "K");
              }}
            >
              <MenuItem value="K">Konut Kredisi</MenuItem>
              <MenuItem value="I">İhtiyaç Kredisi</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="installment_payment_range"
              fullWidth
              select
              value={installmentPaymentType}
              label="Taksit Aralığı"
              onChange={(e) => setInstallmentPaymentType(e.target.value)}
            >
              <MenuItem value={7}>Haftalık</MenuItem>
              <MenuItem value={30}>Aylık</MenuItem>
              <MenuItem value={365}>Yıllık</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="tax_rate_kkdf"
              fullWidth
              type="number"
              label="KKDF Oranı"
              value={kkdf}
              disabled={taxInputDisabled}
              onChange={(e) => setKkdf(e.target.value)}
            />
          </Grid>
          <Grid item xs={10} md={12}>
            <TextField
              required
              name="tax_rate_bsmv"
              fullWidth
              type="number"
              label="BSMV Oranı"
              value={bsmv}
              disabled={taxInputDisabled}
              onChange={(e) => setBsmv(e.target.value)}
            />
          </Grid>
          <Grid container justifyContent="flex-end" style={{ padding: 10 }}>
            <Button variant="contained" color="primary" onClick={fillTable}>
              Geri Ödeme Planı Oluştur
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
