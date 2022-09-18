/**
 * Calculates paybackplan table.
 *
 * @param {float}     rate -->  profit rate (depends on installementType)
 * @param {int}       periods --> a particular length of time of a payment
 * @param {int}       present --> total amount that client requests
 * @param {float}     kkdf    --> certain tax rate
 * @param {float}     bsmv    --> certain tax rate
 * @param {int}       installmentPaymentType --> weekly, monthly, yearly payment types
 * @param {boolean}   isExempted --> whether it is a personal loan or real estate loan
 *
 * @return {array of object} --> Returns rows of paybackplan table
 */
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
  let principal = present; // total amount
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

/**
 * Calculates installment amount to be used in paybackplan.
 *
 * @param {float}     rate -->  profit rate (depends on installementType)
 * @param {int}       periods --> a particular length of time of a payment
 * @param {int}       present --> total amount that client requests
 * @param {float}     kkdf    --> certain tax rate
 * @param {float}     bsmv    --> certain tax rate
 * @param {int}       installmentPaymentType --> weekly, monthly, yearly payment types
 * @param {boolean}   isExempted --> whether it is a personal loan or real estate loan
 *
 * @return {float} --> Returns value of installment amount.
 */
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

  if (rate === 0) {
    return present / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    return (present * rate) / (1 - 1 / term);
  }
};

export { PaybackPlanCalculator, InstallmentAmountCalculator };
