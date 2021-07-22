describe("Blog list app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.login({
      username: "testi",
      password: "testi",
    })
  })

  it("front page can be opened", function () {
    cy.contains("BlogList")
    cy.contains("Login")
  })

  it("login form is shown", function () {
    cy.contains("Login")
    cy.get("#login-button").should("be.visible")
  })

  it("successful log in", function () {
    cy.get("#logout-button").click()
    cy.get("#username").type("testi")
    cy.get("#password").type("testi")
    cy.get("#login-button").click()

    cy.contains("logged-in")
  })
  it("invalid login credentials", function () {
    cy.get("#logout-button").click()

    cy.get("#username").type("ei olemassa")
    cy.get("#password").type("ei olemassa")
    cy.get("#login-button").click()

    cy.contains("Login")
  })

  describe("when logged in", function () {
    it("A blog can be created", function () {
      cy.createBlog("test blog that should exist", "teemu", "test.com")
      cy.contains("test blog that should exist")
    })
    describe("a blog exists", function () {
      beforeEach(function () {
        cy.createBlog("test 1", "teemu", "test.com")
      })
      it("A blog can be liked", function () {
        cy.contains("view").click()
        cy.get("#likeButton").click()
        cy.reload()
        cy.contains("view").click()
        cy.contains("likes 1")
      })
      it("A blog can be deleted by owner", function () {
        cy.contains("view").click()
        cy.get("#removeButton").click()
        cy.reload()
        cy.contains("test blog").should("not.exist")
      })

      describe("multiple blogs exist", function () {
        beforeEach(function () {
          cy.createBlog("test 2", "teemu", "test.com")
          cy.createBlog("test 3", "teemu", "test.com")
        })
        it("blogs are ordered by likes", function () {
          cy.contains("view").each(($el) => {
            cy.wrap($el).click()
            cy.get("#likeButton").click()
          })
          cy.get("#likeButton").each(($el, index) => {
            for (let i = index; i--; ) {
              cy.wrap($el).click()
            }
          })
          cy.get("#blog:first").should("contain", "test 3 teemu")

          cy.get("#blog:last").last().should("contain", "test 1 teemu")
        })
      })
    })
  })
})
