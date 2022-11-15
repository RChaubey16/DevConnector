import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: ``,
    password: ``,
  });

  const { email, password } = formData;

  const onChangeFormData = (e) =>
    setFormData({
      ...formData,
      // [e.target.name] provides us the the name attribute of the tag and the value associated with it.
      // Example : name="email", will give us the object key as email ([e.target.name]) and the value (e.target.value) of it
      [e.target.name]: e.target.value,
    });

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(`SUCCESS`, formData);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onFormSubmitHandler(e)}
      >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChangeFormData(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChangeFormData(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
