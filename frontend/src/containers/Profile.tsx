/* eslint-disable */
import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { useAppContext } from '../contextLib';

export default function Profile() {
  const [response, setResponse] = useState();

  const { isAuthenticated } = useAppContext();
  const nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      nav(`/login?redirect=${location.pathname}`);
    }
  }, [isAuthenticated, nav]);

  const callPublicApi = async () => {
    try {
      const r = await API.get('crypto-portfolio', '/public', {});
      setResponse(r);
    } catch (e) {
      alert('Request failed ' + JSON.stringify(e));
    }
  };

  const callPrivateApi = async () => {
    try {
      const r = await API.get('crypto-portfolio', '/private', {});
      setResponse(r);
    } catch (e) {
      alert('Request failed ' + JSON.stringify(e));
    }
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <h1>Profile</h1>
        <Button onClick={callPublicApi}>Call public API</Button>
        <Button onClick={callPrivateApi}>Call private API</Button>
        <h2>Response</h2>
        <div>{JSON.stringify(response) || 'No response yet'} </div>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
