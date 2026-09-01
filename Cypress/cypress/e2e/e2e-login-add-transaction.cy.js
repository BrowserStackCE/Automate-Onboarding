describe('E2E: Add to Cart and Checkout on BStackDemo', () => {
  it('should add a product to cart and complete checkout', () => {
    // Step 1: Visit the homepage
    cy.visit('/', { failOnStatusCode: false, timeout: 120000 })
    cy.get('h3', { timeout: 30000 }).contains('25 Product(s) found.').should('be.visible')

    // Step 2: Add iPhone 12 to cart (product id="1")
    cy.get('.shelf-item[id="1"] .shelf-item__buy-btn').click()

    // Step 3: Verify cart opens
    cy.get('.float-cart--open').should('be.visible')

    // Step 4: Click Checkout button in cart
    cy.get('.float-cart--open .buy-btn').click()

    // Step 5: Sign in - select username (demouser)
    cy.get('#react-select-2-input').click({ force: true })
    cy.get('#react-select-2-option-0-0').click()

    // Step 6: Select password (testingisfun99)
    cy.get('#react-select-3-input').click({ force: true })
    cy.get('#react-select-3-option-0-0').click()

    // Step 7: Click LOG IN
    cy.get('#login-btn').click()

    // Step 8: Fill shipping details
    cy.get('#firstNameInput').should('be.visible').type('Test')
    cy.get('#lastNameInput').type('User')
    cy.get('#addressLine1Input').type('123 Test Street')
    cy.get('#provinceInput').type('CA')
    cy.get('#postCodeInput').type('12345')

    // Step 9: Submit shipping form
    cy.get('#checkout-shipping-continue').click()

    // Step 10: Verify order confirmation page
    cy.url().should('include', '/confirmation')
    cy.contains('Continue Shopping').should('be.visible')
  })
})
