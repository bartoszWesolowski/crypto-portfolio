import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../contextLib';
import { useNavigate } from 'react-router-dom';
import {
  ButtonToolbar,
  Button,
  Form,
  Panel,
  FlexboxGrid,
  Loader,
} from 'rsuite';

export const Signup = () => {
  const [fields, handleFormChange] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  } as Record<string, string>);

  const [confirmationFormFields, handleConfirmationFormChange] = useState({
    confirmationCode: '',
  } as Record<string, string>);
  const nav = useNavigate();
  const { userHasAuthenticated } = useAppContext();
  const [loading, setIsLoading] = useState(false);
  const [signupSubmitted, setSignupSubmitted] = useState(false);

  const handleConfirmationFormSubmit = async(
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(
        fields.email,
        confirmationFormFields.confirmationCode,
      );
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      nav('/');
    } catch (e) {
      console.error('Confirmation error', e);
      setIsLoading(false);
    }
  };

  const handleSubmit = async(
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setSignupSubmitted(true);
      setIsLoading(false);
    } catch (e) {
      console.error(`Signup error ${e}`); // eslint-disable-line @typescript-eslint/restrict-template-expressions
      setIsLoading(false);
    }
  };

  function renderFormLoader() {
    return <Loader size="lg"></Loader>;
  }

  function renderConfirmationForm() {
    return (
      <div className="confirmationForm">
        {loading
          ? (
              renderFormLoader()
            )
          : (
          <Form
            onSubmit={handleConfirmationFormSubmit}
            onChange={handleConfirmationFormChange}
          >
            <Form.Group controlId="confirmationCode">
              <Form.ControlLabel>Confirmation code</Form.ControlLabel>
              <Form.Control name="confirmationCode" type="tel" />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
            )}
      </div>
    );
  }

  function renderSignupForm() {
    return (
      <div className="signupForm">
        {loading
          ? (
              renderFormLoader()
            )
          : (
          <Form onSubmit={handleSubmit} onChange={handleFormChange}>
            <Form.Group controlId="firstname">
              <Form.ControlLabel>First name</Form.ControlLabel>
              <Form.Control name="firstname" type="name" />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.ControlLabel>Last name</Form.ControlLabel>
              <Form.Control name="lastname" type="name" />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText tooltip>Email is required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="phonenumber">
              <Form.ControlLabel>Phone</Form.ControlLabel>
              <Form.Control name="phonenumber" type="tel" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="confirmpassword">
              <Form.ControlLabel>Confirm password</Form.ControlLabel>
              <Form.Control
                name="confirmpassword"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
            )}
      </div>
    );
  }

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>Sign Up</h3>}>
          {signupSubmitted ? renderConfirmationForm() : renderSignupForm()}
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
