import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import './styles.css';

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="form-container">
        <center><h1>Login</h1></center>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange} />
          </Form.Group >
          <Form.Group  controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password" />
          </Form.Group >
          <Button
            block
            disabled={!this.validateForm()}
            type="submit" >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
