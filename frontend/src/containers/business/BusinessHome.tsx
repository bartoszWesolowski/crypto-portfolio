import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { LINKS } from '../../Routes';

export default function BusinessHome() {
  const nav = useNavigate();

  const registerNewBusiness = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    nav(LINKS.REGISTER_BUSINESS);
  };
  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <h1>For Business</h1>
        <Button onClick={registerNewBusiness} appearance="primary">
          Register your business
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
