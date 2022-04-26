import React, { useEffect } from 'react';
import store from './app/store';
import { getUserData } from './features/User';
import Nav from './Components';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return <div className="App"><Nav /></div>;
}

export default App;
