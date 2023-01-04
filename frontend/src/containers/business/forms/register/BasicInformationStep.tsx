import React, { RefObject, useState } from 'react';
import { Form, ButtonToolbar, Button, Input, Panel } from 'rsuite';
import { MultiStepFormProps } from './RegistrationTypes';

const Textarea = React.forwardRef((props, ref) => (
  <Input
    {...props}
    as="textarea"
    rows={5}
    ref={ref as RefObject<HTMLTextAreaElement>}
  />
));

// Eslint
Textarea.displayName = 'Text Area';

export const BasicInformation = ({
  updateFormState,
  nextStepHandler,
  currentFormValue,
}: MultiStepFormProps) => {
  const [formValue, setFormValue] = useState({
    name: '',
    description: '',
    taxNumber: '',
    ...currentFormValue,
  } as Record<string, any>);

  const handleSubmit = (
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    updateFormState(formValue);
    nextStepHandler();
  };
  return (
    <Panel header={<h3>Basic</h3>} bordered>
      <Form
        fluid
        onChange={setFormValue}
        formValue={formValue}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control name="name" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Tax number</Form.ControlLabel>
          <Form.Control name="taxNumber" />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.ControlLabel>Description</Form.ControlLabel>
          <Form.Control name="description" accepter={Textarea} />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button type="submit" appearance="primary">
              Continue
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </Panel>
  );
};
