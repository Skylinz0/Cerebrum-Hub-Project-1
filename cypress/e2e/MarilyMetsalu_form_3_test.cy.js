beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
//Workshop #8 add visual tests for registration form 3
/*
Task list:
* Create first test suite for visual tests
* Create tests to verify visual parts of the page:
    * radio button and its content 
    * dropdown and dependencies between 2 dropdowns
    * checkbox, its content and link in it
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('This is my test Logo', () => {
        
        cy.log('Marily checks logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100)           

        
    });
    it('Check email format', () => {
        //Checking what happens if I put wrong email       
        cy.get('.email').type('onetes.termail.ee')
        cy.get('#emailAlert').should('contain','Invalid email address.')
        cy.get('.email').clear()
        //Checking if email is required                             
        cy.get('.email').type('marilytest@mail.com').clear()      
        cy.get('#emailAlert').should('contain','Email is required.')
        //Filling emai filed       
        cy.get('.email').type('marilytest@mail.com')

    
    });
    
    it('Check if country and city dropdown works', () => {
        // Country dropbox check
        cy.get('#country').children().should('have.length', 4)
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').eq(1).should('have.text','Spain')
        cy.get('#country').find('option').eq(2).should('have.text','Estonia')
        cy.get('#country').find('option').eq(3).should('have.text','Austria')

        // Spain and City dropbox check
        cy.get('#country').select('Spain')
        cy.get('#city').children().should('have.length', 5)        
        cy.get('#city').find('option').eq(1).should('have.text','Malaga')
        cy.get('#city').find('option').eq(2).should('have.text','Madrid')
        cy.get('#city').find('option').eq(3).should('have.text','Valencia')
        cy.get('#city').find('option').eq(4).should('have.text','Corralejo')

        // Estonia and City dropbox check
        cy.get('#country').select('Estonia')       
        cy.get('#city').children().should('have.length', 4)        
        cy.get('#city').find('option').eq(1).should('have.text','Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text','Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text','Tartu')

        // Austra and City dropbox check
        cy.get('#country').select('Austria')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#city').find('option').eq(1).should('have.text','Vienna')
        cy.get('#city').find('option').eq(2).should('have.text','Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text','Innsbruck')


       
        
    });
    it('Check Date of Brith format', () => {

        cy.get(':nth-child(8) > input').type('2022-11-01')
        cy.get(':nth-child(8) > input').clear()
        cy.get(':nth-child(8) > input').type('1836-11-01') // Possbile to go to past dates
        cy.get(':nth-child(8) > input').clear()
        cy.get(':nth-child(8) > input').type('2052-11-01') // Possbile to go to future dates
        
    });

    it('Check that radio button Newsletter list is correct', () => {
        // Array has totally 4 elements      
        cy.get('input[type="radio"]').should('have.length', 4)
        //
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never').and('not.be.checked')

        // Selecting one will remove selection from other radio button

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(2).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
            
    });

    it('Check Birthday format', () => {

        cy.get('#birthday').type('2022-11-01')
        cy.get('#birthday').clear()
        cy.get('#birthday').type('1799-12-02') // Dates can go very far in past
        cy.get('#birthday').clear()
        cy.get('#birthday').type('2025-10-01') // Dates can go very far in future
        
    });

    it('Policy checkbox test', () => {
        //Checkbox nr 1
        cy.get(':nth-child(15)').should('contain','Accept our privacy policy')        
        cy.get(':nth-child(15) > .ng-pristine').check().and('be.checked')              
        // Checkbox nr 2              
        cy.get('a').should('contain','Accept our cookie policy')        
        cy.get(':nth-child(15) > :nth-child(2)').check().and('be.checked')
        // Checking link in button             
        cy.get('button').should('be.visible').click()       
        // Check that currently opened URL is value:      
        cy.url().should('contain', 'cookiePolicy.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 3')

        
    });



})

//Workshop #9 add functional tests for registration form 3
/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (use function)
    * If city is already chosen and country is updated, then city choice should be removed
    * Bonus task: add file (google yourself for solution)
* Rename file registration_form_3_test.cy.js to contain your name - JohnSmith_form_3_test.cy.js and upload your individual result to  team confluence
 */

describe('Second test suite for functional tests', () => {
    it('Add all the fields', () => {
        //Name
        cy.get('#name').clear().type('Marily')
        //Email
        cy.get('.email').type('marilytest@mail.com') 
        //Country and City
        cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3');
        cy.get('#city').select('Valencia');
        //Date of Birth
        cy.get(':nth-child(8) > input').type('2022-11-05')
        //Newsletter        
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        //Bithday
        cy.get('#birthday').type('2022-11-05')
        //Policy buttons
        cy.get(':nth-child(15) >.ng-pristine').check().and('be.checked')
        cy.get(':nth-child(15) > :nth-child(2)').check().and('be.checked')           
        //Submit
        cy.get(':nth-child(2) > input').click()
        cy.get('h1').should('have.text', 'Submission received')
        cy.go('back')          
                            
    });
    it('Mandatory fields are filled', () => {  
        //Email      
        cy.get('.email').type('marilytest@mail.com')
        //Country and City
        cy.get('#country').select('Spain').invoke('val').should('eq', 'object:3');
        cy.get('#city').select('Valencia');
        //Birthday
        cy.get('#birthday').type('2022-11-05')
        // Policy checkboxes
        cy.get(':nth-child(15) >.ng-pristine').check().and('be.checked')
        cy.get(':nth-child(15) > :nth-child(2)').check().and('be.checked')
        //Submit
        cy.get(':nth-child(2) > input').click()
        cy.get('h1').should('have.text', 'Submission received')
        
                 
        
    });

    it('Mandatory fields are absent(function)', () => {
         
        inputField();       
                           
               
    });

    it('City is already chosen and country is updated, then city choice should be removed', () => {
        cy.get('#country').select('Austria').invoke('val').should('eq', 'object:5');
        cy.get('#city').select('Vienna');
        cy.get('#country').select('Estonia').invoke('val').should('eq', 'object:4');
        cy.get('#city').should('not.be.selected');

        
    });
    it('Check if uploading file is successful', () => {       

        cy.get('#myFile').selectFile('cypress/fixtures/cypress_logo.png')
        cy.get('#myFile').click()         
        cy.get('.w3-container >[type="submit"]').click()
        cy.get('h1').should('have.text', 'Submission received')

        


        
    });

});

function inputField() { 
    //Name
    cy.get('#name').clear().type('Marily')
    // Date of Birth
    cy.get(':nth-child(8) > input').type('2022-11-05')
    // Newsletter "Weekly"
    cy.get('input[type="radio"]').eq(1).check().should('be.checked')
    // Policy checkboxes
    cy.get(':nth-child(15) >.ng-pristine').check().and('be.checked')
    cy.get(':nth-child(2) > input').should('be.disabled')  
         
 


    
}