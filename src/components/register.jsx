import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", firstName: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    firstName: Joi.string().required().label("FirstName"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("firstName", "FirstName")}
          {this.renderButton(`Register`)}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
