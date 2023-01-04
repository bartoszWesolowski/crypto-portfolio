import React from 'react';
import { ButtonToolbar, Button, Panel, Loader } from 'rsuite';
import { MultiStepFormProps } from './RegistrationTypes';

export const SummaryStep = ({
  previousStepHandler,
  currentFormValue,
  submitHandler,
  isLoading,
}: MultiStepFormProps & {
  isLoading: boolean
  submitHandler: React.MouseEventHandler<HTMLElement>
}) => {
  return (
    <Panel header={<h3>Summary</h3>} bordered>
      <p>TODO: this will be replaced with proper summary (maybe)</p>
      <pre>
        <code>{JSON.stringify(currentFormValue, null, 4)}</code>
      </pre>
      <ButtonToolbar>
        <Button onClick={previousStepHandler} appearance="primary">
          Previous step
        </Button>
        <Button
          onClick={submitHandler}
          appearance="primary"
          color="green"
          disabled={isLoading}
        >
          {isLoading && <Loader size="xs" />} Register your company
        </Button>
      </ButtonToolbar>
    </Panel>
  );
};
