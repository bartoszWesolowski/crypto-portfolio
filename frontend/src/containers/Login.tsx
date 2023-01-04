import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
  Loader,
} from 'rsuite';
import { useAppContext } from '../contextLib';

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  } as Record<string, string>);

  const { userHasAuthenticated } = useAppContext();

  const [isLoading, setLoading] = useState(false);

  const nav = useNavigate();

  const [searchParams] = useSearchParams();

  const handleSubmit = async(
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      setLoading(true);
      const user = await Auth.signIn(formValue.email, formValue.password);
      userHasAuthenticated(true);
      console.log(JSON.stringify(user));
      redirectAfterLogin();
    } catch (e) {
      alert('Fail to login');
      console.error(JSON.stringify(e));
    }
    setLoading(false);
  };

  const redirectAfterLogin = () => {
    const redirectTarget = searchParams.get('redirect') ?? '/';
    nav(redirectTarget);
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <Panel header={<h3>Login</h3>} bordered>
          <Form
            fluid
            onChange={setFormValue}
            formValue={formValue}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.ControlLabel>Username or email address</Form.ControlLabel>
              <Form.Control name="email" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button type="submit" appearance="primary" disabled={isLoading}>
                  {isLoading && <Loader size="xs" />}Sign in
                </Button>
                <Button appearance="link">Forgot password?</Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};
