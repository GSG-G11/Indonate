import React, { useEffect } from 'react';
import Cards from './components/cards';
// import SignUp from './Component/signup';
// import Signin from './components/signin';
import Header from './components/HeaderAllCampaines/index';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      {/* <SignUp /> */}
      <Header />
      <Cards />

    </div>
  );
}
export default App;
