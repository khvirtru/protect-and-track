import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from 'components/Header/Header';
import AuthSelect from 'scenes/AuthSelect/AuthSelect';
import Drop from 'scenes/Drop/Drop';
import UserSelect from 'scenes/UserSelect/UserSelect';
import { getAppIdBundle } from 'api/accounts';
import Store from '../../store';

/**
 * An SDK Share App.
 * This will have several children:
 *  - an authorization panel, for selecting the current entity and assigning an entity token
 *  - A TDF details panel, for displaying information about an encrypted object
 *  - An Dev panel, for details about:
 *     + what API methods are invoked
 *     + audit events for the policy
 *  - Additional helper text and overlays
 *  - share panel?
 */
function App() {
  const store = Store.useStore();
  const appIdBundle = store.get('appIdBundle');

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    async function login() {
      const appIdBundle = await getAppIdBundle();
      store.set('appIdBundle')(appIdBundle);
    }
    if (!appIdBundle) {
      login();
    }
  });

  if (!appIdBundle) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  return (
    <>
      <Header />
      <main className="main">
        <Router>
          <Route
            path="/"
            component={({ location }) => {
              const params = new URLSearchParams(location.search);
              return <Drop userId={params.get('id') || appIdBundle[0].userId} />;
            }}
          />
          {/* TODO(dmihalcik): <Route 404 /> */}
        </Router>
      </main>
    </>
  );
}

export default App;
