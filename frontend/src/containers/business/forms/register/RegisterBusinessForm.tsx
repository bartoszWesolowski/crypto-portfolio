import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexboxGrid, Steps } from 'rsuite';
import { useAppContext } from '../../../../contextLib';
import { LINKS } from '../../../../Routes';
import { AddressStep } from './AddressStep';
import { BasicInformation } from './BasicInformationStep';
import { ConfirmationStep } from './ConfirmationStep';
import { SummaryStep } from './SummaryStep';

export default function RegisterBusinessForm() {
  const [formState, setFormState] = useState(
    {} as Record<string, string | object>,
  );

  const { isAuthenticated } = useAppContext();

  const [isLoading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      nav(`/login?redirect=${LINKS.REGISTER_BUSINESS}`);
    }
  }, [isAuthenticated, nav]);

  const handleSubmit = async(event: React.FormEvent<HTMLElement>) => {
    setLoading(true);

    try {
      await API.post('activities', '/business', { body: formState });
      setLoading(false);
      setStep(step + 1);
    } catch (e) {
      alert('Failed to create business');
      setLoading(false);
    }
  };

  const NUMBER_OF_STEPS = 4;

  const nextStepHandler = () => {
    if (step < NUMBER_OF_STEPS) {
      setStep(step + 1);
    }
  };

  const previousStepHandler = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormState = (partialData: object) => {
    const newState = Object.assign({}, formState, partialData);
    setFormState(newState);
  };

  const getStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInformation
            updateFormState={updateFormState}
            nextStepHandler={nextStepHandler}
            previousStepHandler={previousStepHandler}
            currentFormValue={formState}
          />
        );
      case 2:
        return (
          <AddressStep
            updateFormState={updateFormState}
            nextStepHandler={nextStepHandler}
            previousStepHandler={previousStepHandler}
            currentFormValue={formState}
          />
        );
      case 3:
        return (
          <SummaryStep
            updateFormState={updateFormState}
            nextStepHandler={nextStepHandler}
            previousStepHandler={previousStepHandler}
            currentFormValue={formState}
            submitHandler={handleSubmit}
            isLoading={isLoading}
          />
        );
      case 4:
        return <ConfirmationStep />;
    }
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={12}>
        <h1>Register business</h1>
        <Steps current={step - 1} small>
          <Steps.Item title="Basic" />
          <Steps.Item title="Address" />
          <Steps.Item title="Summary" />
          <Steps.Item title="Confirmation" />
        </Steps>
        {getStep()}
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
