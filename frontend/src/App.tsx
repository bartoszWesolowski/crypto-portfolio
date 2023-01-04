import { useEffect, useState } from 'react';
import './App.css';
import { Navigation } from './containers/Navigation';
import { FlexboxGrid, Header, Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import AppRoutes from './Routes';
import { AppContext } from './contextLib';
import { Auth } from 'aws-amplify';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        console.error(e);
      }
    }
    console.log('checking current session finished');
    setIsAuthenticating(false);
  }
  const AppLoader = () => {
    return (
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={4}>
          <Loader size="lg" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
  };

  const AppContent = () => {
    return (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Header>
          <Navigation />
        </Header>
        <AppRoutes />
      </AppContext.Provider>
    );
  };
  return isAuthenticating ? <AppLoader /> : <AppContent />;
}

export default App;
