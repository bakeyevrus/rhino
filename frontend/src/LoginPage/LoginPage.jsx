import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Alert
} from 'reactstrap';
import { authActions } from '../actions';
import LoginCard from './LoginCard';
import SignupCard from './SignupCard';

class LoginPage extends Component {
  static defaultProps = {
    authenticating: false,
    errMessage: null
  };

  state = {
    loginForm: {
      email: '',
      password: ''
    },
    signupForm: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  };

  handleLoginChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState(prevState => ({
      loginForm: {
        ...prevState.loginForm,
        [name]: value
      }
    }));
  };

  handleLoginSubmit = () => {
    const { login } = this.props;
    const { loginForm } = this.state;
    const { email, password } = loginForm;
    login(email, password);
  };

  handleSignupChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState(prevState => ({
      signupForm: {
        ...prevState.signupForm,
        [name]: value
      }
    }));
  };

  handleSignupSubmit = () => {
    const { register } = this.props;
    const { signupForm } = this.state;
    const {
      firstName, lastName, email, password
    } = signupForm;

    register({
      firstName,
      lastName,
      email,
      password
    });
  };

  render() {
    const { loginForm, signupForm } = this.state;
    const { authenticating, errMessage } = this.props;

    return (
      <Container fluid>
        <Row>
          <Col>
            <Alert color="danger" isOpen={errMessage != null} fade={false}>
              {errMessage}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col xs={8} sm={6}>
            <LoginCard
              authenticating={authenticating}
              email={loginForm.email}
              password={loginForm.password}
              onChange={this.handleLoginChange}
              onSubmit={this.handleLoginSubmit}
            />
          </Col>
          <Col xs={8} sm={6}>
            <SignupCard
              authenticating={authenticating}
              firstName={signupForm.firstName}
              lastName={signupForm.lastName}
              email={signupForm.email}
              password={signupForm.password}
              onChange={this.handleSignupChange}
              onSubmit={this.handleSignupSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  authenticating: PropTypes.bool,
  errMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { authenticating, errMessage } = state.auth;
  return {
    authenticating,
    errMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(authActions.login(email, password)),
    register: user => dispatch(authActions.register(user))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
