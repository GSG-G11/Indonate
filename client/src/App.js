import React, { useEffect } from 'react';
import store from './app/store';
import OurMission from './components/OurMission';
import { getUserData } from './features/User';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return <div className="App"><OurMission /></div>;
}

export default App;
