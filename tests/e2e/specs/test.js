// https://docs.cypress.io/api/introduction/api.html

import { container } from "../../../src/services/container.ts";

describe("Login Form Test", () => {
  it("Login button", () => {
    cy.visit("/login");
    cy.contains("button", "Login");
  });
});

describe("H1 test", () => {
  beforeEach(() => {
    container.dep = "1.2";
  });

  it("text", () => {
    cy.visit("/");
    cy.contains("h1", "1.2.3");
  });
});
