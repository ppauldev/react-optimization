import { lorem } from "../../src/constants/text"

describe("<Fastest /> component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  })

  it("renders the component with lorem text and initial Info", () => {
    cy.get("[data-testid='info']").should("contain.text", "DOM Nodes:")
    cy.get("[data-testid='info']").should("contain.text", "Mount Time:")
    cy.contains(lorem.charAt(0)).should("be.visible")
  })

  it("highlights a character and updates the Info when clicked", () => {
    cy.contains(lorem.charAt(0)).click().should("have.css", "background-color", "rgb(221, 214, 254)")
  })

  it("toggles the highlight of a character when clicked again", () => {
    const firstChar = cy.contains(lorem.charAt(0))

    firstChar.click()
    firstChar.click().should("not.have.css", "background-color", "rgb(221, 214, 254)")
  })
})
