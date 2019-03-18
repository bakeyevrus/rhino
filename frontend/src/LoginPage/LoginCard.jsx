import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardHeader, CardBody, Button, Form, FormGroup, Label, Input
} from 'reactstrap';

export default function LoginCard({
  email, password, onChange, onSubmit, authenticating
}) {
  const formRef = React.createRef();

  function handleLogin(event) {
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
      <CardHeader tag="h4">Login</CardHeader>
      <CardBody>
        <Form onSubmit={handleLogin} innerRef={formRef}>
          <FormGroup>
            <Label for="login-email">Email</Label>
            <Input
              required
              id="login-email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="login-password">Password</Label>
            <Input
              required
              id="login-password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="5"
            />
          </FormGroup>
          <Button disabled={authenticating} type="submit" color="primary" block>
            Login
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}

LoginCard.defaultProps = {
  authenticating: false
};

LoginCard.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  authenticating: PropTypes.bool
};
