// https://docs.cypress.io/api/introduction/api.html

// describe('My First Test', () => {
//   it('Visits the app root url', () => {
//     cy.visit('/')
//     cy.contains('h1', 'Welcome to Your Vue.js App')
//   })
// })

describe('端对端测试', () => {
  it('title测试', () => {
    cy.visit('/')
    cy.contains('#message', '文案')
    cy.get('button').click()
    cy.contains('#message', '点击文案')
  })
})
