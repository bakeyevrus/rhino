import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input
} from 'reactstrap';

export default function SignupCard({
  firstName,
  lastName,
  email,
  password,
  onChange,
  onSubmit,
  authenticating
}) {
  const formRef = React.createRef();

  function handleSignup(event) {
    event.preventDefault();
    if (authenticating) {
      return;
    }

    if (!formRef.current.reportValidity()) {
      return;
    }

    onSubmit(event);
  }

  return (
    <Card>
      <CardHeader tag="h4">Sign Up</CardHeader>
      <CardBody>
        <Form onSubmit={handleSignup} innerRef={formRef}>
          <FormGroup>
            <Label for="signup-firstName">First name</Label>
            <Input
              required
              id="signup-firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
              pattern="(?=.{1,50}$)[a-zA-z]+(?:['_.\s][a-zA-z]+)*$"
            />
          </FormGroup>
          <FormGroup>
            <Label for="signup-lastName">Last name</Label>
            <Input
              required
              id="signup-lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
              pattern="(?=.{1,50}$)[a-zA-z]+(?:['_.\s][a-zA-z]+)*$"
            />
          </FormGroup>
          <FormGroup>
            <Label for="signup-email">Email</Label>
            <Input
              required
              id="signup-email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="signup-password">Password</Label>
            <Input
              required
              id="signup-password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="5"
            />
            <FormText>Should contain at least 5 symbols</FormText>
          </FormGroup>
          <Button disabled={authenticating} type="submit" color="primary" block>
            Sign Up
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

SignupCard.defaultProps = {
  authenticating: false
};

SignupCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  authenticating: PropTypes.bool
};
