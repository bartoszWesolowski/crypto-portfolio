import React from 'react';
import { Message, Panel } from 'rsuite';

export const ConfirmationStep = () => {
  return (
    <Panel header={<h3>Confirmation</h3>} bordered>
      <Message type="success">Business created successfully</Message>
    </Panel>
  );
};
