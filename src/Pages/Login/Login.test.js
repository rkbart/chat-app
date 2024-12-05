import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders email input", () => {
  render(<Login onLogin={() => {}} />);

  // Check if the email input is rendered
  const emailInput = screen.getByLabelText(/email/i); // Matches 'email' label
  expect(emailInput).toBeTruthy();
});

test("renders password input", () => {
  render(<Login onLogin={() => {}} />);

  // Check if the password input is rendered
  const passwordInput = screen.getByLabelText(/password/i); // Matches 'password' label
  expect(passwordInput).toBeTruthy();
});


test("renders Log In button", () => {
  render(<Login onLogin={() => {}} />);

  // Check if the Log In button is rendered
  const logInButton = screen.getByText(/log in/i);
  expect(logInButton).toBeInTheDocument();
});

test("renders switch between Sign Up and Log In", () => {
  render(<Login onLogin={() => {}} />);

  // Check if the Sign Up text is displayed
  const signUpText = screen.getByText(/don't have an account\?/i);
  expect(signUpText).toBeInTheDocument();

  // Switch to Sign Up mode
  const signUpLink = screen.getByText(/sign up/i);
  signUpLink.click(); // Simulates a user clicking to switch to Sign Up mode

  // After clicking, check if "Already have an account?" text appears
  const alreadyHaveAccountText = screen.getByText(/already have an account\?/i);
  expect(alreadyHaveAccountText).toBeInTheDocument();
});
