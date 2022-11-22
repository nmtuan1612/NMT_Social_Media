import { useState } from "react";
import "./LogIn.scss";

const SignUp = (props) => {
  const { switchForm } = props;

  const [formData, setFormData] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form action="" onSubmit={handleSubmit} className="info-form auth-form">
      <h3>Log in</h3>

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
          type="text"
          className="info-input"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
      </div>

      <div>
        <span className="info-text" onClick={switchForm}>
          Don't have an account. 
          <span style={{color: "var(--orange)"}}>{` Sign up`}</span>
        </span>
      </div>
      <button className="button info-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default SignUp;
