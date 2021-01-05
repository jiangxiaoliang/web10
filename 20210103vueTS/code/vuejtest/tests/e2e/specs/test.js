// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', async () => {
    cy.visit('/')
    cy.contains('h1', 'Welcome to Your Vue.js App')
    // cy.contains('span', '中文')
    // cy.get('button').click()
    // cy.contains('span', '按钮点击')
  })
})
