import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Createprofile from "./components/profile-forms/Createprofile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Posts from "./components/posts/Posts";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/profiles" exact element={<Profiles />} />
              <Route path="/profile/:id" exact element={<Profile />} />
              <Route
                path="/dashboard"
                exact
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-profile"
                exact
                element={
                  <PrivateRoute>
                    <Createprofile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                exact
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-experience"
                exact
                element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-education"
                exact
                element={
                  <PrivateRoute>
                    <AddEducation />
                  </PrivateRoute>
                }
              />
              <Route
                path="/posts"
                exact
                element={
                  <PrivateRoute>
                    <Posts />
                  </PrivateRoute>
                }
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
