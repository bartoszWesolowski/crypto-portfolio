import React, { useState } from 'react';
import { Form, ButtonToolbar, Button, Panel } from 'rsuite';
import { MultiStepFormProps } from './RegistrationTypes';

export const AddressStep = ({
  updateFormState,
  nextStepHandler,
  previousStepHandler,
  currentFormValue,
}: MultiStepFormProps) => {
  const [formValue, setFormValue] = useState({
    city: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    postalCode: '',
    ...(currentFormValue.address ?? {}),
  } as Record<string, string>);

  const handleSubmit = (
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    updateFormState({
      address: formValue,
    });
    nextStepHandler();
  };

  return (
    <Panel header={<h3>Address</h3>} bordered>
      <Form
        fluid
        onChange={setFormValue}
        formValue={formValue}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.ControlLabel>City</Form.ControlLabel>
          <Form.Control name="city" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Street</Form.ControlLabel>
          <Form.Control name="street" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>House number</Form.ControlLabel>
          <Form.Control name="houseNumber" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Apartment number</Form.ControlLabel>
          <Form.Control name="apartmentNumber" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Postal Code</Form.ControlLabel>
          <Form.Control name="postalCode" />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button onClick={previousStepHandler} appearance="primary">
              Previous step
            </Button>
            <Button type="submit" appearance="primary">
              Continue
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </Panel>
  );
};
