Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogappUser", JSON.stringify(body))
    cy.visit("http://localhost:3000")
  })
})

Cypress.Commands.add("createBlog", ({ content }) => {
  cy.request({
    url: "http://localhost:3001/api/notes",
    method: "POST",
    body: { content },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBoteappUser")).token
      }`,
    },
  })

  cy.visit("http://localhost:3000")
})