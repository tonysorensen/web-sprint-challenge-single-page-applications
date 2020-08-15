describe("Testing form inputs", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });
  it("adding text to inputs and submitting the form", () => {
    //test for name
    cy.get("[data-cy=name]")
      .type("Tony Sorensen")
      .should("have.value", "Tony Sorensen");
    cy.get("[data-cy=size]").select("medium").should("have.value", "medium");
    cy.get("[data-cy=Pepperoni]").check().should("be.checked");
    cy.get("[data-cy=Sausage]").check().should("be.checked");
    cy.get("[data-cy=instructions]")
      .type("These are the instructions.")
      .should("have.value", "These are the instructions.");
    cy.get("[data-cy=submit]").click();
  });
});
