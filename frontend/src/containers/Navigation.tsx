import Navbar from 'rsuite/Navbar';
import Nav from 'rsuite/Nav';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useAppContext } from '../contextLib';
import UserInfoIcon from '@rsuite/icons/UserInfo';
import { Auth } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const nav = useNavigate();

  const logOut = async (event: React.SyntheticEvent<HTMLElement>) => {
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
        <Nav.Item href="/import/file/zonda">Zonda</Nav.Item>
        <Nav.Menu title="Enter Coins">
          <Nav.Item as={Link} to="/transactions">
            Enter coins
          </Nav.Item>
          <Nav.Menu title="File Import">
            <Nav.Item as={Link} to="/import/file/zonda">
              Zonda
            </Nav.Item>
            <Nav.Item as={Link} to="/import/file/binance">
              Binance
            </Nav.Item>
          </Nav.Menu>
        </Nav.Menu>
        <Nav.Menu title="Summary">
          <Nav.Item as={Link} to="/summary/transactions">
            Transactions
          </Nav.Item>
        </Nav.Menu>
      </Nav>
      {isAuthenticated ? <LoggedInUserRightMenu /> : <AnonymousUserRightMenu />}
    </Navbar>
  );
};
