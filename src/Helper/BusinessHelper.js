const PaybackPlanCalculator = function (
  rate,
  periods,
  present,
  kkdf,
  bsmv,
  installmentPaymentType,
  isExempted = false
) {
  let paybackPlan = [];

  let installmentAmount = Number(
    InstallmentAmountCalculator(
      rate,
      periods,
      present,
      kkdf,
      bsmv,
      installmentPaymentType,
      isExempted
    ).toFixed(2)
  );
  let principal = present;
  for (let i = 1; i <= periods; i++) {
    let installment = {};
    installment.InstallmentCount = i;
    installment.installmentAmount = installmentAmount;
    installment.profit = Number(
      (principal * rate * (installmentPaymentType / 30)).toFixed(2)
    );
    if (!isExempted) {
      installment.kkdf = Number((installment.profit * kkdf).toFixed(2));
      installment.bsmv = Number((installment.profit * bsmv).toFixed(2));
    } else {
      installment.kkdf = 0;
      installment.bsmv = 0;
    }
    installment.installmentPrincipal = Number(
      (
        installmentAmount -
        (installment.profit + installment.kkdf + installment.bsmv)
      ).toFixed(2)
    );
    principal = principal - installment.installmentPrincipal;
    installment.remainingPrincipal = Number(principal.toFixed(2));
    if (i === Number(periods)) {
      installment.remainingPrincipal = 0;
      installment.installmentPrincipal =
        paybackPlan[paybackPlan.length - 1].remainingPrincipal;
      installment.installmentAmount = Number(
        (
          installment.installmentPrincipal +
          installment.profit +
          installment.kkdf +
          installment.bsmv
        ).toFixed(2)
      );
    }
    paybackPlan.push(installment);
  }
  return paybackPlan;
};

const InstallmentAmountCalculator = function (
  rate,
  periods,
  present,
  kkdf,
  bsmv,
  installmentPaymentType,
  isExempted
) {
  if (!isExempted) {
    rate = rate * (installmentPaymentType / 30) * (1 + kkdf + bsmv);
  }
  var future = 0;
  var type = 0;

  if (rate === 0) {
    return (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      return (
        ((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)) /
        (1 + rate)
      );
    } else {
      return (future * rate) / (term - 1) + (present * rate) / (1 - 1 / term);
    }
  }
};

export { PaybackPlanCalculator, InstallmentAmountCalculator };
