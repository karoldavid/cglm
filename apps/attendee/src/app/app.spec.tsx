import React from 'react';
import { render } from '@testing-library/react';

// import { BrowserRouter } from 'react-router-dom';

import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Auth from './auth/Auth';
import App from './app';

const history = createHistory();

const auth = new Auth(history);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Router history={history}>
        <Route
          render={(props) => {
            return <App auth={auth} {...props} />;
          }}
        />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });

  // it('should have a greeting as the title', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );

  //   expect(getByText('Welcome to attendee!')).toBeTruthy();
  // });
});
