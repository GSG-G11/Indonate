import React, { useEffect } from 'react';
import store from './app/store';
import { getUserData } from './features/User';
import Compaigns from './component/Campaigns';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      <Compaigns />
      {' '}
    </div>
  );
}

export default App;
