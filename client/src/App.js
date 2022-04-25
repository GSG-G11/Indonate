import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from './app/store';
import { getUserData } from './features/User';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
    return () => {

    };
  }, []);
  const user = useSelector((state) => state.userReducer);
  console.log(user);
  return <div className="App">Hello World</div>;
}

export default App;
