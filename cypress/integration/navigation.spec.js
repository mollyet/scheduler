describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/")
    //works but can be refactored
    // cy.get("li").contains("Tuesday").click()
    // cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)")
    //refactored to be Less Bulky
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  })
});