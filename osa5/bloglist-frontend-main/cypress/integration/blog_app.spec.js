import cy from "cypress"

describe("Blog list app", function () {
  beforeEach(function () {
    cy.login({
      username: "testi",
      password: "testi",
    })
  })

  it("front page can be opened", function () {
    cy.contains("BlogList")
    cy.contains("Login")
  })

  it("login form can be opened", function () {
    cy.contains("log in").click()
  })

  it("user can log in", function () {
    cy.contains("log in").click()
    cy.get("#username").type("mluukkai")
    cy.get("#password").type("salainen")
    cy.get("#login-button").click()

    cy.contains("Matti Luukkainen logged in")
  })
  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("log in").click()
      cy.get("input:first").type("testi")
      cy.get("input:last").type("salainen")
      cy.get("#login-button").click()
    })
    describe("a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          content: { title: "test", author: "teemu", url: "test.com" },
        })
      })
    })
  })
})
