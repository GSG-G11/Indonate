import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav,
  SignUp,
  Signin,
  Review,
  ReportsForm,
} from './components';
import Campaign from './components/common/campaignCard';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              {/* our mission */}
              <Campaign loading={false} id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />
              <Campaign loading id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />

              <Campaign loading id={1} title="Help the people in need" description="we give the best offers to people in need to provide them with the best life anyone could live." imgSrc="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" categoryIcon="https://i.ibb.co/xsCwNkK/image-3.png" />

              <Review />
              <ReportsForm />
            </>
          )}
        />
        <Route
          path="/campaigns"
          element={
            <h1>campaigns</h1>
            }
        />
        <Route
          path="/campaign/:id"
          element={
            <h1>campaign</h1>
            }
        />
        <Route
          path="/signUp"
          element={
            <SignUp />
            }
        />
        <Route
          path="/login"
          element={(
            <Signin />
          )}
        />
      </Routes>
    </Router>
  );
}
export default App;
