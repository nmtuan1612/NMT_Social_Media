import { useState } from "react";
import "./SignUp.scss";

const SignUp = (props) => {
  const { switchForm } = props;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassStatus, setConfirmPassStatus] = useState(true);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmPassStatus(false);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit} className="info-form auth-form">
      <h3>Sign up</h3>

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
        <input
          type="password"
          className="info-input"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
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
          Already have an account.{" "}
          <span style={{ color: "var(--orange)" }}>{` Login`}</span>
        </span>
      </div>
      <button className="button info-btn" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
