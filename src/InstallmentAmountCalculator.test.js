import { InstallmentAmountCalculator } from "./Helper/BusinessHelper";

describe("Taksit Testi", () => {
  it("return installment amount correctly for monthly payment", () => {
    let res = Number(
      InstallmentAmountCalculator(
        0.0228,
        12,
        100000,
        0.15,
        0.1,
        30,
        false
      ).toFixed(2)
    );
    expect(res).toEqual(9956.46);
  });
});
