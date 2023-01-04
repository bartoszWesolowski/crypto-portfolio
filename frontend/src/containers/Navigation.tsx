import Navbar from 'rsuite/Navbar';
import Nav from 'rsuite/Nav';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useAppContext } from '../contextLib';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const nav = useNavigate();

  const logOut = async(event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      userHasAuthenticated(false);
      nav('/login');
    } catch (e) {
      console.error(`Failed to log out ${e}`); // eslint-disable-line @typescript-eslint/restrict-template-expressions
    }
  };
  const LoggedInUserRightMenu = () => {
    return (
      <Nav pullRight>
        <Nav.Item href="/business">For business</Nav.Item>
        <Nav.Item href="/profile" icon={<UserInfoIcon />}>
          Profile
        </Nav.Item>
        <Nav.Item onClick={logOut}>Sign out</Nav.Item>
      </Nav>
    );
  };
  const AnonymousUserRightMenu = () => {
    return (
      <Nav pullRight>
        <Nav.Item href="/business">For business</Nav.Item>
        <Nav.Item href="/login">Login</Nav.Item>
        <Nav.Item href="/signup">Sign up</Nav.Item>
      </Nav>
    );
  };
  return (
    <Navbar>
      <Navbar.Brand>Crypto Portfolio</Navbar.Brand>
      <Nav>
        <Nav.Item href="/" icon={<HomeIcon />}></Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item>Company</Nav.Item>
          <Nav.Item>Team</Nav.Item>
          <Nav.Menu title="Contact">
            <Nav.Item>Via email</Nav.Item>
            <Nav.Item>Via telephone</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>
      </Nav>
      {isAuthenticated ? <LoggedInUserRightMenu /> : <AnonymousUserRightMenu />}
    </Navbar>
  );
};
