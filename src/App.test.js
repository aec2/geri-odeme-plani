import { render, screen } from "@testing-library/react";
import App from "./App";

test("Appbar renders correctly", () => {
  const { debug, container } = render(<App />);

  const targetEl = screen.getByText("Fimple Practicum");
  expect(targetEl).toBeInTheDocument();
});


test("Paybackplan function works correctly", () => {
    
})