import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: ``,
    email: ``,
    password: ``,
    confirmPassword: ``,
  });

  const { name, email, password, confirmPassword } = formData;

  const onChangeFormData = (e) =>
    setFormData({
      ...formData,
      // [e.target.name] provides us the the name attribute of the tag and the value associated with it.
      // Example : name="email", will give us the object key as email ([e.target.name]) and the value (e.target.value) of it
      [e.target.name]: e.target.value,
    });

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log(`Passwords do not match`);
    } else {
      console.log(`SUCCESS`);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form
        className="form"
        action="create-profile.html"
        onSubmit={(e) => onFormSubmitHandler(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChangeFormData(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChangeFormData(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChangeFormData(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
