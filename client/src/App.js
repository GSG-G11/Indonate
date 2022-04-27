import React, { useEffect } from 'react';
import store from './app/store';
import { getUserData } from './features/User';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return <div>Hello</div>;
}

export default App;
