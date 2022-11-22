import { useState } from "react";
import "./Auth.scss";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from '../../redux/actions/AuthAction';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassStatus, setConfirmPassStatus] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.authReducer)

  const resetForm = () => {
    setConfirmPassStatus(true);
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const switchForm = () => {
    setIsSignUp((prev) => !prev);
    resetForm();
  };

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword") {
      setConfirmPassStatus(true);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      formData.password === formData.confirmPassword ? dispatch(signUp(formData)) : setConfirmPassStatus(false);
    } else {
      dispatch(logIn(formData));
    }
  };

  return (
    <div className="Auth">
      {/* Left side */}
      <div className="auth-left">
        <img src={Logo} alt="logo" />
        <div className="web-name">
          <h1>NMT Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right side */}
      <div className="auth-right">
        {/* {isSignUp ? (
          <SignUp switchForm={switchForm} />
        ) : (
          <LogIn switchForm={switchForm} />
        )} */}
        <form action="" onSubmit={handleSubmit} className="info-form auth-form">
          <h3>{isSignUp ? "Sign up" : "Log in"}</h3>

          {isSignUp && (
            <div className="input-group">
              <input
                type="text"
                className="info-input"
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
                value={formData.firstName}
              />
              <input
                type="text"
                className="info-input"
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="text"
              className="info-input"
              name="userName"
              placeholder="User name"
              onChange={handleChange}
              value={formData.userName}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="info-input"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="info-input"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPassStatus ? "none" : "block",
              color: "red",
              fontSize: 12,
              alignSelf: "flex-end",
            }}
          >
            * Confirm password is not same
          </span>

          <div>
            <span className="info-text" onClick={switchForm}>
              {isSignUp ? (
                <>
                  Already have an account.{" "}
                  <span style={{ color: "var(--orange)" }}>{` Login`}</span>
                </>
              ) : (
                <>
                  Don't have an account.
                  <span style={{ color: "var(--orange)" }}>{` Sign up`}</span>
                </>
              )}
            </span>
          </div>

          <button className="button info-btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
