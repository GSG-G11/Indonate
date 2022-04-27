import React, { useEffect } from 'react';
// import SignUp from './Component/signUp';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';
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
