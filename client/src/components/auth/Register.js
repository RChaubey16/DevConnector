import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  let navigate = useNavigate();
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
      setAlert(`Passwords do not match`, `danger`, 3000);
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return navigate("/dashboard");
  }

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
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChangeFormData(e)}
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => onChangeFormData(e)}
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Connects this react component with redux, to use the redux features.
// connect takes in 2 arguments -> 1. the state and 2. the action type you want to use (These action types will be available as "props.setAlert".)
export default connect(mapStateToProps, { setAlert, register })(Register);
