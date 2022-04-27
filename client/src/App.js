import React, { useEffect } from 'react';
// import SignUp from './Component/signup';
import Signin from './Component/signin';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      {/* <SignUp /> */}
      <Signin />
    </div>
  );
}
export default App;
