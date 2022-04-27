import React, { useEffect } from 'react';
import AllCampaines from './components/allCampaines';
// import SignUp from './Component/signup';
// import Signin from './components/signin';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      {/* <SignUp /> */}
      <AllCampaines />
    </div>
  );
}
export default App;
