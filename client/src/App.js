import React, { useEffect } from 'react';
import store from './app/store';
import Campaign from './component/campaign';
import { getUserData } from './features/User';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return <Campaign />;
}

export default App;
