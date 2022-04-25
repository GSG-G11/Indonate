import React, { useEffect } from 'react';
import SignUp from './Component/signUp';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      <SignUp />
    </div>
  );
}

export default App;
