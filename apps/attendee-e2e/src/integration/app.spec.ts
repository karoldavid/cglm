import { getLoginMessage } from '../support/app.po';

describe('attendee', () => {
  beforeEach(() => cy.visit('/'));

  it('should display login message', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getLoginMessage().contains('Please log in');
  });
});
